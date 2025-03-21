'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Form, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { toast } from 'sonner';
import LongdoMapPage from '../components/addresses/addressMap';
import { useParams, useRouter } from 'next/navigation';
import get from '@/pages/api/address/get';
import { isMain } from '@/pages/api/address/changIsMain';
import { deleteAddress } from '@/pages/api/address/delete';

export default function OraganizationPage() {
  const [, setLoading] = React.useState(false);
  const [, setErrors] = React.useState({}) as any;
  const [data, setData] = React.useState() as any;
  const [formData, setFormData] = React.useState({}) as any;
  const router = useRouter();
  // const [dataorg, setDataorg] = React.useState() as any;

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent the form from submitting to the URL

  //   const formData = new FormData(e.currentTarget);
  //   // Convert formData to an object
  //   const data = Object.fromEntries(formData.entries());
  //   console.log(data); // Log the form data for debugging
  // };

  const params = useParams<{ slug: string }>();

  React.useEffect(() => {
    if (!params || !params.slug) {
      return;
    }

    const fetchRoleSingle = async () => {
      const data = await get(params.slug);

      setData(data);
      setFormData(data.items.data);
    };

    fetchRoleSingle();
  }, [params]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        ...data,
        isMain: true,
      };

      delete payload.data;

      await isMain({}, payload, params?.slug);

      toast.success('📝 แก้ไขข้อมูลสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
    } catch (err: any) {
      toast.error('❌ ไม่สามารถแก้ไขข้อมูลได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      await deleteAddress(params?.slug);

      toast.success('ลบข้อมูลผู้ใช้งานสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/organization`);
    } catch (error) {
      toast.error('❌ ไม่สามารถลบข้อมูลผู้ใช้งานได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Delete error:', error);
    }
  };

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const payload = {
  //       ...formData,
  //       ...data,
  //       ...systemData,
  //       ...openDayData,
  //     };

  //     delete payload.data;

  //     const res = await updatesystem({}, payload);
  //     console.log('ข้อมูลที่จะส่ง', res);

  //     toast.success('📝 แก้ไขข้อมูลสำเร็จ!', {
  //       duration: 3000,
  //       position: 'bottom-left',
  //       style: { fontFamily: 'var(--font-ibm-sans)' },
  //     });

  //     // router.push(`/backoffice/notation/${res.data.id}`);
  //   } catch (err: any) {
  //     toast.error('❌ ไม่สามารถแก้ไขข้อมูลได้', {
  //       duration: 3000,
  //       position: 'bottom-left',
  //       style: { fontFamily: 'var(--font-ibm-sans)' },
  //     });

  //     console.error('Send FormData error:', err);
  //     setErrors({ general: err.message || 'An unexpected error occurred.' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleRowAddress = (row: any) => {
  //   setSelectedItem(row);
  //   openAddress2();
  // };

  // const handleRowSetting = (row: any) => {
  //   setSelectedItem(row);
  //   openSetting3();
  // };

  // const handleEditButton = (openEdit: boolean) => {
  //   return openEdit ? (
  //     <Button
  //       className="bg-accent1 text-white text-xs"
  //       key={'submit edit button'}
  //       type="submit"
  //       form="notation"
  //       // disabled={formData?.docStatus === 'canceled'}
  //     >
  //       ยืนยันแก้ไขข้อมูล
  //     </Button>
  //   ) : (
  //     <Button
  //       className="bg-accent3 text-white text-xs"
  //       key={'edit button'}
  //       onClick={() => {
  //         setOpenEdit(true);
  //       }}
  //       // disabled={formData?.docStatus === 'canceled'}
  //     >
  //       แก้ไขข้อมูล
  //     </Button>
  //   );
  // };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        name === 'birthDate' && value instanceof Date
          ? value.toISOString()
          : value,
    }));
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="ข้อมูลองค์กร"
            backpath={'/backoffice/organization?tab=address'}
            buttons={[
              <Button
                className="bg-accent1 text-white"
                key={'Edit organization'}
                type="submit"
                form="organization"
              >
                ตั้งเป็นที่อยู่หลัก
              </Button>,
              <Button
                className="bg-accent2 text-white"
                key={'delete button'}
                onClick={onDelete}
              >
                ลบที่อยู่
              </Button>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <Form id="organization" onSubmit={onSubmit} method="post">
                <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                  {/* Setting Address */}
                  <div className="flex space-x-4">
                    <CardComponent
                      customCard
                      custom={
                        <div className="p-4">
                          <div className="justify-between">
                            <h1 className="text-2xl font-bold text-headFont">
                              ข้อมูลที่อยู่องค์กร
                            </h1>

                            <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center mt-6 p-2">
                              {/* {address.map((address: any, index: any) => ( */}
                              <div>
                                <div className="flex gap-4">
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        ชื่อที่อยู่
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="name"
                                    value={formData?.name}
                                    placeholder="ชื่อที่อยู่"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        เมือง
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.city}
                                    name="city"
                                    placeholder="ชื่อเมือง"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="flex gap-4 mt-6">
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        จังหวัด
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.province}
                                    name="province"
                                    placeholder="ชื่อจังหวัด"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        รหัสไปรษณีย์
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.postalCode}
                                    name="postalCode"
                                    placeholder="ชื่อรหัสไปรษณีย์"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="flex gap-4 mt-6">
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        เลขห้อง
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.roomNo}
                                    name="roomNo"
                                    placeholder="เลขห้อง"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        ชั้นที่อยู่
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.floorNo}
                                    name="floorNo"
                                    placeholder="ชั้นที่อยู่"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        หมู่บ้าน
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.village}
                                    name="village"
                                    placeholder="หมู่บ้าน"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        เลขหมู่บ้าน
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="villageNo"
                                    value={formData?.villageNo}
                                    placeholder="เลขหมู่บ้าน"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="flex gap-4 mt-6">
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        บ้านเลขที่
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.houseNo}
                                    name="houseNo"
                                    placeholder="บ้านเลขที่"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        ตรอก
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.alley}
                                    name="alley"
                                    placeholder="ตรอก"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">ถนน</span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.road}
                                    name="road"
                                    placeholder="ถนน"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        อาคาร
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.building}
                                    name="building"
                                    placeholder="อาคาร"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="flex gap-4 mt-6">
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        ประเทศ
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.country}
                                    name="country"
                                    placeholder="ประเทศ"
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        เขต/อำเภอ
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    value={formData?.district}
                                    name="district"
                                    placeholder="เขต/อำเภอ"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                  <div className="flex gap-4 mt-6">
                                    <Input
                                      className="flex-1"
                                      label={
                                        <span className="text-headFont">
                                          แขวง/ตำบล
                                        </span>
                                      }
                                      labelPlacement="outside"
                                      value={formData?.subDistrict}
                                      name="subDistrict"
                                      placeholder="แขวง/ตำบล"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex gap-4 mt-6">
                                    <Textarea
                                      classNames={{
                                        base: '',
                                        input: 'resize-y min-h-[50px]',
                                      }}
                                      name="note"
                                      value={formData?.note}
                                      label="หมายเหตุ"
                                      labelPlacement="outside"
                                      placeholder="หมายเหตุ"
                                      variant="bordered"
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* ))} */}
                            </div>
                          </div>
                        </div>
                      }
                    />
                    <div className="flex-1">
                      <CardComponent customCard custom={<LongdoMapPage />} />
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      }
    />
  );
}
