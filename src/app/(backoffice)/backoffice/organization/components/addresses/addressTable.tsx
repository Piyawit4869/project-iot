'use client';

import React from 'react';
import Scaffold from '@/components/common/scaffold';
import { TablePagination } from '@/components/common/tablePagination';
import pagination from '@/pages/api/address/paginate';
// import { updateIsmain } from '@/pages/api/organization/update-address';

// interface addressTableProps {
//   data: any;
// }

export default function AddressTable() {
  const [item, setItems] = React.useState([]) as any;
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  // React.useEffect(() => {
  //   if (data) {
  //     const filteredTable = data.organization.addresses.filter(
  //       (address: any) => address.isMain !== true,
  //     );
  //     setTableAddress(filteredTable);
  //   }
  // }, [data]);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        // const {} = filters;
        const { items: fetchedItems } = await pagination({
          page,
          limit: rowsPerPage,
          // ...(name && { name }),
          // ...(docNo && { docNo }),
        });
        setItems(fetchedItems.items);
        setMeta(fetchedItems.meta);
      } catch (error) {
        console.error('Error fetching notations:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchUser();
  }, [page, rowsPerPage]);

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
            initialRows={item}
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
  { title: 'ชื่อที่อยู่', dataIndex: 'name', link: '/backoffice/organization' },
  { title: 'บ้านเลขที่', dataIndex: 'houseNo' },
  { title: 'หมู่บ้าน', dataIndex: 'village' },
  { title: 'อำเภอ/เขต', dataIndex: 'subDistrict' },
  { title: 'เมือง', dataIndex: 'city' },
  { title: 'จังหวัด', dataIndex: 'province' },
];
