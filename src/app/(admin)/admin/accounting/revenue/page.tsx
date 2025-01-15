'use client';

import React from 'react';
import { TopSection } from '@/components/common/topSection';
import Scaffold from '@/components/common/scaffold';
import { Input, Select, SelectItem, Tabs, Tab } from '@nextui-org/react';
import { TablePagination } from '@/components/common/tablePagination';

export default function RevenuePage() {
  const [, setPage] = React.useState(1);
  const [loading, ] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [meta, ] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Fetch data from the API
  /*
  const fetchNotations = async () => {
    setLoading(true);
    try {
      const { name, docNo } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await API Revenue({
        page,
        limit: rowsPerPage,
        ...(name && { name }),
        ...(docNo && { docNo }),
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

  // Debounced function to handle filter changes
  /*
  const handleFilterChange = React.useCallback(
    debounce((updatedFilters) => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }),
    [],
  );
  */

  // Handle input changes
  /*
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };
  */

  // Fetch data whenever filters, page, or rowsPerPage change
  /*
  React.useEffect(() => {
    fetchNotations();
  }, [filters, page, rowsPerPage]);
  */

  const filteredData = initialData.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory,
  );

  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'รายได้'} />
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

          {/* Tabs */}
          <div className="flex flex-wrap gap-4">
            <Tabs
              color="secondary"
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
  );
}

const initialData = [
  {
    id: 1,
    name: 'รายได้จากขาย Product A เดือนธันวาคม',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿50,000',
    status: 'สำเร็จ',
  },
  {
    id: 2,
    name: 'รายได้จากการติดตั้ง Product A เดือนธันวาคม',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿2,000',
    status: 'สำเร็จ',
  },
  {
    id: 3,
    name: 'ดอกเบี้ยเงินฝาก',
    category: 'interest', // Matches "รายได้ดอกเบี้ย"
    amount: '฿5,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 4,
    name: 'รายได้จากหุ้น',
    category: 'yield', // Matches "รายได้จากการลงทุน"
    amount: '฿7,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 5,
    name: 'รายได้จากค่าเช่าอาคาร เดือนมกราคม',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿15,000',
    status: 'สำเร็จ',
  },
  {
    id: 6,
    name: 'รายได้จากขาย Product B เดือนมกราคม',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿40,000',
    status: 'สำเร็จ',
  },
  {
    id: 7,
    name: 'รายได้จากการซ่อมแซมเครื่องจักร',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿8,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 8,
    name: 'เงินปันผลจากหุ้น',
    category: 'yield', // Matches "รายได้จากการลงทุน"
    amount: '฿12,000',
    status: 'สำเร็จ',
  },
  {
    id: 9,
    name: 'รายได้จากการขายวัสดุเหลือใช้',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿3,000',
    status: 'สำเร็จ',
  },
  {
    id: 10,
    name: 'รายได้จากให้เช่าอุปกรณ์',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿5,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 11,
    name: 'รายได้จากดอกเบี้ยเงินกู้',
    category: 'interest', // Matches "รายได้ดอกเบี้ย"
    amount: '฿10,000',
    status: 'สำเร็จ',
  },
  {
    id: 12,
    name: 'รายได้จากการขายลิขสิทธิ์',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿20,000',
    status: 'สำเร็จ',
  },
  {
    id: 13,
    name: 'รายได้จากการบริการหลังการขาย',
    category: 'service', // Matches "รายได้จากการให้บริการ"
    amount: '฿6,000',
    status: 'รอดำเนินการ',
  },
  {
    id: 14,
    name: 'รายได้จากค่าเช่าที่ดิน',
    category: 'other', // Matches "รายได้อื่นๆ"
    amount: '฿25,000',
    status: 'สำเร็จ',
  },
  {
    id: 15,
    name: 'รายได้จากการขาย Product C เดือนกุมภาพันธ์',
    category: 'sale', // Matches "รายได้จากการขาย"
    amount: '฿55,000',
    status: 'สำเร็จ',
  },
];

const columns = [
  { title: 'รายการที่', dataIndex: 'id', align: 'center' },
  { title: 'ชื่อ', dataIndex: 'name', link: '/admin/accounting/revenue' },
  {
    title: 'ประเภทรายได้',
    dataIndex: 'category',
    render: (text: string) => <span>{handleCategory(text)}</span>,
  },
  { title: 'จำนวนเงิน', dataIndex: 'amount', align: 'center' },
  { title: 'สถานะ', dataIndex: 'status', align: 'center' },
];

const tabs: any = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'รายได้จากการขาย', value: 'sale' },
  { label: 'รายได้จากการให้บริการ', value: 'service' },
  { label: 'รายได้ดอกเบี้ย', value: 'interest' },
  { label: 'รายได้จากการลงทุน', value: 'yield' },
  { label: 'รายได้อื่นๆ', value: 'other' },
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

    case 'other':
      return 'รายได้อื่นๆ';

    default:
      return 'หมวดหมู่ไม่ถูกต้อง'; // Return text for unrecognized categories
  }
};
