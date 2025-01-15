'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import Scaffold from '@/components/common/scaffold';
import { Input, Select, SelectItem } from '@nextui-org/react';
import { TablePagination } from '@/components/common/tablePagination';

export default function StatementPage() {
  const [, setPage] = React.useState(1);
  const [loading, ] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [meta, ] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  /* Connect API Accounting Statemant Fetch data from the API
  const fetchStatement = async () => {
    setLoading(true);
    try {
      // const {} = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await  API Accounting ({
        page,
        limit: rowsPerPage,
        // ...(name && { name }),
        // ...(docNo && { docNo }),
      });
      setItems(fetchedItems);
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching notations:', error);
    } finally {
      setLoading(false);
    }
  };
  */

  /* Debounced function to handle filter changes
  const handleFilterChange = React.useCallback(
      debounce((updatedFilters) => {
        setPage(1); // Reset to the first page for new filters
        setFilters(updatedFilters);
      }),
      [],
    );
  */

  /* Handle input changes
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };
  */

  /* ดึงข้อมูล API Fetch data whenever filters, page, or rowsPerPage change
  React.useEffect(() => {
      API Accounting();
    }, [page, rowsPerPage]);
  */

  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'รายการข้อมูลเงินเข้า-ออก'} />
          {/* Filter Bar */}
          <div className="bg-white shadow rounded-lg  mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {/* Search Bar */}
              <Input
                className="flex-1 p-2 text-headFont"
                labelPlacement="outside"
                size="lg"
                name="name"
                placeholder="ค้นหาชื่อ"
                // value={filters.name}
                // onChange={(e) => onInputChange('name', e.target.value)}
                isDisabled
              />

              {/* Category Filter */}

              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="category"
                label="เลือกประเภท"
                // value={filters.type}
                // onChange={(e) => onInputChange('type', e.target.value)}
                isDisabled
              >
                <SelectItem className="text-headFont" key={'option1'}>
                  ทุกประเภท
                </SelectItem>
                <SelectItem className="text-headFont" key={'option2'}>
                  รายได้
                </SelectItem>
                <SelectItem className="text-headFont" key={'option3'}>
                  รายจ่าย
                </SelectItem>
              </Select>

              {/* Status Filter */}

              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="status"
                label="เลือกสถานะ"
                // value={filters.status}
                // onChange={(e) => onInputChange('status', e.target.value)}
                isDisabled
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
              </Select>
            </div>
          </div>
          {/* Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner"></div>
            </div>
          ) : (
            <TablePagination
              initialRows={initialData}
              initialMeta={meta}
              rowsPerPage={rowsPerPage}
              columns={columns as any}
              onPageChange={(newPage) => setPage(newPage)}
              onRowsPerPageChange={(newRowsPerPage) =>
                setRowsPerPage(newRowsPerPage)
              }
            />
          )}
        </div>
      }
    />
  );
}

const initialData = [
  {
    id: 1,
    name: 'รายได้จากขาย Product A เดือนธันวาคม',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿50,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 2,
    name: 'รายได้จากการติดตั้ง Product A เดือนธันวาคม',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿2,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 3,
    name: 'ดอกเบี้ยเงินฝาก',
    category: 'interest', // Matches "รายได้ดอกเบี้ย"
    amount: '฿5,000',
    status: 'รอดำเนินการ',
    type: 'revenue',
  },
  {
    id: 4,
    name: 'รายได้จากหุ้น',
    category: 'yield', // Matches "รายได้จากการลงทุน"
    amount: '฿7,000',
    status: 'รอดำเนินการ',
    type: 'revenue',
  },
  {
    id: 5,
    name: 'รายได้จากค่าเช่าอาคาร เดือนมกราคม',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿15,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 6,
    name: 'รายได้จากขาย Product B เดือนมกราคม',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿40,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 7,
    name: 'รายได้จากการซ่อมแซมเครื่องจักร',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿8,000',
    status: 'รอดำเนินการ',
    type: 'revenue',
  },
  {
    id: 8,
    name: 'เงินปันผลจากหุ้น',
    category: 'yield', // Matches "รายได้จากการลงทุน"
    amount: '฿12,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 9,
    name: 'รายได้จากการขายวัสดุเหลือใช้',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿3,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 10,
    name: 'รายได้จากให้เช่าอุปกรณ์',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿5,000',
    status: 'รอดำเนินการ',
    type: 'revenue',
  },
  {
    id: 11,
    name: 'รายได้จากดอกเบี้ยเงินกู้',
    category: 'interest', // Matches "รายได้ดอกเบี้ย"
    amount: '฿10,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 12,
    name: 'รายได้จากการขายลิขสิทธิ์',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿20,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 13,
    name: 'รายได้จากการบริการหลังการขาย',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿6,000',
    status: 'รอดำเนินการ',
    type: 'revenue',
  },
  {
    id: 14,
    name: 'รายได้จากค่าเช่าที่ดิน',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿25,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 15,
    name: 'รายได้จากการขาย Product C เดือนกุมภาพันธ์',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿55,000',
    status: 'สำเร็จ',
    type: 'revenue',
  },
  {
    id: 16,
    name: 'เงินเดือนนายภูวิศ วัฒนะ',
    category: 'human', // งบบุคลากร
    amount: '฿50,000',
    status: 'สำเร็จ',
    type: 'expenses',
  },
  {
    id: 17,
    name: 'Parttime ของนาย ABC',
    category: 'human', // งบบุคลากร
    amount: '฿20,000',
    status: 'สำเร็จ',
    type: 'expenses',
  },
  {
    id: 18,
    name: 'Manhour ของนาย DEF',
    category: 'human', // งบบุคลากร
    amount: '฿5,000',
    status: 'รอดำเนินการ',
    type: 'expenses',
  },
  {
    id: 19,
    name: 'ค่าเช่ารถยนต์สำหรับโครงการ',
    category: 'operaion', // งบดำเนินงาน
    amount: '฿15,000',
    status: 'สำเร็จ',
    type: 'expenses',
  },
  {
    id: 20,
    name: 'ค่าเดินทางเพื่อประชุม',
    category: 'operaion', // งบดำเนินงาน
    amount: '฿12,000',
    status: 'สำเร็จ',
    type: 'expenses',
  },
  {
    id: 21,
    name: 'ค่าบำรุงรักษาเครื่องจักร',
    category: 'operaion', // งบดำเนินงาน
    amount: '฿8,000',
    status: 'รอดำเนินการ',
    type: 'expenses',
  },
  {
    id: 22,
    name: 'จัดซื้อคอมพิวเตอร์',
    category: 'invest', // งบลงทุน
    amount: '฿60,000',
    status: 'สำเร็จ',
    type: 'expenses',
  },
  {
    id: 23,
    name: 'จัดซื้ออุปกรณ์สำนักงาน',
    category: 'invest', // งบลงทุน
    amount: '฿25,000',
    status: 'สำเร็จ',
    type: 'expenses',
  },
  {
    id: 24,
    name: 'ค่าปรับปรุงอาคาร',
    category: 'invest', // งบลงทุน
    amount: '฿100,000',
    status: 'รอดำเนินการ',
    type: 'expenses',
  },
  {
    id: 25,
    name: 'เงินอุดหนุนองค์กรชุมชน',
    category: 'subsidy', // งบเงินอุดหนุน
    amount: '฿30,000',
    status: 'สำเร็จ',
    type: 'expenses',
  },
  {
    id: 26,
    name: 'เงินอุดหนุนงานวิจัย',
    category: 'subsidy', // งบเงินอุดหนุน
    amount: '฿45,000',
    status: 'รอดำเนินการ',
    type: 'expenses',
  },
  {
    id: 27,
    name: 'ค่าปรับโครงการล่าช้า',
    category: 'other', // งบรายจ่ายอื่น
    amount: '฿10,000',
    status: 'สำเร็จ',
    type: 'expenses',
  },
  {
    id: 28,
    name: 'ค่าใช้จ่ายไม่คาดฝัน',
    category: 'other', // งบรายจ่ายอื่น
    amount: '฿5,000',
    status: 'รอดำเนินการ',
    type: 'expenses',
  },
];

const columns = [
  { title: 'รายการที่', dataIndex: 'id', align: 'center' },
  { title: 'ชื่อ', dataIndex: 'name', link: '/admin/accounting/statement' },
  {
    title: 'เงินเข้า-ออก',
    dataIndex: 'type',
    align: 'center',
    render: (text: string) => (
      <span>{text === 'revenue' ? 'เงินเข้า' : 'เงินออก'}</span>
    ),
  },
  {
    title: 'ประเภท',
    dataIndex: 'category',
    render: (text: string) => <span>{handleCategory(text)}</span>,
  },
  { title: 'จำนวนเงิน', dataIndex: 'amount', align: 'center' },
  { title: 'สถานะ', dataIndex: 'status', align: 'center' },
];

const handleCategory = (category: string): string => {
  switch (category) {
    case 'sale':
      return 'รายได้จากการขาย';

    case 'service':
      return 'รายได้จากการให้บริการ';

    case 'interest':
      return 'รายได้ดอกเบี้ย';

    case 'yield':
      return 'รายได้จากการลงทุน';

    case 'human':
      return 'งบบุคลากร';

    case 'operaion':
      return 'งบดำเนินงาน';

    case 'invest':
      return 'งบลงทุน';

    case 'subsidy':
      return 'งบเงินอุดหนุน';

    case 'other':
      return 'งบและรายได้อื่นๆ';

    default:
      return 'หมวดหมู่ไม่ถูกต้อง'; // Return text for unrecognized categories
  }
};
