'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { ModalVerify } from '@/components/setting/modalVerify';
import * as Icon from '@ant-design/icons';
import { createNotation } from '@/pages/api/notations/create';
import {
  Button,
  DatePicker,
  Form,
  Input,
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

export default function NotationCreatePage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [zoomLevel, setZoomLevel] = React.useState(100); // Default zoom level (100%)
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [createStatus, setCreateStatus] = React.useState('');
  const router = useRouter();
  const [templates, setTemplates] = React.useState([]) as any;
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
    const fetchTemplate = async () => {
      const { items: fetchedItems } = await pagination({ page: 1, limit: 20 });

      setTemplates(fetchedItems);
    };

    fetchTemplate();
  }, []);

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
    setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200)); // Max zoom 200%
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 50)); // Min zoom 50%
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

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
        ...statusData,
      };

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

      router.push(`/admin/notation/${data.id}`);
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

  const {
    isOpen: isPending,
    onOpen: openPending,
    onOpenChange: changePending,
  } = useDisclosure();

  const {
    isOpen: isDraft,
    onOpen: openDraft,
    onOpenChange: changeDraft,
  } = useDisclosure();

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="สร้างเอกสาร"
            backpath={'/admin/notation'}
            buttons={[
              // <a href={'/admin/notation'} key={'draft button'}>
              <a key={'draft button'}>
                <Button
                  className="bg-accent3 text-white"
                  // type="submit"
                  // form="notation"
                  onPress={openDraft}
                  // onClick={() => {
                  //   setCreateStatus('draft');
                  // }}
                >
                  แบบร่าง
                </Button>
              </a>,
              <a key={'create button'}>
                <Button
                  className="bg-accent1 text-white"
                  // type="submit"
                  // form="notation"
                  onPress={openPending}
                  // onClick={() => {
                  //   setCreateStatus('pending');
                  // }}
                >
                  สร้าง
                </Button>
              </a>,
            ]}
          />

          <ModalVerify
            isOpen={isPending}
            title="สร้างเอกสาร"
            content="สร้างข้อมูลเอกสารในสถานะ Pending"
            onClose={changePending}
            CancelButton={{
              label: 'ยกเลิก',
              onClick: changePending,
            }}
            ConfirmButton={{
              label: 'ยืนยัน',
              type: 'submit',
              form: 'notation',
              onClick: () => setCreateStatus('pending'),
            }}
          />

          <ModalVerify
            isOpen={isDraft}
            title="แบบร่างเอกสาร"
            content="สร้างแบบร่างข้อมูลเอกสารในสถานะ Draft"
            onClose={changeDraft}
            CancelButton={{
              label: 'ยกเลิก',
              onClick: changeDraft,
            }}
            ConfirmButton={{
              label: 'ยืนยัน',
              type: 'submit',
              form: 'notation',
              onClick: () => setCreateStatus('draft'),
            }}
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
                  <div className="flex justify-between items-center">
                    <h1 className="flex-1 text-2xl font-bold text-headFont">
                      ข้อมูลเอกสาร
                    </h1>
                    <Select
                      size="sm"
                      className="flex-1"
                      name="templateId"
                      label="เลือกรูปแบบเอกสาร"
                      onChange={handleTemplateChange}
                    >
                      {templates.map((item: any) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.templateName}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  {/* Notation Section */}
                  <div className="flex gap-4">
                    <div className="flex-1 flex items-center gap-4">
                      <span className="text-headFont">แสดงผล</span>
                      <Switch
                        name="active"
                        color="secondary"
                        onChange={handleChange}
                        required
                        defaultChecked
                      />
                    </div>
                    <Input
                      className="flex-1"
                      size="lg"
                      label="หมายเลขอ้างอิง"
                      labelPlacement="outside"
                      name="refNo"
                      placeholder="กรอกหมายเลขอ้างอิง"
                      onChange={handleChange}
                      isRequired
                      errorMessage={'กรุณากรอกหมายเลขอ้างอิง'}
                    />
                  </div>
                  <div className="flex gap-4">
                    <DatePicker
                      size="sm"
                      className="flex-1"
                      name="startDate"
                      label="วันที่สร้าง"
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
                    <Select
                      size="sm"
                      className="flex-1"
                      name="type"
                      label="เลือกประเภทเอกสาร"
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
                  <Textarea
                    label="หมายเหตุ"
                    labelPlacement="outside"
                    name="note"
                    placeholder=""
                    onChange={handleChange}
                  />
                  <div className="flex gap-4 mt-6">
                    <h1 className="text-2xl font-bold text-headFont flex-1">
                      ลูกค้า
                    </h1>
                    <h1 className="text-2xl font-bold text-headFont flex-1">
                      ที่อยู่
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    <Select
                      name="customer"
                      size="sm"
                      label="เลือกลูกค้า"
                      onChange={handleChange}
                    >
                      {customer.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
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
                  <h1 className="text-2xl font-bold text-headFont mt-6">
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
                  </Button>
                </Form>
              </div>

              {/* PDF Preview Section */}
              <div className="w-full lg:w-1/2 p-6 bg-gray-100 justify-center ">
                <h1 className="text-2xl font-bold text-headFont mb-2">
                  ข้อมูลเอกสาร
                </h1>

                {/* Render HTML Template Here */}
                <div className="flex justify-center">
                  <div
                    className="bg-white w-full max-w-[170mm] h-[240mm] shadow-lg border border-gray-300 rounded p-6"
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'top left',
                    }}
                  >
                    {processedHtml ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: processedHtml }}
                      />
                    ) : (
                      <p className="text-center text-gray-500">
                        กรุณาเลือกรูปแบบเอกสาร
                      </p>
                    )}
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

const customer = [
  { label: 'ลูกค้าคนที่ 1', value: '1' },
  { label: 'ลูกค้าคนที่ 2', value: '2' },
];

const selectItem = [
  { label: 'รายการที่ 1', value: '1' },
  { label: 'รายการที่ 2', value: '2' },
];
