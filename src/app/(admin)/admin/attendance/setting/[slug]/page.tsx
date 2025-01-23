'use client';

import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { TopSection } from '@/components/common/topSection';
import { update } from '@/pages/api/config/update'; //API
import getSingle from '@/pages/api/config/get'; //API
import * as Icon from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  TimeInput,
  Avatar,
  Chip,
  form,
} from '@nextui-org/react';
import { parseZonedDateTime } from '@internationalized/date';

export default function SingleSettingPage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [data, setData] = React.useState() as any;
  const params = useParams<{ slug?: string }>();
  const [openEdit, setOpenEdit] = React.useState(false);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL parameters.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await getSingle(params.slug as string);
        console.log('response', response);

        // if (!response?.data) {
        //   throw new Error('No data found for the given slug');
        // }
        // console.log('name', data);
        // console.log('anna');

        setData(response?.data);
        setFormData(response);
      } catch (error) {
        console.error('Error fetching setting:', error);
      } finally {
        setLoading(false);
      }
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

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleEditButton = (openEdit: boolean) => {
    return openEdit ? (
      <a className="px-1">
        <Button
          className={`bg-${
            data?.docStatus === 'rejected'
              ? 'gray-400 cursor-not-allowed'
              : 'accent1'
          } text-white p-2`}
          key={'submit edit button'}
          type="submit"
          size="sm"
          form="setting"
          disabled={data?.docStatus === 'rejected'}
        >
          <Icon.CheckOutlined />
          เสร็จสิ้น
        </Button>
      </a>
    ) : (
      <a className="px-1">
        <Button
          className={` bg-${
            data?.docStatus === 'rejected'
              ? 'gray-400 cursor-not-allowed'
              : 'accent3'
          } text-white p-31`}
          key={'edit button'}
          size="sm"
          onClick={() => {
            setOpenEdit(true);
          }}
          disabled={data?.docStatus === 'rejected'}
        >
          <Icon.EditFilled />
          แก้ไข
        </Button>
      </a>
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('name :');

      const payload = {
        ...data,
        ...formData, // All data including the updated address fields
      };

      console.log('payload :', payload);

      const res = await update({}, payload, params?.slug);
      setOpenEdit(false);
      console.log({ res });
      router.push(`/admin/attendance/setting/${res.data.id}`);
    } catch (err: any) {
      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  console.log('NAME', formData.workStartTime);

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="สร้างการตั้งค่าการเข้าทำงาน"
            backpath={'/admin/attendance/setting'}
            buttons={[
              <div className="mx-2.5" key="save-button">
                {handleEditButton(openEdit)}

                <a
                  href={'/admin/attendance/setting/'}
                  key={'cancel-setting-button'}
                >
                  <Button
                    className="bg-accent2 text-white p-2 gap-2"
                    size="sm"
                    type="reset"
                    form="setting"
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
                    id="setting"
                    onSubmit={onSubmit}
                    method="post"
                    validationErrors={errors}
                  >
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                      <div className="mb-6">
                        <div className="grid grid-cols-2 gap-6 px-5 py-5">
                          {/* Detail Section */}
                          <div>
                             <h1 className="text-xl font-bold text-headFont mb-5">
                              เลือกวันทำงาน
                            </h1>
                            <Button
                              type="button"
                              className="bg-accent1 text-white w-50%"
                              onClick={handleAddItem}
                            >
                              <Icon.PlusSquareOutlined className="text-lg" />
                              เพิ่มวันทำงาน
                            </Button>
                            {items.map((item: any, index: number) => (
                              <div key={index} className="gap-4 mt-6">
                                <div className="flex w-[80%] gap-4 mt-6">
                                  <Select
                                    className="col-span-1 w-full text-headFont"
                                    name="day"
                                    placeholder="เลือกวันทำงาน"
                                    label="วันทำงาน"
                                    labelPlacement={'outside'}
                                  >
                                    {day.map((dayItem: any) => (
                                      <SelectItem
                                        className="col-span-1 w-full text-headFont"
                                        key={dayItem.value}
                                        value={dayItem.value}
                                      >
                                        {dayItem.label}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                  <Button
                                    className="bg-accent2 text-white mt-6"
                                    onClick={() => handleRemoveItem(index)}
                                  >
                                    ลบวันทำงาน
                                  </Button>
                                </div>
                              </div>
                            ))}
                            
                          </div>
                          <div>
                            <h1 className="text-xl font-bold text-headFont mb-5">
                              เวลาการทำงาน
                            </h1>

                            <Input
                              className="px-2 py-2"
                              type="time"
                              name="workStartTime"
                              label="เวลาเลิกงาน"
                              value={formData.workStartTime}
                              onChange={handleChange}
                            />
                            <Input
                              className="px-2 py-2"
                              type="time"
                              name="workEndTime"
                              label="เวลาเลิกงาน"
                              value={formData.workEndTime}
                              onChange={handleChange}
                            />

                            {/* More Address Fields */}

                            <Input
                              className="px-2 py-2"
                              type="time"
                              name="breakStartTime"
                              label="เวลาพักเบรก"
                              value={formData.breakStartTime}
                              onChange={handleChange}
                            />
                            <Input
                              className="px-2 py-2"
                              type="time"
                              name="breakEndTime"
                              label="เวลาเลิกพักเบรก"
                              value={formData.breakEndTime}
                              onChange={handleChange}
                            />
                            <div>
                              <h1 className="text-xl font-bold text-headFont py-5">
                                เพิ่มพนักงาน
                              </h1>
                              <Select
                                classNames={{
                                  trigger: 'min-h-12 py-2',
                                }}
                                isMultiline={true}
                                items={users}
                                labelPlacement="outside"
                                placeholder="Select a user"
                                renderValue={(items) => {
                                  return (
                                    <div className="flex flex-wrap gap-2">
                                      {items.map((item) => (
                                        <Chip key={item.key}>
                                          {item.data?.name ?? 'Unknown'}
                                        </Chip>
                                      ))}
                                    </div>
                                  );
                                }}
                                selectionMode="multiple"
                                variant="bordered"
                              >
                                {(user) => (
                                  <SelectItem
                                    key={user.id}
                                    textValue={user.name}
                                  >
                                    <div className="flex gap-2 items-center">
                                      <Avatar
                                        alt={user.name}
                                        className="flex-shrink-0"
                                        size="sm"
                                        src={user.avatar}
                                      />
                                      <div className="flex flex-col">
                                        <span className="text-small">
                                          {user.name}
                                        </span>
                                        <span className="text-tiny text-default-400">
                                          {user.email}
                                        </span>
                                      </div>
                                    </div>
                                  </SelectItem>
                                )}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 pb-5">
                        <Input
                          size="lg"
                          label="branchId"
                          labelPlacement="outside"
                          name="branchId"
                          value={formData.branchId}
                          placeholder="กรอก branchId"
                          onChange={handleChange}
                        />
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
  );
}

export const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'CEO',
    team: 'Management',
    status: 'active',
    age: '29',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Tech Lead',
    team: 'Development',
    status: 'paused',
    age: '25',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Sr. Dev',
    team: 'Development',
    status: 'active',
    age: '22',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'C.M.',
    team: 'Marketing',
    status: 'vacation',
    age: '28',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'S. Manager',
    team: 'Sales',
    status: 'active',
    age: '24',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png',
    email: 'kristen.cooper@example.com',
  },
  {
    id: 6,
    name: 'Brian Kim',
    role: 'P. Manager',
    team: 'Management',
    age: '29',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png',
    email: 'brian.kim@example.com',
    status: 'active',
  },
  {
    id: 7,
    name: 'Michael Hunt',
    role: 'Designer',
    team: 'Design',
    status: 'paused',
    age: '27',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png',
    email: 'michael.hunt@example.com',
  },
  {
    id: 8,
    name: 'Samantha Brooks',
    role: 'HR Manager',
    team: 'HR',
    status: 'active',
    age: '31',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png',
    email: 'samantha.brooks@example.com',
  },
  {
    id: 9,
    name: 'Frank Harrison',
    role: 'F. Manager',
    team: 'Finance',
    status: 'vacation',
    age: '33',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png',
    email: 'frank.harrison@example.com',
  },
  {
    id: 10,
    name: 'Emma Adams',
    role: 'Ops Manager',
    team: 'Operations',
    status: 'active',
    age: '35',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png',
    email: 'emma.adams@example.com',
  },
];

const day = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];
