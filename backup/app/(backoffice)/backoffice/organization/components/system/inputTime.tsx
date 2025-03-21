'use client';

import Scaffold from '@/components/common/scaffold';
import * as Icon from '@ant-design/icons';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import * as Icons from 'lucide-react';

interface InputSystem {
  data: any;
  onChange: (updatedData: any) => void;
  onChangeTime: (updatedOpenDay: any) => void;
  openEdit: boolean;
}

export default function InputTime({
  data,
  onChangeTime,
  openEdit,
}: InputSystem) {
  const [items] = React.useState([{ description: '', amount: '' }]);
  const [formData, setFormData] = React.useState<any>(data);
  const [openDay, setOpenDay] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (data) {
      setFormData(data);
      setOpenDay(data.openDays);
    }
  }, [data]);

  const handleDayChange = (index: number, field: string, value: any) => {
    const updatedOpenDay = [...openDay];
    updatedOpenDay[index] = {
      ...updatedOpenDay[index],
      [field]: field === 'day' ? [value] : value,
    };

    setOpenDay(updatedOpenDay);
    onChangeTime({ openDays: updatedOpenDay });
  };

  const handleRemoveOpenDay = (index: number) => {
    const updatedOpenDay = openDay.filter((_, i) => i !== index);
    setOpenDay(updatedOpenDay);
    onChangeTime({ ...formData, openDays: updatedOpenDay });
  };

  const handleAddOpenDay = () => {
    const newOpenDayItem = { day: [], openTime: '', closeTime: '' };
    const updatedOpenDay = [...openDay, newOpenDayItem];
    setOpenDay(updatedOpenDay);
    onChangeTime({ ...formData, openDays: updatedOpenDay });
  };

  return (
    <Scaffold
      child={
        <>
          {items.map((_: any, index: any) => (
            <div key={index}>
              {openDay.map((item, index) => (
                <div
                  key={index}
                  className="w-full grid grid-cols-4 md:grid-cols-1 items-center"
                >
                  <div className="flex max-md:flex-col gap-4 items-center">
                    <Select
                      className="mt-4"
                      name="day"
                      placeholder="เลือกวันทำงาน"
                      onChange={(e) =>
                        handleDayChange(index, 'day', e.target.value)
                      }
                      defaultSelectedKeys={item.day}
                      isDisabled={!openEdit}
                    >
                      {day.map((item: any) => (
                        <SelectItem
                          className=""
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Input
                      className="mt-4"
                      type="time"
                      startContent={
                        <div className="pointer-events-none flex items-center mr-6">
                          <span className="text-default-400 text-small">
                            เปิด
                          </span>
                        </div>
                      }
                      name="openTime"
                      defaultValue={item.openTime}
                      onChange={(e) =>
                        handleDayChange(index, 'openTime', e.target.value)
                      }
                      isDisabled={!openEdit}
                    />

                    <Input
                      startContent={
                        <div className="pointer-events-none flex items-center mr-6">
                          <span className="text-default-400 text-small">
                            ปิด
                          </span>
                        </div>
                      }
                      className="mt-4"
                      type="time"
                      name="closeTime"
                      defaultValue={item.closeTime}
                      onChange={(e) =>
                        handleDayChange(index, 'closeTime', e.target.value)
                      }
                      isDisabled={!openEdit}
                    />
                    <div className="text-right">
                      <a
                        className={`flex w-full text-red-500 cursor-pointer mt-4 ${
                          !openEdit ? 'pointer-events-nons opacity-50' : ''
                        }`}
                        onClick={() => openEdit && handleRemoveOpenDay(index)}
                      >
                        <Icons.Trash />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="flex gap-4 mt-6">
            <Button
              type="button"
              className="bg-accent3 text-white w-full mt-3"
              onClick={handleAddOpenDay}
              isDisabled={!openEdit}
            >
              <Icon.PlusSquareOutlined className="text-xl" />
              เพิ่มวันทำงาน
            </Button>
          </div>
        </>
      }
    />
  );
}

const day = [
  { label: 'Sunday', value: 'Sunday' },
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
];
