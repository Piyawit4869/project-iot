'use client';

// import { notationsLoader } from '@/app/api/notation';
import NextTable from '@/components/common/nextTable';
// import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
// import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link } from '@nextui-org/react';
import React from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// pages/index.js

export default function NotationsPage() {
  // // // const router = useRouter();
  // const notations = (await notationsLoader({
  //   docNo: 'PO-24122401388',
  // })) as any;

  // console.log({ notations });

  // console.log({ notations });
  // const [data, setData] = React.useState() as any;

  // React.useEffect(() => {
  //   // Load data asynchronously when the component mounts
  //   loadNotations();
  // }, []); // Empty dependency array ensures it runs only once on initial render

  // const loadNotations = async () => {
  //   try {
  //     const notations = await notationsLoader();
  //     setData(notations.items || []); // Update state with the fetched notations
  //     console.log({ notations });
  //   } catch (error) {
  //     console.error('Error fetching notations:', error); // Handle any errors
  //   }
  // };

  // const handleRowClick = (row: any) => {
  //   router.push(`notation/${row.id}`); // Redirect to a dynamic route
  // };

  // const handleRowClick = (row: any) => {
  //   console.log({row});
  // };

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="เอกสารทั้งหมด"
              buttons={[
                <Link href={'notation/create'} key={'create button'}>
                  <Button
                    className="bg-accent1 text-white"
                    key={'create button'}
                  >
                    สร้างเอกสาร
                  </Button>
                </Link>,
              ]}
            />
            <div className="bg-white shadow rounded-lg  mb-4 mt-4">
              <div className="flex flex-wrap gap-4">
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                />
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="docNo"
                  placeholder="ค้นหาหมายเลขเอกสาร"
                />

                {/* <Select
                  className="flex-1 p-2 text-headFont"
                  size="sm"
                  name="category"
                  label="เลือกประเภท"
                >
                  {types.map((type: any) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select> */}

                {/* <SelectItem className="text-headFont" key={'option1'}>
                    ทุกประเภท
                  </SelectItem>
                  <SelectItem className="text-headFont" key={'option2'}>
                    รายได้
                  </SelectItem>
                  <SelectItem className="text-headFont" key={'option3'}>
                    รายจ่าย
                  </SelectItem> */}

                {/* <Select
                  className="flex-1 p-2 text-headFont"
                  size="sm"
                  name="status"
                  label="เลือกสถานะ"
                >
                  <SelectItem className="text-headFont" key={'option1'}>
                    ทุกสถานะ
                  </SelectItem>
                  <SelectItem className="text-headFont" key={'option2'}>
                    สำเร็จ
                  </SelectItem>
                  <SelectItem className="text-headFont" key={'option3'}>
                    รอดำเนินการ
                  </SelectItem>
                </Select> */}
              </div>
            </div>
            <NextTable
              columns={columns}
              rows={[]}
              // rowClickHandler={handleRowClick}
            />
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}

// const types: any = [
//   { key: 'all', label: 'ทุกประเภท' },
//   { key: 'revenue', label: 'รายได้' },
//   { key: 'expenses', label: 'รายจ่าย' },
// ];

const columns: any = [
  { title: 'รหัสเอกสาร', dataIndex: 'docNo' },
  { title: 'ประเภทเอกสาร', dataIndex: 'type' },
  { title: 'การดำเนินการ', dataIndex: 'status' },
  { title: 'สถานะเอกสาร', dataIndex: 'docStatus' },
];

// const data = [
//   {
//     id: 1,
//     docNo: 'QU-20241212',
//     type: 'ใบเสนอราคา',
//     status: 'แบบร่าง',
//     docStatus: 'แบบร่าง',
//   },
//   {
//     id: 2,
//     docNo: 'RC-20241212',
//     type: 'ใบเสร็จรับเงิน',
//     status: 'แบบร่าง',
//     docStatus: 'แบบร่าง',
//   },
// ];
