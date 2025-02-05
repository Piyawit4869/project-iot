'use client';

import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { TopSection } from '@/components/common/topSection';
import { create } from '@/pages/api/attendances/create'; //API
import * as Icon from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button, Form, Input, Select, SelectItem } from '@nextui-org/react';

export default function CreateWhitelistPage() {
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [, setLoading] = React.useState(false);
  const router = useRouter();

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        status: formData.status,
        action: formData.action,
        ip: formData.ip,

        ...formData,
      };

      payload.active = !!payload.active; // Simplified active check

      const { data } = await create({}, payload);
      router.push(`/backoffice/attendance/overview/${data.id}`);
    } catch (err: any) {
      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="สร้างกิจกรรม"
              backpath={'/backoffice/attendance/overview'}
              buttons={[
                <div className="mx-2.5" key="save-button">
                  <a className="p-2">
                    <Button
                      className="bg-accent1 text-white p-2 gap-2"
                      type="submit"
                      size="sm"
                      form="overview"
                      onClick={() => {
                        // setCreateStatus('pending');
                      }}
                    >
                      <Icon.CheckOutlined />
                      บันทึการสร้าง
                    </Button>
                  </a>

                  <a
                    href={'/backoffice/attendance/overview/'}
                    key={'cancel-overview-button'}
                  >
                    <Button
                      className="bg-accent2 text-white p-2 gap-2"
                      type="reset"
                      form="overviews"
                      size="sm"
                    >
                      <Icon.CloseOutlined />
                      ยกเลิกการสร้าง
                    </Button>
                  </a>
                </div>,
              ]}
            />
            <div className="flex space-x-4 mt-6">
              <div className="flex-1">
                <CardComponent
                  customCard
                  custom={
                    <Form
                      id="overview"
                      onSubmit={onSubmit}
                      method="post"
                      validationErrors={errors}
                    >
                      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                        {/* Content Section */}
                        <div className="mb-6">
                          {/* Detail Section */}
                          <div>
                            <h1 className="text-2xl font-bold text-headFont mb-10 py-5">
                              สร้างกิจกรรม
                            </h1>
                            <div className="flex gap-4 mt-6">
                              {/* <Input
                                className="flex-1"
                                size="lg"
                                label="status"
                                labelPlacement="outside"
                                name="status"
                                placeholder="Enter your IP Address"
                                onChange={handleChange}
                              /> */}

                              <Select
                                size="sm"
                                name="action"
                                label="เลือกกิจกรรม"
                              >
                                {action.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="IP"
                              labelPlacement="outside"
                              name="ip"
                              placeholder="Enter your Browser "
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </Form>
                  }
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

const action = [
  {
    label: 'เข้างาน',
    value: 'in',
  },
  {
    label: 'พักเบรก',
    value: 'break',
  },
  {
    label: 'เลิกงาน',
    value: 'out',
  },
  {
    label: 'ออกงานก่อนเวลา',
    value: 'leave_early',
  },
];
