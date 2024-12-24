'use client';
import * as Icon from '@ant-design/icons';
import {
  Button,
  Select,
  SelectItem,
  TimeInput
} from '@nextui-org/react';
import React from 'react';

export const  InputSystem = () => {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // const handleItemChange = (index: number, value: string) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].description = value;
  //   setItems(updatedItems);
  // };

  return (
      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
        <div className="flex gap-4 mt-6">
          <Select
            className="flex-1  text-headFont"
            name="language"
            placeholder="เลือกภาษา"
            label="ภาษา"
            labelPlacement={'outside'}
          >
            {language.map((item: any) => (
              <SelectItem
                className="text-headFont"
                key={item.label}
                value={item.value}
              >
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
            {theme.map((item: any) => (
              <SelectItem
                className="text-headFont"
                key={item.label}
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
            name="fontsize"
            placeholder="เลือกขนาดตัวอักษร"
            label="ขนาดตัวอักษร"
            labelPlacement={'outside'}
          >
            {fontSize.map((item: any) => (
              <SelectItem
                className="text-headFont"
                key={item.label}
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
              className="text-red-500 cursor-pointer mt-6"
              onClick={() => handleRemoveItem(index)}
            >
              ลบรายการ
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
  );
}

const language = [
  {
    label: 'ภาษาไทย',
    value: '1',
  },
  {
    label: 'ภาษาอังกฤษ',
    value: '2',
  },
];

const theme = [
  {
    label: 'สว่าง',
    value: '1',
  },
  {
    label: 'มืด',
    value: '2',
  },
];

const fontSize = [
  {
    label: 'ขนาดใหญ่',
    value: '1',
  },
  {
    label: 'ปกติ',
    value: '2',
  },
  {
    label: 'ขนาดเล็ก',
    value: '3',
  },
];

const day = [
  { label: 'Sunday', value: '1' },
  { label: 'Mondey', value: '2' },
  { label: 'Tuesday', value: '3' },
  { label: 'Wednesday', value: '4' },
  { label: 'Thursday', value: '5' },
  { label: 'Friday', value: '6' },
  { label: 'Saturday', value: '7' },
];
