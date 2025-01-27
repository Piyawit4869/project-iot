'use client';

import { Button, Form, Input, Textarea } from '@nextui-org/react';
import { update } from '@/pages/api/whitelists/update'; // API update
import { deleteWhitelists } from '@/pages/api/whitelists/delete'; // API delete
import getSingle from '@/pages/api/whitelists/get'; // API get
import { changeStatusApproveWhitelists } from '@/pages/api/whitelists/changestatus'; // API change status
import { changeStatusRejectWhitelists } from '@/pages/api/whitelists/changestatus'; // API change status
import { TopSection } from '@/components/common/topSection';
import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { useRouter, useParams } from 'next/navigation';
import * as Icon from '@ant-design/icons';
import Map from '@/components/map/map';
import React from 'react';

export default function WhitelistSinglePage() {
  const router = useRouter();
  const params = useParams<{ slug?: string }>();
  const [data, setData] = React.useState() as any;
  const [loading, setLoading] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL parameters.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await getSingle(params.slug as string);
        if (!response?.data) {
          throw new Error('No data found for the given slug');
        }
        setData(response.data);
        setFormData(response.data); // อัปเดต formData
      } catch (error) {
        console.error('Error fetching whitelist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;

    // If the field is within the address object
    if (name.startsWith('address.')) {
      const fieldName = name.split('.')[1]; // e.g., "name", "houseNo"
      setFormData((prevData: any) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [fieldName]: type === 'checkbox' ? checked : value, // Use `checked` for checkboxes, `value` for inputs
        },
      }));
    } else {
      // Handle other fields normally
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Ensure address fields are validated as well
    const requiredFields = [
      // 'address.name',
      // 'address.houseNo',
      // 'address.road',
      // 'address.province',
      // 'address.city',
      // 'address.subDistrict',
      '',
    ];
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      const fieldParts = field.split('.');
      const fieldValue = formData[fieldParts[0]]?.[fieldParts[1]];
      if (!fieldValue || fieldValue.trim() === '') {
        newErrors[field] = `Field ${field} is required.`;
      }
    });

    try {
      console.log('name');

      const payload = {
        ...data,
        ...formData, // All data including the updated address fields
      };
      console.log('Payload:', payload);

      const res = await update({}, payload, params?.slug);
      setOpenEdit(false);
      router.push(`/admin/attendance/whitelist/${res.data.id}`);
    } catch (err: any) {
      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
      console.log('name2');
    } finally {
      setLoading(false);
      console.log('name3');
    }
  };

  const onDelete = async () => {
    try {
      if (confirm('Are you sure you want to delete this item?')) {
        await deleteWhitelists(params?.slug); // Delete the whitelist entry via the API
        router.push(`/admin/attendance/whitelist`); // Redirect to the whitelist page after deletion
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEditButton = (openEdit: boolean) => {
    return openEdit ? (
      <a className="">
        <Button
          className={`bg-${
            data?.docStatus === 'rejected'
              ? 'gray-400 cursor-not-allowed'
              : 'accent1'
          } text-white p-2`}
          key={'submit edit button'}
          size="sm"
          type="submit"
          form="whitelist"
          disabled={data?.docStatus === 'rejected'}
        >
          <Icon.CheckOutlined />
          เสร็จสิ้น
        </Button>
      </a>
    ) : (
      <a className="">
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

  const onApproved = async () => {
    try {
      await changeStatusApproveWhitelists(params?.slug);

      router.push(`/admin/attendance/whitelist/${params?.slug}`);
    } catch (error) {
      console.error('approved error:', error);
    }
  };

  const onRejected = async () => {
    try {
      await changeStatusRejectWhitelists(params?.slug);

      router.push(`/admin/attendance/whitelist/${params?.slug}`);
    } catch (error) {
      console.error('Rejected error:', error);
    }
  };

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
          <div>
            <TopSection
              title="แก้ไขการเข้าใช้งาน"
              backpath={'/admin/attendance/whitelist'}
              buttons={[
                <div className="mx-2.5 gap-2" key="status button">
                  <Button
                    key={'approve whitelist button'}
                    className="bg-accent1 text-white m-1"
                    type="button"
                    size="sm"
                    onClick={onApproved}
                  >
                    <Icon.CheckOutlined />
                    อนุมัติ
                  </Button>

                  <Button
                    key={'reject whitelist button'}
                    className="bg-accent2 text-white m-1"
                    type="button"
                    size="sm"
                    onClick={onRejected}
                  >
                    <Icon.CloseOutlined />
                    ปฏิเสธ
                  </Button>

                  {handleEditButton(openEdit)}

                  <Button
                    key={'cancel whitelist button'}
                    className="bg-accent2 text-white m-1"
                    type="button"
                    size="sm"
                    onClick={onDelete}
                  >
                    <Icon.DeleteFilled />
                    ลบ
                  </Button>
                </div>,
              ]}
            />
            <div className="flex space-x-4 mt-6">
              <div className="flex-1">
                <CardComponent
                  customCard
                  custom={
                    <Form
                      id="whitelist"
                      onSubmit={onSubmit}
                      method="post"
                      validationErrors={errors}
                    >
                      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                        {/* Content Section */}
                        <div className="mb-6">
                          <div className="grid grid-cols-2 gap-6 px-5">
                            {/* Detail Section */}
                            <div>
                              <h1 className="text-2xl font-bold text-headFont mb-10 py-5">
                                Detail
                              </h1>
                              {/* Whitelist Section */}
                              {/* <div className="flex-1 flex items-center gap-4">
                                <span className="text-headFont">Active</span>
                                <Switch
                                  name="active"
                                  color="secondary"
                                  onChange={handleChange}
                                  required
                                  isDisabled={!openEdit}
                                />
                              </div> */}
                              {/* GET API FOR SHOW DISPLAY */}
                              <div className="flex gap-4 mt-6">
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="IP"
                                  labelPlacement="outside"
                                  name="ip"
                                  placeholder="Enter your IP Address"
                                  onChange={handleChange}
                                  defaultValue={formData?.ip}
                                  errorMessage={'กรุณากรอกที่อยู่ไอพี'}
                                  isDisabled={!openEdit}
                                />
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="ISP"
                                  labelPlacement="outside"
                                  name="isp"
                                  placeholder="Enter your ISP"
                                  onChange={handleChange}
                                  defaultValue={formData?.isp}
                                  errorMessage={'กรุณากรอกที่อยู่ไอเอสพี'}
                                  isDisabled={!openEdit}
                                />
                              </div>
                              <div className="flex gap-4 mt-6">
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="Browser"
                                  labelPlacement="outside"
                                  name="browser"
                                  placeholder="Enter your Browser"
                                  onChange={handleChange}
                                  defaultValue={formData?.browser}
                                  errorMessage={'กรุณากรอกที่อยู่บราวเซอร์'}
                                  isDisabled={!openEdit}
                                />
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="OS"
                                  labelPlacement="outside"
                                  name="os"
                                  placeholder="Enter your OS"
                                  onChange={handleChange}
                                  defaultValue={formData?.os}
                                  errorMessage={'กรุณากรอกที่อยู่โอเอส'}
                                  isDisabled={!openEdit}
                                />
                              </div>
                            </div>

                            {/* Map Section */}
                            <div className="">
                              <h1 className="text-2xl font-bold text-headFont pl-5 py-5  ">
                                Map
                              </h1>
                              <div>
                                <Map />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Address Section */}
                        <div className="px-5 py-5">
                          <h1 className="text-2xl font-bold text-headFont">
                            Address
                          </h1>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="สถานที่"
                              labelPlacement="outside"
                              name="name"
                              placeholder="กรอก สถานที่"
                              onChange={handleChange}
                              defaultValue={formData?.address?.name || ''}
                              isRequired
                              errorMessage={'กรุณากรอกสถานที่'}
                              isDisabled={!openEdit}
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="บ้านเลขที่"
                              labelPlacement="outside"
                              name="houseNo"
                              placeholder="กรอก บ้านเลขที่"
                              defaultValue={formData?.address?.houseNo || ''}
                              onChange={handleChange}
                              isRequired
                              isDisabled={!openEdit}
                              errorMessage={'กรุณากรอก บ้านเลขที่'}
                            />
                          </div>
                          {/* More Address Fields */}
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="ประเทศ"
                              labelPlacement="outside"
                              name="country"
                              placeholder="กรอก ประเทศ"
                              defaultValue={formData?.address?.country || ''}
                              onChange={handleChange}
                              isRequired
                              isDisabled={!openEdit}
                              errorMessage={'กรุณากรอก ประเทศ'}
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="จังหวัด"
                              labelPlacement="outside"
                              name="province"
                              placeholder="กรอก จังหวัด"
                              defaultValue={formData?.address?.province || ''}
                              onChange={handleChange}
                              isRequired
                              isDisabled={!openEdit}
                              errorMessage={'กรุณากรอก จังหวัด'}
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="ถนน"
                              labelPlacement="outside"
                              name="road"
                              placeholder="กรอก ถนน"
                              defaultValue={formData?.address?.road || ''}
                              onChange={handleChange}
                              isRequired
                              isDisabled={!openEdit}
                              errorMessage={'กรุณากรอก ถนน'}
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="ซอย"
                              labelPlacement="outside"
                              name="alley"
                              placeholder="กรอก ซอย"
                              defaultValue={formData?.address?.alley || ''}
                              onChange={handleChange}
                              isRequired
                              isDisabled={!openEdit}
                              errorMessage={'กรุณากรอก ซอย'}
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="เขต/อำเภอ"
                              labelPlacement="outside"
                              name="city"
                              placeholder="กรอก เขต/อำเภอ"
                              defaultValue={formData?.address?.city || ''}
                              onChange={handleChange}
                              isRequired
                              isDisabled={!openEdit}
                              errorMessage={'กรุณากรอก เขต/อำเภอ'}
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="แขวง/ตำบล"
                              labelPlacement="outside"
                              name="subDistrict"
                              placeholder="กรอก แขวง/ตำบล"
                              defaultValue={
                                formData?.address?.subDistrict || ''
                              }
                              onChange={handleChange}
                              isRequired
                              isDisabled={!openEdit}
                              errorMessage={'กรุณากรอก แขวง/ตำบล'}
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="ชื่ออาคาร"
                              labelPlacement="outside"
                              name="building"
                              placeholder="กรอก ชื่ออาคาร"
                              defaultValue={formData?.address?.building || ''}
                              onChange={handleChange}
                              isDisabled={!openEdit}
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="postalcode"
                              labelPlacement="outside"
                              name="postalCode"
                              placeholder="กรอก postalcode"
                              defaultValue={formData?.address?.postalCode || ''}
                              onChange={handleChange}
                              isDisabled={!openEdit}
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="เลขห้อง"
                              labelPlacement="outside"
                              name="roomNo"
                              placeholder="กรอก เลขห้อง"
                              defaultValue={formData?.address?.roomNo || ''}
                              onChange={handleChange}
                              isDisabled={!openEdit}
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="เลขชั้น"
                              labelPlacement="outside"
                              name="floorNo"
                              placeholder="กรอก เลขชั้น"
                              defaultValue={formData?.address?.floorNo || ''}
                              onChange={handleChange}
                              isDisabled={!openEdit}
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="ชื่อหมู่บ้าน"
                              labelPlacement="outside"
                              name="village"
                              placeholder="กรอก ชื่อหมู่บ้าน"
                              defaultValue={formData?.address?.village || ''}
                              onChange={handleChange}
                              isDisabled={!openEdit}
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="เลขที่หมู่บ้าน"
                              labelPlacement="outside"
                              name="villageNo"
                              type="number"
                              placeholder="กรอก เลขที่หมู่บ้าน"
                              defaultValue={formData?.address?.villageNo || ''}
                              onChange={handleChange}
                              isDisabled={!openEdit}
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="organizationId"
                              labelPlacement="outside"
                              name="organizationId"
                              placeholder="กรอก organizationId "
                              defaultValue={
                                formData?.address?.organizationId || ''
                              }
                              onChange={handleChange}
                              isDisabled={!openEdit}
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="branchId"
                              labelPlacement="outside"
                              name="branchId"
                              placeholder="กรอก branchId"
                              defaultValue={formData?.address?.branchId || ''}
                              onChange={handleChange}
                              isDisabled={!openEdit}
                            />
                          </div>
                          {/* Notes Section */}
                          <div className="flex gap-4 mt-6">
                            <Textarea
                              label="หมายเหตุ"
                              labelPlacement="outside"
                              name="note"
                              placeholder="หมายเหตุ"
                              defaultValue={formData?.address?.note || ''}
                              onChange={handleChange}
                              isDisabled={!openEdit}
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
        )
      }
    />
  );
}
