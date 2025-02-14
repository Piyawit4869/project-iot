'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Form, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { toast } from 'sonner';
import LongdoMapPage from '../components/addresses/addressMap';
import { useParams } from 'next/navigation';
import get from '@/pages/api/address/get';
import { isMain } from '@/pages/api/address/changIsMain';

export default function OraganizationPage() {
  const [, setLoading] = React.useState(false);
  const [, setErrors] = React.useState({}) as any;
  const [data, setData] = React.useState() as any;
  const [formData, setFormData] = React.useState({}) as any;
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
        isMain: true,
      };

      const res = await isMain({}, payload, params?.slug);
      console.log('ข้อมูลที่จะส่ง', res);

      toast.success('📝 แก้ไขข้อมูลสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      // router.push(`/backoffice/notation/${res.data.id}`);
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
                key={'Edit organization'}
                type="submit"
                form="organization"
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
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        เมือง
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="city"
                                    placeholder="ชื่อเมือง"
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
                                    name="province"
                                    placeholder="ชื่อจังหวัด"
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        รหัสไปรษณีย์
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="postalCode"
                                    placeholder="ชื่อรหัสไปรษณีย์"
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
                                    name="roomNo"
                                    placeholder="เลขห้อง"
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        ชั้นที่อยู่
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="floorNo"
                                    placeholder="ชั้นที่อยู่"
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        หมู่บ้าน
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="village"
                                    placeholder="หมู่บ้าน"
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
                                    placeholder="เลขหมู่บ้าน"
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
                                    name="houseNo"
                                    placeholder="บ้านเลขที่"
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        ตรอก
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="alley"
                                    placeholder="ตรอก"
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">ถนน</span>
                                    }
                                    labelPlacement="outside"
                                    name="road"
                                    placeholder="ถนน"
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        อาคาร
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="building"
                                    placeholder="อาคาร"
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
                                    name="country"
                                    placeholder="ประเทศ"
                                  />
                                  <Input
                                    className="flex-1"
                                    label={
                                      <span className="text-headFont">
                                        เขต/อำเภอ
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="district"
                                    placeholder="เขต/อำเภอ"
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
                                      name="subDistrict"
                                      placeholder="แขวง/ตำบล"
                                    />
                                  </div>
                                  <div className="flex gap-4 mt-6">
                                    <Textarea
                                      classNames={{
                                        base: '',
                                        input: 'resize-y min-h-[50px]',
                                      }}
                                      name="note"
                                      label="หมายเหตุ"
                                      labelPlacement="outside"
                                      placeholder="หมายเหตุ"
                                      variant="bordered"
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
