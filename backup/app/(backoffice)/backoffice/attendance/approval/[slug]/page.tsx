'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
//API
import getSingle from '@/pages/api/approval/get';
import { statusApprove, statusReject } from '@/pages/api/approval/changestatus';
// component
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Form, Input } from '@nextui-org/react';
import CardComponent from '@/components/common/card';
//function helper
import { formatDate } from '@/utils/enums/date';
// icon
import * as Icon from '@ant-design/icons';

export default function WhitelistSinglePage() {
  const router = useRouter();
  const params = useParams<{ slug?: string }>();
  const [, setData] = React.useState() as any;
  const [loading, setLoading] = React.useState(false);
  const [errors] = React.useState({}) as any;
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
        if (!response?.data)
          throw new Error('No data found for the given slug');

        const formattedData = {
          ...response.data,
          startDate: formatDate(response.data.startDate).date,
          endDate: formatDate(response.data.endDate).date,
        };

        setData(response.data);
        setFormData(formattedData);
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

  const onApproved = async () => {
    try {
      await statusApprove(params?.slug);

      router.push(`/backoffice/attendance/whitelist/${params?.slug}`);
    } catch (error) {
      console.error('approved error:', error);
    }
  };

  const onRejected = async () => {
    try {
      await statusReject(params?.slug);

      router.push(`/backoffice/attendance/whitelist/${params?.slug}`);
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
              title="การลา"
              backpath={'/backoffice/attendance/whitelist'}
              buttons={[
                <div
                  className="mx-2.5 gap-2"
                  key={'button approved and rejected'}
                >
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
                      method="post"
                      validationErrors={errors}
                    >
                      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                        {/* Content Section */}
                        <div className="mb-6">
                          <div className="px-5 py-5">
                            {/* Detail Section */}
                            <div>
                              {/* GET API FOR SHOW DISPLAY */}
                              <div className="flex gap-4 mt-6">
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="ประเภทการลา"
                                  labelPlacement="outside"
                                  name="type"
                                  placeholder="กรุณากรอก ประเภทการลา"
                                  onChange={handleChange}
                                  defaultValue={formData?.type}
                                  errorMessage={'กรุณากรอกประเภทการลา'}
                                  isDisabled
                                />
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="เหตุผล"
                                  labelPlacement="outside"
                                  name="reasons"
                                  placeholder="กรุณากรอก เหตุผล"
                                  onChange={handleChange}
                                  defaultValue={formData?.reasons}
                                  errorMessage={'กรุณากรอกเหตุผล'}
                                  isDisabled
                                />
                              </div>
                              <div className="flex gap-4 mt-6">
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="สร้างโดย"
                                  labelPlacement="outside"
                                  name="createdBy"
                                  placeholder="กรุณากรอกสร้างโดย"
                                  onChange={handleChange}
                                  defaultValue={formData?.createdBy}
                                  errorMessage={'กรุณากรอกสร้างโดย'}
                                  isDisabled
                                />
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="สถานะ"
                                  labelPlacement="outside"
                                  name="status"
                                  placeholder="กรุณากรอกสถานะ"
                                  onChange={handleChange}
                                  defaultValue={formData?.status}
                                  errorMessage={'กรุณากรอกสถานะ'}
                                  isDisabled
                                />
                              </div>
                              <div className="flex gap-4 mt-6">
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="ตั้งแต่วันที่"
                                  labelPlacement="outside"
                                  name="startDate"
                                  placeholder="กรุณากรอกตั้งแต่วันที่"
                                  onChange={handleChange}
                                  defaultValue={formData?.startDate}
                                  errorMessage={'กรุณากรอกตั้งแต่วันที่'}
                                  isDisabled
                                />
                                <Input
                                  className="flex-1"
                                  size="lg"
                                  label="ถึงวันที่"
                                  labelPlacement="outside"
                                  name="endDate"
                                  placeholder="กรุณากรอกถึงวันที่"
                                  onChange={handleChange}
                                  defaultValue={formData?.endDate}
                                  errorMessage={'กรุณากรอกถึงวันที่'}
                                  isDisabled
                                />
                              </div>
                            </div>
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
