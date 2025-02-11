'use client';

import Scaffold from '@/components/common/scaffold';
import { Button, Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface InputSystem {
  data: any;
  onChange: (updatedData: any) => void;
  onChangeTime: (updatedOpenDay: any) => void;
  openEdit: boolean;
}

export default function InputSetting({
  data,
  onChange,
  openEdit,
}: InputSystem) {
  const [formData, setFormData] = React.useState<any>(data);
  const [loading] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setFormData(data);
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

  return (
    <Scaffold
      child={
        loading ? (
          // <div className="flex items-center justify-center min-h-screen">
          //   <div className="relative flex flex-col items-center space-y-4">
          //     {/* Spinner */}
          //     <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          //     {/* Loading Text */}
          //     <p className="text-gray-600 text-lg font-semibold animate-pulse">
          //       Loading, please wait...
          //     </p>
          //   </div>
          // </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
            <div className="flex gap-4">
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
