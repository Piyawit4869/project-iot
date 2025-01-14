'use client';
import Scaffold from '@/components/common/scaffold';
import * as Icon from '@ant-design/icons';
import { Button, Select, SelectItem, TimeInput } from '@nextui-org/react';
import React from 'react';
import get from '@/pages/api/setting/get';
import { parseTime } from '@internationalized/date';

interface InputSystem {
  data: any;
}

export const InputSystem = ({
  data,
  onChange,
}: {
  data: any;
  onChange: (updatedData: any) => void;
}) => {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [formData, setFormData] = React.useState<any>(data);
  const [openDay, setOpenDay] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setFormData(data);
      setOpenDay(data.openDays);
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    const upadteData =
      type === 'checkbox'
        ? checked
        : name === 'birthDate' && value instanceof Date
        ? value.toISOString()
        : value;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: upadteData,
    }));

    onChange({ ...formData, [name]: upadteData });
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleOpenDay = items.map((item: any) => ({
    day: [item.day],
    open: item.open,
    colse: item.close,
  }));

  return (
    <Scaffold
      child={
        loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative flex flex-col items-center space-y-4">
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

              {/* Loading Text */}
              <p className="text-gray-600 text-lg font-semibold animate-pulse">
                Loading, please wait...
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
            <div className="flex gap-4 mt-6">
              <Select
                className="flex-1  text-headFont"
                name="defaultLanguage"
                placeholder="เลือกภาษา"
                label="ภาษา"
                labelPlacement={'outside'}
                onChange={handleChange}
                selectedKeys={[formData?.defaultLanguage || '' ]}
              >
                {language.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                className="flex-1  text-headFont"
                name="theme"
                placeholder="เลือกธีม"
                label="ธีมสี"
                labelPlacement={'outside'}
                onChange={handleChange}
                selectedKeys={[formData?.theme || '']}
              >
                {themes.map((item) => (
                  <SelectItem
                    className="text-headFont"
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex gap-4 mt-6">
              <Select
                className="flex-1 text-headFont"
                name="textDisplay"
                placeholder="เลือกขนาดตัวอักษร"
                label="ขนาดตัวอักษร"
                labelPlacement={'outside'}
                onChange={handleChange}
                selectedKeys={[formData?.textDisplay || '']}
              >
                {fontSize.map((item: any) => (
                  <SelectItem
                    className="text-headFont"
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            {items.map((_: any, index: any) => (
              <div key={index} className="items-center">
                {openDay.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 mt-6 items-center text-headFont"
                  >
                    <Select
                      className="col-span-1 w-full text-headFont"
                      name="day"
                      placeholder="เลือกวันทำงาน"
                      label="วันทำงาน"
                      labelPlacement={'outside'}
                      onChange={handleChange}
                      selectedKeys={new Set([item.day[0]])}
                    >
                      {day.map((item: any) => (
                        <SelectItem
                          className="col-span-1 w-full text-headFont"
                          key={item.label}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <TimeInput
                      className="col-span-1 w-full"
                      label={
                        <span className="col-span-1 w-full text-headFont">
                          เริ่มงาน
                        </span>
                      }
                      labelPlacement="outside"
                      name="open"
                      defaultValue={
                        item.open
                          ? parseTime(item.open.split('T')[0])
                          : undefined
                      }
                    />
                    <TimeInput
                      className="col-span-1 w-full"
                      label={
                        <span className="col-span-1 w-full text-headFont">
                          เลิกงาน
                        </span>
                      }
                      labelPlacement="outside"
                      name="close"
                      defaultValue={
                        item.close
                          ? parseTime(item.close.split('T')[0])
                          : undefined
                      }
                    />
                    <a
                      className="col-span-1 w-full text-red-500 cursor-pointer mt-6"
                      onClick={() => handleRemoveItem(index)}
                    >
                      ลบวันทำงาน
                    </a>
                  </div>
                ))}
              </div>
            ))}
            <div className="flex  gap-4 mt-6">
              <Button
                type="button"
                className="bg-accent3 text-white w-full"
                onClick={handleAddItem}
              >
                <Icon.PlusSquareOutlined className="text-xl" />
                เพิ่มวันทำงาน
              </Button>
            </div>
            <div className="flex gap-4 mt-6 justify-end">
              <Button
                type="submit"
                className="bg-accent1 text-white"
                form="organization"
              >
                บันทึกการตั้งค่า
              </Button>
            </div>
          </div>
        )
      }
    />
  );
};

const language = [
  { label: 'ภาษาไทย', value: 'TH' },
  { label: 'ภาษาอังกฤษ', value: 'ENG' },
];

const themes = [
  { label: 'สว่าง', value: 'light' },
  { label: 'มืด', value: 'dark' },
];

const fontSize = [
  { label: 'ขนาดใหญ่', value: 'large' },
  { label: 'ปกติ', value: 'normal' },
  { label: 'ขนาดเล็ก', value: 'small' },
];

const day = [
  { label: 'Sunday', value: 'Sunday' },
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
];
