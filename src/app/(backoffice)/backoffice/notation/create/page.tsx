'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import * as Icon from '@ant-design/icons';
import { createNotation } from '@/pages/api/notations/create';
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
  Switch,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import pagination from '@/pages/api/templates/pagination';
import getTemplate from '@/pages/api/templates/get';
import paginationItems from '@/pages/api/items/pagination';
import paginationCustomers from '@/pages/api/customer/pagination';
import { Breadcrumb } from '@/components/common/breadcrumb';
// import paginationAddress from '@/pages/api/address/paginate';

export default function NotationCreatePage() {
  const [zoomLevel, setZoomLevel] = React.useState(100); // Default zoom level (100%)
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [createStatus, setCreateStatus] = React.useState('');
  const router = useRouter();
  const [templates, setTemplates] = React.useState([]) as any;
  const [itemServices, setItemServices] = React.useState([]) as any;
  const [customers, setCustomers] = React.useState([]) as any;
  // const [address, setAddress] = React.useState([]) as any;
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

  const handleChange = (e: any) => {
    const { name, type, checked, value } = e.target;

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
      itemsId: selectedItems, // Store as array of objects
    }));
  };

  React.useEffect(() => {
    const fetchTemplate = async () => {
      const { items: fetchedTemplate } = await pagination({
        isAll: true,
      });

      setTemplates(fetchedTemplate);
    };

    const fetchItem = async () => {
      const { items: fetchedItems } = await paginationItems({
        isAll: true,
      });

      setItemServices(fetchedItems);
    };

    const fetchCustomer = async () => {
      const { items: fetchedCustomer } = await paginationCustomers({
        isAll: true,
      });

      setCustomers(fetchedCustomer);
    };

    // const fetchAddress = async () => {
    //   const { items: fetchedCustomer } = await paginationAddress({});

    //   setAddress(fetchedCustomer);
    // };

    // fetchAddress();

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

    fetchCustomer();
    fetchTemplate();
    fetchItem();
  }, [formData, htmlTemplate]);

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200)); // Max zoom 200%
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 50)); // Min zoom 50%
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

    const requiredFields = ['refNo', 'startDate', 'type'];
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `Field ${field} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const handleCreateStatus = (status: string) => {
      switch (status) {
        case 'draft':
          return { docStatus: 'draft', status: 'draft' };
        case 'pending':
          return { docStatus: 'pending', status: '' };
        default:
          return {};
      }
    };

    const statusData = handleCreateStatus(createStatus);

    try {
      const payload = {
        ...formData,
        itemsId: formData.itemsId.map((item: any) => item.id),
        customIssueTo: formData.customer.companyName || null,
        customIssuePhone: formData.customer.contactPhone || null,
        customIssueEmail: formData.customer.contactEmail || null,
        customContactName: formData.customer.firstName
          ? `${
              formData.customer.firstName + formData.customer.lastName
                ? ` ${formData.customer.lastName}`
                : ''
            }`
          : null,
        customContactEmail: formData.customer.contactEmail || null,
        customContactPhone: formData.customer.contactPhone || null,
        customerId: formData.customer.id || null,
        ...statusData,
      };

      delete payload.customer;

      if (!payload.active) {
        payload.active = false;
      } else {
        payload.active = true;
      }

      const { data } = await createNotation({}, payload);

      toast.success('🎉 สร้างเอกสารสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/notation/${data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถสร้างเอกสารได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="สร้างเอกสาร"
              backpath={'/backoffice/notation'}
              buttons={[
                // <a href={'/backoffice/notation'} key={'draft button'}>
                <a key={'draft button'}>
                  <Button
                    className="bg-accent3 text-white text-xs"
                    size="sm"
                    type="submit"
                    form="notation"
                    onClick={() => {
                      setCreateStatus('draft');
                    }}
                  >
                    แบบร่าง
                  </Button>
                </a>,
                <a key={'create button'}>
                  <Button
                    className="bg-accent1 text-white text-xs"
                    size="sm"
                    type="submit"
                    form="notation"
                    onClick={() => {
                      setCreateStatus('pending');
                    }}
                  >
                    สร้าง
                  </Button>
                </a>,
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
                        <Switch
                          className="mt-2"
                          name="active"
                          color="secondary"
                          onChange={handleChange}
                          required
                          defaultChecked
                        />
                      </div>
                      <Select
                        name="templateId"
                        label="รูปแบบเอกสาร"
                        placeholder="เลือกรูปแบบเอกสาร"
                        labelPlacement={'outside'}
                        onChange={handleTemplateChange}
                      >
                        {templates.map((item: any) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.templateName}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex gap-6 mt-8">
                      <Input
                        className="flex-1"
                        label="ชื่อเอกสาร"
                        labelPlacement="outside"
                        name="name"
                        placeholder="กรอกหมายขื่อเอกสาร"
                        onChange={handleChange}
                        isRequired
                        errorMessage={'กรุณากรอกชื่อเอกสาร'}
                      />
                      <Select
                        className="flex-1"
                        name="type"
                        label="เลือกประเภทเอกสาร"
                        placeholder="กรุณาเลือกประเภทเอกสาร"
                        labelPlacement={'outside'}
                        onChange={handleChange}
                        isRequired
                        errorMessage={'กรุณาเลือกประเภทเอกสาร'}
                      >
                        {types.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    {/* Notation Section */}
                    <div className="flex gap-4 mt-6">
                      <Input
                        className="flex-1"
                        label="หมายเลขอ้างอิง"
                        labelPlacement="outside"
                        name="refNo"
                        placeholder="กรอกหมายเลขอ้างอิง"
                        onChange={handleChange}
                        isRequired
                        errorMessage={'กรุณากรอกหมายเลขอ้างอิง'}
                      />
                      <DatePicker
                        className="flex-1"
                        name="startDate"
                        label="วันที่สร้าง"
                        labelPlacement={'outside'}
                        disableAnimation
                        isRequired
                        errorMessage={'กรุณาเลือกวันที่สร้าง'}
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
                    </div>
                    <div className="flex gap-4"></div>
                    <Textarea
                      label="หมายเหตุ"
                      labelPlacement="outside"
                      name="note"
                      placeholder=""
                      onChange={handleChange}
                    />
                    <div className="flex gap-4 mt-6">
                      <h1 className="text-base font-bold text-headFont flex-1">
                        ลูกค้า
                      </h1>
                      <h1 className="text-base font-bold text-headFont flex-1">
                        ที่อยู่
                      </h1>
                    </div>
                    <div className="flex gap-4">
                      <Select
                        name="customer"
                        size="sm"
                        label="เลือกลูกค้า"
                        onChange={handleCustomer}
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
                      <Select
                        name="address"
                        size="sm"
                        label="เลือกที่อยู่บริษัท"
                        onChange={handleChange}
                      >
                        {address.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    <h1 className="text-base font-bold text-headFont mt-6">
                      รายการ
                    </h1>
                    <Select
                      size="sm"
                      name="itemsId"
                      label="เลือกรายการ"
                      className="flex-1"
                      selectionMode="multiple"
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
                        />
                        <a
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleRemoveItem(index)}
                        >
                          ลบ
                        </a>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    className="px-4 py-2 bg-accent3 text-white"
                    onClick={handleAddItem}
                  >
                    <Icon.PlusSquareOutlined className="text-xl" />
                    เพิ่มรายการ
                  </Button> */}
                  </Form>
                </div>

                {/* PDF Preview Section */}
                <div className="w-full lg:w-1/2 p-6 bg-gray-100 justify-center">
                  <h1 className="text-base font-bold text-headFont mb-2">
                    ข้อมูลเอกสาร
                    <Button
                      color="secondary"
                      className="ml-3"
                      onPress={onOpen}
                      size="sm"
                    >
                      กดดูเอกสาร
                    </Button>
                  </h1>

                  {/* Render HTML Template Here */}
                  <div className="flex justify-center">
                    <div
                      className="bg-white w-[200mm] overflow-hidden h-[240mm] shadow-lg border border-gray-300 rounded"
                      style={{
                        transform: `scale(${zoomLevel / 100})`,
                        transformOrigin: 'top left',
                      }}
                    >
                      {processedHtml ? (
                        <div
                          className="h-full w-full"
                          dangerouslySetInnerHTML={{ __html: processedHtml }}
                        />
                      ) : (
                        <p className="text-center text-gray-500 mt-10">
                          รูปแบบเอกสาร
                        </p>
                      )}

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
                  </div>
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
        }
        backgroundColor={''}
      />
    </div>
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
  { label: 'ที่อยู่หลัก', value: '1' },
  { label: 'โกดัง', value: '2' },
];
