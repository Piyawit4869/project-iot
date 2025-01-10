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

export const InputSystem: React.FC<InputSystem> = ({ data }) => {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [formData, setFormData] = React.useState<any>(data);

  React.useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <Scaffold
      child={
        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
          <div className="flex gap-4 mt-6">
            <Select
              className="flex-1  text-headFont"
              name="defaultLanguage"
              placeholder="เลือกภาษา"
              label="ภาษา"
              labelPlacement={'outside'}
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
            <div key={index} className="flex items-center gap-6 mt-6">
              <Select
                className="flex-1 text-headFont"
                name="day"
                placeholder="เลือกวันทำงาน"
                label="วันทำงาน"
                labelPlacement={'outside'}
              >
                {day.map((item: any) => (
                  <SelectItem
                    className="flex-1 text-headFont"
                    key={item.label}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
              <TimeInput
                className="flex-1"
                label={<span className="flex-1 text-headFont">เริ่มงาน</span>}
                labelPlacement="outside"
                name="starttime"
              />
              <TimeInput
                className="flex-1"
                label={<span className="flex-1 text-headFont">เลิกงาน</span>}
                labelPlacement="outside"
                name="outtime"
              />
              <a
                className="col-span-1 w-full text-red-500 cursor-pointer mt-6"
                onClick={() => handleRemoveItem(index)}
              >
                ลบวันทำงาน
              </a>
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
      }
    />
  );
};

const language = [
  {
    label: 'ภาษาไทย',
    value: 'TH',
  },
  {
    label: 'ภาษาอังกฤษ',
    value: 'ENG',
  },
];

const themes = [
  {
    label: 'สว่าง',
    value: 'light',
  },
  {
    label: 'มืด',
    value: 'dark',
  },
];

const fontSize = [
  {
    label: 'ขนาดใหญ่',
    value: 'large',
  },
  {
    label: 'ปกติ',
    value: 'normal',
  },
  {
    label: 'ขนาดเล็ก',
    value: 'small',
  },
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
