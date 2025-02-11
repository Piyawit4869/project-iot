'use client';

import { Button } from '@nextui-org/react';
import React from 'react';
import Scaffold from '@/components/common/scaffold';
import { TablePagination } from '@/components/common/tablePagination';
// import { updateIsmain } from '@/pages/api/organization/update-address';

interface addressTableProps {
  data: any;
}

export default function AddressTable({ data }: addressTableProps) {
  const [tableAddress, setTableAddress] = React.useState<any[]>([]);
  const [, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [meta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  React.useEffect(() => {
    if (data) {
      const filteredTable = data.organization.addresses.filter(
        (address: any) => address.isMain !== true,
      );
      setTableAddress(filteredTable);
    }
  }, [data]);

  // const onIsMain = async () => {
  //   try {
  //     const payload = {
  //       ...tableAddress,
  //       ...data,
  //     };

  //     delete payload.data;

  //     // await updateIsmain(payload);

  //     toast.success('เอกสารถูกเปลี่ยนเป็นรอตรวจสอบแล้ว!', {
  //       duration: 3000,
  //       position: 'bottom-left',
  //       style: { fontFamily: 'var(--font-ibm-sans)' },
  //     });
  //   } catch (error) {
  //     toast.error('❌ ไม่สามารถเปลี่ยนเอกสารเป็นรอตรวจสอบได้', {
  //       duration: 3000,
  //       position: 'bottom-left',
  //       style: { fontFamily: 'var(--font-ibm-sans)' },
  //     });
  //     console.error('Waiting error:', error);
  //   }
  // };

  return (
    <Scaffold
      child={
        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
          <TablePagination
            initialRows={tableAddress}
            initialMeta={meta}
            rowsPerPage={rowsPerPage}
            columns={columns}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newRowsPerPage) =>
              setRowsPerPage(newRowsPerPage)
            }
          />
        </div>
      }
    />
  );
}

const columns: any = [
  { title: 'ชื่อที่อยู่', dataIndex: 'name' },
  { title: 'บ้านเลขที่', dataIndex: 'houseNo' },
  { title: 'จังหวัด', dataIndex: 'province' },
  { title: 'อำเภอ/เขต', dataIndex: 'subDistrict' },
  {
    title: 'เปลี่ยนที่อยู่หลัก',
    dataIndex: 'isMain',
    render: () => (
      <Button className="bg-headFont text-white" size="sm">
        ตั้งเป็นที่อยู่หลัก
      </Button>
    ),
  },
  {
    title: 'ลบ',
    dataIndex: 'delete',
    // render: () => <Icon.DeleteOutlined className="ml-0.5 text-red-500" />,
    render: () => (
      <Button className="bg-accent2 text-white" size="sm">
        ลบที่อยู่
      </Button>
    ),
  },
];
