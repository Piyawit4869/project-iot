<<<<<<< HEAD
=======
'use client';
import Scaffold from '@/components/common/scaffold';
import * as Icon from '@ant-design/icons';
import {
  Button,
  Input,
  Select,
  SelectItem,
  TimeInput,
} from '@nextui-org/react';
import React from 'react';
import { parseTime } from '@internationalized/date';

interface InputSystem {
  data: any;
  onChange: (updatedData: any) => void;
  onChangeTime: (updatedOpenDay: any) => void;
  openEdit: boolean;
}

export default function Inputorganization({
  data,
  onChange,
  onChangeTime,
  openEdit,
}: InputSystem) {
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

  const handleDayChange = (index: number, field: string, value: any) => {
    const updatedOpenDay = [...openDay];
    updatedOpenDay[index] = {
      ...updatedOpenDay[index],
      [field]: field === 'day' ? [value] : value,
    };

    setOpenDay(updatedOpenDay);
    onChangeTime({ openDays: updatedOpenDay });
  };

  // const handleAddItem = () => {
  //   setItems([...items, { description: '', amount: '' }]);
  // };

  const handleRemoveOpenDay = (index: number) => {
    const updatedOpenDay = openDay.filter((_, i) => i !== index);
    setOpenDay(updatedOpenDay);
    onChangeTime({ ...formData, openDay: updatedOpenDay });
  };

  // const handleRemoveItem = (index: number) => {
  //   const updatedItems = items.filter((_, i) => i !== index);
  //   setItems(updatedItems);
  // };

  const handleAddOpenDay = () => {
    const newOpenDayItem = { day: [], openTime: '', closeTime: '' };
    const updatedOpenDay = [...openDay, newOpenDayItem];
    setOpenDay(updatedOpenDay);
    onChangeTime({ ...formData, openDay: updatedOpenDay });
  };

  // const handleOpenDay = items.map((item: any) => ({
  //   day: [item.day],
  //   open: item.openTime,
  //   colse: item.closeTime,
  // }));

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
                selectedKeys={[formData?.defaultLanguage || '']}
                isDisabled={!openEdit}
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
                isDisabled={!openEdit}
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
                isDisabled={!openEdit}
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
                {/* {openDay.map((item, index) => ( */}
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
                    onChange={(e) =>
                      handleDayChange(index, 'day', e.target.value)
                    }
                    // defaultSelectedKeys={item.day}
                    isDisabled={!openEdit}
                  >
                    {day.map((item: any) => (
                      <SelectItem
                        className="col-span-1 w-full text-headFont"
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    className="col-span-1 w-full"
                    type="time"
                    label={
                      <span className="col-span-1 w-full text-headFont">
                        เริ่มงาน
                      </span>
                    }
                    labelPlacement="outside"
                    name="openTime"
                    // defaultValue={item.openTime}
                    onChange={(e) =>
                      handleDayChange(index, 'openTime', e.target.value)
                    }
                    isDisabled={!openEdit}
                  />
                  <Input
                    className="col-span-1 w-full"
                    type="time"
                    label={
                      <span className="col-span-1 w-full text-headFont">
                        เลิกงาน
                      </span>
                    }
                    labelPlacement="outside"
                    name="closeTime"
                    // defaultValue={item.closeTime}
                    onChange={(e) =>
                      handleDayChange(index, 'closeTime', e.target.value)
                    }
                    isDisabled={!openEdit}
                  />
                  <a
                    className="col-span-1 w-full text-red-500 cursor-pointer mt-6"
                    onClick={() => handleRemoveOpenDay(index)}
                  >
                    ลบวันทำงาน
                  </a>
                </div>
                {/* ))} */}
              </div>
            ))}
            <div className="flex  gap-4 mt-6">
              <Button
                type="button"
                className="bg-accent3 text-white w-full"
                onClick={handleAddOpenDay}
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
}

const language = [
  { label: 'ภาษาไทย', value: 'th' },
  { label: 'ภาษาอังกฤษ', value: 'en' },
  // { label: 'ภาษาญี่ปุ่น', value: 'jp' },
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
>>>>>>> 2b79e0c0bc19e8a6dc31a1bfaa0f07400b3014aa
