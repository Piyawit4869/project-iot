'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import * as Icon from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Skeleton,
  Switch,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import { parseDate } from '@internationalized/date';
import React from 'react';
import getTemplate from '@/pages/api/templates/get';
import get from '@/pages/api/notations/get';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { updateNotation } from '@/pages/api/notations/update';
import { deleteNotation } from '@/pages/api/notations/delete';
import { changeStatusNotation } from '@/pages/api/notations/changeStatus';
import { toast } from 'sonner';
import pagination from '@/pages/api/templates/pagination';
import { handleDocumentStatusTag } from '@/components/common/common';
import paginationItems from '@/pages/api/items/pagination';
import paginationCustomers from '@/pages/api/customer/pagination';

export default function NotationSinglePage() {
  const [zoomLevel, setZoomLevel] = React.useState(100);
  const params = useParams<{ slug?: string }>();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const router = useRouter();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [templates, setTemplates] = React.useState([]) as any;
  const [itemServices, setItemServices] = React.useState([]) as any;
  const [customers, setCustomers] = React.useState([]) as any;
  const [templateSelected, setTemplateSelected] = React.useState({}) as any;
  const [processedHtml, setProcessedHtml] = React.useState<string>('');
  const htmlTemplate = templateSelected.templateNotation;

  const handleTemplateChange = async (e: any) => {
    const selectedId = e.target.value;

    setFormData((prevData: any) => ({ ...prevData, templateId: selectedId }));

    if (selectedId) {
      const { data } = await getTemplate(selectedId);
      setTemplateSelected(data);
    }
  };

  const handleCustomer = (e: any) => {
    const selectedCustomerId = e.target.value;

    const customer = customers.find(
      (item: any) => item.id === selectedCustomerId,
    );

    setFormData((prevData: any) => ({
      ...prevData,
      customer,
    }));
  };

  const handleMultipleSelect = (selectedKeys: Set<string>) => {
    const selectedItems = Array.from(selectedKeys).map((key) => {
      const item = itemServices.find((item: any) => item.id === key);
      return {
        id: item?.id || '',
        name: item?.name || '',
        quantity: item?.quantity || 0,
        unitPrice: item?.unitPrice || 0,
        total: item?.total || 0,
      };
    });

    setFormData((prevData: any) => ({
      ...prevData,
      itemsId: selectedItems,
    }));
  };

  React.useEffect(() => {
    const fetchTemplate = async () => {
      const { items: fetchedItems } = await pagination({
        isAll: true,
      });

      setTemplates(fetchedItems);
    };

    fetchTemplate();
  }, []);

  React.useEffect(() => {
    if (formData.templateId) {
      const fetchedTemplateWithId = async () => {
        const { data } = await getTemplate(formData.templateId);
        setTemplateSelected(data);
      };

      fetchedTemplateWithId();
    }
  }, [formData]);

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL params.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      const { data } = await get(params.slug as string);

      const { items: fetchedItems } = await paginationItems({
        isAll: true,
      });

      const { items: fetchedCustomer } = await paginationCustomers({
        isAll: true,
      });

      const selectedItems = data?.itemsId.map((key: any) => {
        const item = fetchedItems.find((item: any) => item.id === key);
        return {
          id: item?.id || '',
          name: item?.name || '',
          quantity: item?.quantity || 0,
          unitPrice: item?.unitPrice || 0,
          total: item?.total || 0,
        };
      });

      setItemServices(fetchedItems);
      setCustomers(fetchedCustomer);

      setFormData({
        ...data,
        itemsId: selectedItems,
      });
      setLoading(false);
    };

    fetchData();
  }, [params]);

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'startDate' && value instanceof Date
          ? value.toISOString()
          : value,
    }));
  };

  React.useEffect(() => {
    if (htmlTemplate) {
      let updatedHtml = htmlTemplate;

      Object.keys(formData).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        let value = formData[key] || '';

        if (key === 'startDate' && value) {
          const date = new Date(value);
          value = date.toLocaleDateString('th-TH', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
        }

        updatedHtml = updatedHtml.replace(regex, value);
      });

      setProcessedHtml(updatedHtml);
    }
  }, [formData, htmlTemplate]);

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 50));
  };

  // const handleAddItem = () => {
  //   setItems([...items, { description: '', amount: '' }]);
  // };

  // const handleRemoveItem = (index: number) => {
  //   const updatedItems = items.filter((_, i) => i !== index);
  //   setItems(updatedItems);
  // };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = ['refNo', 'startDate', 'type'];
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `Field ${field} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        itemsId: formData.itemsId.map((item: any) => item.id),
        customerId: formData.customer
          ? formData.customer.id
          : formData.customerId,
      };

      if (!payload.active) {
        payload.active = false;
      } else {
        payload.active = true;
      }

      const res = await updateNotation({}, payload, params?.slug);

      setOpenEdit(false);

      toast.success('📝 แก้ไขเอกสารสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/notation/${res.data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถแก้ไขเอกสารได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const onCancel = async () => {
    try {
      await changeStatusNotation(params?.slug, 'canceled');

      toast.success('ยกเลิกเอกสารสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/notation/${params?.slug}`);
    } catch (error) {
      toast.error('❌ ไม่สามารถยกเลิกเอกสารได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Change status error:', error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteNotation(params?.slug);

      toast.success('ลบเอกสารสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/notation`);
    } catch (error) {
      toast.error('❌ ไม่สามารถลบเอกสารได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Delete error:', error);
    }
  };

  const onPending = async () => {
    try {
      await changeStatusNotation(params?.slug, 'pending');

      toast.success('เอกสารถูกเปลี่ยนเป็นรอดำเนินการแล้ว!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/notation/${params?.slug}`);
    } catch (error) {
      toast.error('❌ ไม่สามารถเปลี่ยนเอกสารเป็นรอดำเนินการได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Pending error:', error);
    }
  };

  const onWaiting = async () => {
    try {
      await changeStatusNotation(params?.slug, 'review');

      toast.success('เอกสารถูกเปลี่ยนเป็นรอตรวจสอบแล้ว!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/notation/${params?.slug}`);
    } catch (error) {
      toast.error('❌ ไม่สามารถเปลี่ยนเอกสารเป็นรอตรวจสอบได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
      console.error('Waiting error:', error);
    }
  };

  const onRejected = async () => {
    try {
      await changeStatusNotation(params?.slug, 'rejected');

      toast.success('เอกสารถูกเปลี่ยนเป็นปฏิเสษแล้ว!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/notation/${params?.slug}`);
    } catch (error) {
      toast.error('❌ ไม่สามารถเปลี่ยนเอกสารเป็นปฏิเสษได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
      console.error('Reject error:', error);
    }
  };

  const onApproved = async () => {
    try {
      await changeStatusNotation(params?.slug, 'approved');

      toast.success('เอกสารถูกเปลี่ยนเป็นอนุมัติแล้ว!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/notation/${params?.slug}`);
    } catch (error) {
      toast.error('❌ ไม่สามารถเปลี่ยนเอกสารเป็นอนุมัติได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Approve error:', error);
    }
  };

  const handleEditButton = (openEdit: boolean) => {
    return openEdit ? (
      <Button
        className={`bg-${
          formData?.docStatus === 'canceled'
            ? 'gray-400 cursor-not-allowed'
            : 'accent1'
        } text-white text-xs`}
        key={'submit edit button'}
        size="sm"
        type="submit"
        form="notation"
        disabled={formData?.docStatus === 'canceled'}
      >
        เสร็จสิ้น
      </Button>
    ) : (
      <Button
        className={`bg-${
          formData?.docStatus === 'canceled'
            ? 'gray-400 cursor-not-allowed'
            : 'accent3'
        } text-white text-xs `}
        key={'edit button'}
        size="sm"
        onClick={() => {
          setOpenEdit(true);
        }}
        disabled={formData?.docStatus === 'canceled'}
      >
        แก้ไข
      </Button>
    );
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Scaffold
      child={
        // loading ? (
        //   <div className="flex items-center justify-center min-h-screen">
        //     <div className="relative flex flex-col items-center space-y-4">
        //       {/* Spinner */}
        //       <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        //       {/* Loading Text */}
        //       <p className="text-gray-600 text-lg font-semibold animate-pulse">
        //         Loading, please wait...
        //       </p>
        //     </div>
        //   </div>
        // ) : (
        <div>
          <TopSection
            title={
              loading ? (
                <Skeleton className="h-6 w-[180px] rounded-lg" />
              ) : (
                <span>{formData?.docNo}</span>
              )
            }
            backpath={'/backoffice/notation'}
            buttons={[
              formData?.docStatus !== 'canceled' ? (
                <Button
                  className=" text-white text-xs"
                  key={'cancel button'}
                  onClick={onCancel}
                  size="sm"
                >
                  ยกเลิก
                </Button>
              ) : (
                <div key={'empty cancel'}></div>
              ),

              handleEditButton(openEdit),
              formData?.docStatus === 'draft' ? (
                <Button
                  className={`bg-sky-400 text-white text-xs`}
                  key={'pending button'}
                  onClick={onPending}
                  size="sm"
                >
                  รอดำเนินการ
                </Button>
              ) : (
                <div key={'empty pendding'}></div>
              ),
              formData?.docStatus === 'pending' ? (
                <Button
                  className={`bg-sky-600 text-white text-xs`}
                  key={'waiting button'}
                  onClick={onWaiting}
                  size="sm"
                >
                  รอตรวจสอบ
                </Button>
              ) : (
                <div key={'empty waiting'}></div>
              ),
              <Button
                className={`bg-${
                  formData?.docStatus !== 'waiting_for_review'
                    ? 'gray-400 cursor-not-allowed'
                    : 'accent2'
                } text-white text-xs`}
                key={'reject button'}
                disabled={formData?.docStatus !== 'waiting_for_review'}
                onClick={onRejected}
                size="sm"
              >
                ปฏิเสธ
              </Button>,
              <Button
                className={`bg-${
                  formData?.docStatus !== 'waiting_for_review'
                    ? 'gray-400 cursor-not-allowed'
                    : 'accent1'
                } text-white text-xs`}
                key={'approve button'}
                disabled={formData?.docStatus !== 'waiting_for_review'}
                onClick={onApproved}
                size="sm"
              >
                อนุมัติ
              </Button>,
              <Button
                className={`bg-${
                  formData?.docStatus === 'canceled'
                    ? 'gray-400 cursor-not-allowed'
                    : 'accent2'
                } text-white text-xs`}
                key={'delete button'}
                onClick={onDelete}
                disabled={formData?.docStatus === 'canceled'}
                size="sm"
              >
                <Icon.DeleteFilled />
                ลบ
              </Button>,
            ]}
          />
          <div className="bg-gray-100  flex justify-center items-center pt-6">
            {/* A4 Paper Styled Container */}
            <div className="bg-white w-full border-gray-300 rounded-lg shadow-lg flex flex-wrap">
              {/* Input Form Section */}
              <div className="w-full lg:w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                <Form
                  id="notation"
                  onSubmit={onSubmit}
                  method="post"
                  className="grid grid-cols-1 gap-4"
                  validationErrors={errors}
                >
                  <div className="flex justify-between items-center mb-5">
                    <h1 className="flex-1 text-xl font-bold text-headFont">
                      ข้อมูลเอกสาร
                    </h1>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-headFont text-sm">แสดงผลเอกสาร</p>
                      {loading ? (
                        <Skeleton className="h-8 w-[55px] rounded-full" />
                      ) : (
                        <Switch
                          className="mt-2"
                          name="active"
                          color="secondary"
                          onChange={handleChange}
                          required
                          isDisabled={!openEdit}
                          isSelected={formData.active}
                        />
                      )}
                    </div>
                    {loading ? (
                      <Skeleton className="h-12 w-[360px] rounded-lg" />
                    ) : (
                      <Select
                        name="templateId"
                        placeholder="เลือกรูปแบบเอกสาร"
                        label="เลือกรูปแบบเอกสาร"
                        labelPlacement={'outside'}
                        onChange={handleTemplateChange}
                        defaultSelectedKeys={[formData.templateId]}
                        isDisabled={!openEdit}
                      >
                        {templates.map((item: any) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.templateName}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  </div>
                  {/* Notation Section */}
                  <div className="flex gap-6 mt-8">
                    {loading ? (
                      <Skeleton className="h-12 w-[360px] rounded-lg" />
                    ) : (
                      <Input
                        className="flex-1"
                        label="ชื่อเอกสาร"
                        labelPlacement="outside"
                        name="name"
                        placeholder="กรอกหมายขื่อเอกสาร"
                        onChange={handleChange}
                        // defaultValue={formData.name}
                        isRequired
                        errorMessage={'กรุณากรอกชื่อเอกสาร'}
                        isDisabled={!openEdit}
                      />
                    )}
                    {loading ? (
                      <Skeleton className="h-12 w-[360px] rounded-lg" />
                    ) : (
                      <Select
                        className="flex-1"
                        name="type"
                        label="เลือกประเภทเอกสาร"
                        labelPlacement={'outside'}
                        placeholder="กรุณาเลือกประเภทเอกสาร"
                        onChange={handleChange}
                        isRequired
                        errorMessage={'กรุณาเลือกประเภทเอกสาร'}
                        defaultSelectedKeys={[formData.type]}
                        isDisabled={!openEdit}
                      >
                        {types.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  </div>
                  <div className="flex gap-4 mt-6">
                    {loading ? (
                      <Skeleton className="h-12 w-[360px] rounded-lg mt-5" />
                    ) : (
                      <Input
                        className="flex-1"
                        label="หมายเลขอ้างอิง"
                        labelPlacement="outside"
                        name="refNo"
                        placeholder="กรอกหมายเลขอ้างอิง"
                        onChange={handleChange}
                        defaultValue={formData.refNo}
                        isRequired
                        errorMessage={'กรุณากรอกหมายเลขอ้างอิง'}
                        isDisabled={!openEdit}
                      />
                    )}
                    {loading ? (
                      <Skeleton className="h-12 w-[360px] rounded-lg" />
                    ) : (
                      <DatePicker
                        className="flex-1"
                        name="startDate"
                        label="วันที่สร้าง"
                        labelPlacement={'outside'}
                        disableAnimation
                        isRequired
                        errorMessage={'กรุณาเลือกวันที่สร้าง'}
                        defaultValue={
                          formData.startDate
                            ? parseDate(formData.startDate.split('T')[0])
                            : undefined
                        }
                        isDisabled={!openEdit}
                        onChange={(date: any) => {
                          if (date?.year && date?.month && date?.day) {
                            // Convert the custom date object to a valid Date instance
                            const parsedDate = new Date(
                              date.year,
                              date.month - 1,
                              date.day,
                            ); // month is 0-indexed
                            const isoString = parsedDate.toISOString();

                            // Update formData with the ISO string
                            setFormData((prevData: any) => ({
                              ...prevData,
                              startDate: isoString,
                            }));
                          } else {
                            console.error('Invalid date object:', date);
                          }
                        }}
                      />
                    )}
                    {/* {formData.status} */}
                  </div>
                  {loading ? (
                    <Skeleton className="h-24 w-full rounded-lg mt-6" />
                  ) : (
                    <Textarea
                      label="หมายเหตุ"
                      labelPlacement="outside"
                      name="note"
                      placeholder=""
                      onChange={handleChange}
                      isDisabled={!openEdit}
                      defaultValue={formData.note}
                    />
                  )}
                  <div className="flex gap-4 mt-6">
                    <h1 className="text-base font-bold text-headFont flex-1">
                      ลูกค้า
                    </h1>
                    <h1 className="text-base font-bold text-headFont flex-1">
                      ที่อยู่
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    {loading ? (
                      <Skeleton className="h-12 w-[360px] rounded-lg" />
                    ) : (
                      <Select
                        name="customer"
                        size="sm"
                        label="เลือกลูกค้า"
                        onChange={handleCustomer}
                        defaultSelectedKeys={[formData.customerId]}
                        isDisabled={!openEdit}
                      >
                        {customers.map((item: any) => (
                          <SelectItem key={item.id} value={item.id}>
                            {`${
                              item.firstName
                                ? `คุณ ${item.firstName}`
                                : 'ไม่มีชื่อ'
                            }  ${
                              item.companyName
                                ? `จาก ${item.companyName}`
                                : 'ไม่มีชื่อ'
                            }`}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                    {loading ? (
                      <Skeleton className="h-12 w-[360px] rounded-lg" />
                    ) : (
                      <Select
                        size="sm"
                        name="address"
                        label="เลือกที่อยู่บริษัท"
                        isDisabled={!openEdit}
                      >
                        {address.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  </div>
                  <h1 className="text-base font-bold text-headFont mt-6">
                    รายการ
                  </h1>
                  {loading ? (
                    <Skeleton className="h-12 w-full rounded-lg" />
                  ) : (
                    <Select
                      size="sm"
                      name="itemsId"
                      label="เลือกรายการ"
                      className="flex-1"
                      selectionMode="multiple"
                      isDisabled={!openEdit}
                      onSelectionChange={(keys: any) =>
                        handleMultipleSelect(keys)
                      }
                      defaultSelectedKeys={
                        formData?.itemsId
                          ? formData.itemsId.map((item: any) => item.id)
                          : []
                      }
                    >
                      {itemServices.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                  {/* <h1 className="text-base font-bold text-headFont mt-6">
                      รายการ
                    </h1>
                    {items.map((_, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <Select
                          size="sm"
                          name={`item_${index}`}
                          label="เลือกรายการ"
                          className="flex-1"
                          onChange={handleChange}
                          isDisabled={!openEdit}
                        >
                          {selectItem.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </Select>
                        <div className="flex-1 flex gap-2 items-center ">
                          <Input
                            size="lg"
                            type="number"
                            placeholder="จำนวน"
                            onChange={handleChange}
                            isDisabled={!openEdit}
                          />
                          {openEdit ? (
                            <a
                              className="text-red-500 cursor-pointer"
                              onClick={() => handleRemoveItem(index)}
                            >
                              ลบ
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ))}
                    {openEdit ? (
                      <Button
                        type="button"
                        className="px-4 py-2 bg-accent3 text-white"
                        onClick={handleAddItem}
                      >
                        <Icon.PlusSquareOutlined className="text-xl" />
                        เพิ่มรายการ
                      </Button>
                    ) : (
                      <></>
                    )} */}
                </Form>
              </div>

              {/* PDF Preview Section */}
              <div className="w-full lg:w-1/2 p-4 bg-gray-100 justify-center">
                <div className=" flex justify-between items-center mb-2">
                  <h1 className="text-base font-bold text-headFont">
                    ข้อมูลเอกสาร
                    {/* <div className="flex flex-wrap gap-3"> */}
                    <Button
                      color="secondary"
                      className="ml-3"
                      onPress={onOpen}
                      size="sm"
                    >
                      กดดูเอกสาร
                    </Button>
                    {/* </div> */}
                  </h1>
                  {/* Dynamic Status Tag */}
                  {loading ? (
                    <Skeleton className="h-7 w-[130px] rounded-full" />
                  ) : (
                    <span>{handleDocumentStatusTag(formData?.docStatus)}</span>
                  )}
                  {/* <div
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
                      >
                        แบบร่าง
                      </div> */}
                </div>

                {/* Render HTML Template Here */}
                {loading ? (
                  <Skeleton className="w-90% max-w-[170mm] h-[240mm] rounded-sm ml-11" />
                ) : (
                  <div className="flex justify-center">
                    <div
                      // className="bg-white w-[260mm] h-[300mm] shadow-lg border border-gray-300 rounded p-1"
                      className="bg-white overflow-hidden w-full h-full shadow-lg border border-gray-300 rounded"
                      style={{
                        transform: `scale(${zoomLevel / 100})`,
                        transformOrigin: 'top left',
                      }}
                    >
                      {processedHtml ? (
                        <div
                          className="h-full"
                          dangerouslySetInnerHTML={{ __html: processedHtml }}
                        />
                      ) : (
                        <p className="text-center text-gray-500">
                          กรุณาเลือกรูปแบบเอกสาร
                        </p>
                      )}
                    </div>

                    <Modal
                      isOpen={isOpen}
                      onClose={onClose}
                      scrollBehavior="inside"
                      size="4xl"
                    >
                      <ModalContent>
                        {() => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              เอกสาร
                            </ModalHeader>
                            <ModalBody>
                              <div
                                className="rounded"
                                style={{
                                  transform: `scale(${zoomLevel / 100})`,
                                  transformOrigin: 'top left',
                                }}
                              >
                                {processedHtml ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: processedHtml,
                                    }}
                                  />
                                ) : (
                                  <p className="text-center text-gray-500">
                                    กรุณาเลือกรูปแบบเอกสาร
                                  </p>
                                )}
                              </div>
                            </ModalBody>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                )}
                <div className="w-[170mm] w-full flex justify-center items-center mt-4">
                  <div className="flex items-center gap-2">
                    {/* Zoom Out Button */}
                    <Button
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
                      aria-label="Zoom Out"
                      onClick={handleZoomOut}
                    >
                      <Icon.MinusOutlined className="text-lg text-gray-700" />
                    </Button>

                    {/* Zoom Level Display */}
                    <span className="text-sm font-medium text-gray-700">
                      {zoomLevel}%
                    </span>

                    {/* Zoom In Button */}
                    <Button
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
                      aria-label="Zoom In"
                      onClick={handleZoomIn}
                    >
                      <Icon.PlusOutlined className="text-lg text-gray-700" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        // )
      }
      backgroundColor={''}
    />
  );
}

const types = [
  { label: 'ใบแจ้งหนี้', value: 'invoice' },
  { label: 'ใบเสนอราคา', value: 'quotation' },
  { label: 'ใบการจัดส่งคำสั่งซื้อ', value: 'delivery_order' },
  { label: 'ใบสั่งซื้อ', value: 'purchase_order' },
  { label: 'ใบเสร็จรับเงิน', value: 'receipt' },
];

const address = [
  {
    label: 'ที่อยู่หลัก',
    value: '1',
  },
  {
    label: 'โกดัง',
    value: '2',
  },
];
