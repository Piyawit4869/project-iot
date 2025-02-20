'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import Scaffold from '@/components/common/scaffold';
import { Input, Select, SelectItem, Tab, Tabs } from '@nextui-org/react';
import TablePagination from '@/components/common/tablePagination';
import { Breadcrumb } from '@/components/common/breadcrumb';

export default function ExpensesPage() {
  const [, setPage] = React.useState(1);
  const [loading] = React.useState(false);
  // const [items, setItems] = React.useState([]) as any;
  // const [filters, setFilters] = React.useState({ name: '' });
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [meta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [selectedCategory, setSelectedCategory] = React.useState('all');

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

  const filteredData = initialData.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory,
  );

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
      <Scaffold
        child={
          <div>
            <TopSection title={'รายจ่าย'} />
            {/* Filter Bar */}
            <div className="bg-white shadow rounded-lg  mb-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                {/* Search Bar */}
                <Input
                  className="w-full p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  name="name"
                  placeholder="ค้นหาชื่อ"
                  // value={filters.name}
                  // onChange={(e) => onInputChange('name', e.target.value)}
                  isDisabled
                />

                {/* Category Filter */}

                <Select
                  className="w-full p-2 text-headFont"
                  size="sm"
                  name="category"
                  placeholder="เลือกประเภท"
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
                  className="w-full p-2 text-headFont"
                  size="sm"
                  name="status"
                  placeholder="เลือกสถานะ"
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

            {/* Tabs */}
            <div className="flex flex-wrap gap-4">
              <Tabs
                color="secondary"
                className="mt-2 mb-4"
                radius="full"
                aria-label="Tabs colors"
                selectedKey={selectedCategory}
                onSelectionChange={(key) => setSelectedCategory(key.toString())}
              >
                {tabs.map((tab: any) => (
                  <Tab key={tab.value} title={tab.label} />
                ))}
              </Tabs>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
              </div>
            ) : (
              <TablePagination
                initialRows={filteredData}
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
    </div>
  );
}

const initialData = [
  {
    id: 1,
    name: 'เงินเดือนนายภูวิศ วัฒนะ',
    category: 'human', // งบบุคลากร
    amount: '฿50,000',
    status: 'สำเร็จ',
  },
  {
    id: 2,
    name: 'Parttime ของนาย ABC',
    category: 'human', // งบบุคลากร
    amount: '฿20,000',
    status: 'สำเร็จ',
  },
  {
    id: 3,
    name: 'Manhour ของนาย DEF',
    category: 'human', // งบบุคลากร
    amount: '฿5,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 4,
    name: 'ค่าเช่ารถยนต์สำหรับโครงการ',
    category: 'operaion', // งบดำเนินงาน
    amount: '฿15,000',
    status: 'สำเร็จ',
  },
  {
    id: 5,
    name: 'ค่าเดินทางเพื่อประชุม',
    category: 'operaion', // งบดำเนินงาน
    amount: '฿12,000',
    status: 'สำเร็จ',
  },
  {
    id: 6,
    name: 'ค่าบำรุงรักษาเครื่องจักร',
    category: 'operaion', // งบดำเนินงาน
    amount: '฿8,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 7,
    name: 'จัดซื้อคอมพิวเตอร์',
    category: 'invest', // งบลงทุน
    amount: '฿60,000',
    status: 'สำเร็จ',
  },
  {
    id: 8,
    name: 'จัดซื้ออุปกรณ์สำนักงาน',
    category: 'invest', // งบลงทุน
    amount: '฿25,000',
    status: 'สำเร็จ',
  },
  {
    id: 9,
    name: 'ค่าปรับปรุงอาคาร',
    category: 'invest', // งบลงทุน
    amount: '฿100,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 10,
    name: 'เงินอุดหนุนองค์กรชุมชน',
    category: 'subsidy', // งบเงินอุดหนุน
    amount: '฿30,000',
    status: 'สำเร็จ',
  },
  {
    id: 11,
    name: 'เงินอุดหนุนงานวิจัย',
    category: 'subsidy', // งบเงินอุดหนุน
    amount: '฿45,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 12,
    name: 'ค่าปรับโครงการล่าช้า',
    category: 'other', // งบรายจ่ายอื่น
    amount: '฿10,000',
    status: 'สำเร็จ',
  },
  {
    id: 13,
    name: 'ค่าใช้จ่ายไม่คาดฝัน',
    category: 'other', // งบรายจ่ายอื่น
    amount: '฿5,000',
    status: 'รอดำเนินการ',
  },
];

const columns = [
  { title: 'รายการที่', dataIndex: 'id' },
  { title: 'ชื่อ', dataIndex: 'name', link: '/backoffice/accounting/expenses' },
  {
    title: 'ประเภทรายจ่าย',
    dataIndex: 'category',
    render: (text: string) => <span>{handleCategory(text)}</span>,
  },
  { title: 'จำนวนเงิน', dataIndex: 'amount' },
  { title: 'สถานะ', dataIndex: 'status' },
];

const tabs: any = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'งบบุคลากร', value: 'human' },
  { label: 'งบดำเนินงาน', value: 'operaion' },
  { label: 'งบลงทุน', value: 'invest' },
  { label: 'งบเงินอุดหนุน', value: 'subsidy' },
  { label: 'งบรายจ่ายอื่น', value: 'other' },
];

const handleCategory = (category: string): string => {
  switch (category) {
    case 'human':
      return 'งบบุคลากร';

    case 'operaion':
      return 'งบดำเนินงาน';

    case 'invest':
      return 'งบลงทุน';

    case 'subsidy':
      return 'งบเงินอุดหนุน';

    case 'other':
      return 'งบรายจ่ายอื่น';

    default:
      return 'หมวดหมู่ไม่ถูกต้อง'; // Return text for unrecognized categories
  }
};
