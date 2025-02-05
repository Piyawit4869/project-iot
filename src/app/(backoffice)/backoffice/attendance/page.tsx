'use client';

import React, { useState, useMemo } from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
import { useRouter } from 'next/navigation';
import { Input, Select, SelectItem } from '@nextui-org/react';
import CardComponent from '@/components/common/card';

// Define TypeScript types
interface EmployeeData {
  id: number;
  order: string;
  name: string;
  role: string;
  status: string;
  in: string;
  break: string;
  out: string;
  summery: string;
  note: string;
}

interface FilterOption {
  label: string;
  value: string;
}

const filterOptions: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'Frontend' },
  { label: 'Backend', value: 'Backend' },
  { label: 'Mobile', value: 'Mobile' },
];

const filterstatusOptions: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'In', value: 'in' },
  { label: 'Break', value: 'break' },
  { label: 'Out', value: 'out' },
];

export default function AttendancePage() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedstatus, setSelectedstatus] = useState('all');
  const [employeeData, ] = useState<EmployeeData[]>([]);
  // State to hold JSON data

  const handleRowClick = (row: EmployeeData) => {
    router.push(`attendance/${row.id}`);
  };

  const handleRowClick1 = (row: EmployeeData) => {
    router.push(`attendance/workInfo/${row.id}`);
  };

  // Filter function to apply multiple filters
  const filteredData = useMemo(() => {
    if (!Array.isArray(employeeData)) return [];
    return employeeData.filter((item) => {
      const matchesRole =
        selectedRole === 'all' ||
        item.role.toLowerCase() === selectedRole.toLowerCase();
      const matchesstatus =
        selectedstatus === 'all' ||
        item.status.toLowerCase() === selectedstatus.toLowerCase();
      const matchesSearch =
        !searchValue ||
        item.name.toLowerCase().includes(searchValue.toLowerCase());

      return matchesRole && matchesstatus && matchesSearch;
    });
  }, [searchValue, selectedRole, selectedstatus, employeeData]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handlestatusChange = (value: string) => {
    setSelectedstatus(value);
  };

  const renderCard = (title: string, count: number, colorClass: string) => (
    <div className="flex-1">
      <CardComponent
        className={colorClass}
        customCard
        custom={
          <div className="text-center">
            <div className="text-sm text-white">{title}</div>
            <div className="text-2xl font-bold text-white">{count} คน</div>
            <div className="text-xs text-white mt-1">วันนี้</div>
          </div>
        }
      />
    </div>
  );

  return (
    <Scaffold
      child={
        <div>
          <TopSection title="ภาพรวมการทำงานในองค์กรวันนี้" />
          <div className="flex space-x-4 mt-8">
            {renderCard('เข้างาน', 10, 'bg-accent1')}
            {renderCard('ลาป่วย/ลากิจ', 0, 'bg-accent3')}
            {renderCard('มาสาย', 10, 'bg-accent2')}
            {renderCard('ขาด', 0, 'bg-secondary')}
          </div>
          <div className="bg-white shadow rounded-2xl mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              <Input
                className="flex-1 p-2 text-headFont"
                size="lg"
                name="name"
                placeholder="ค้นหาชื่อพนักงาน"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="role"
                label="เลือกตำแหน่ง"
                value={selectedRole}
                onChange={(r) => handleRoleChange(r.target.value)}
              >
                {filterOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    className="text-headFont"
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="status"
                label="เลือกสถานะ"
                value={selectedstatus}
                onChange={(a) => handlestatusChange(a.target.value)}
              >
                {filterstatusOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    className="text-headFont"
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <NextTable
              rows={filteredData}
              columns={columns}
              rowClickHandler={handleRowClick}
              tabFieldName="Overview Employee Table"
            />
          </div>
          <div>
            <NextTable
              rows={filteredData}
              columns={columns1}
              rowClickHandler={handleRowClick1}
              tabFieldName="Overview Workinfo Table"
            />
          </div>
        </div>
      }
    />
  );
}

const columns: any = [
  { title: 'Order', dataIndex: 'order', align: 'center' },
  { title: 'Full Name', dataIndex: 'name', align: 'left' },
  { title: 'Role', dataIndex: 'role', align: 'center' },
  { title: 'Status', dataIndex: 'status', align: 'center' },
  { title: 'In', dataIndex: 'in', align: 'center' },
  { title: 'Break', dataIndex: 'break', align: 'center' },
  { title: 'Out', dataIndex: 'out', align: 'center' },
  { title: 'Summary', dataIndex: 'summery', align: 'center' },
  { title: 'Note', dataIndex: 'note', align: 'center' },
];

const columns1: any = [
  { title: 'status', dataIndex: 'order', align: 'center' },
  { title: 'Full Name', dataIndex: 'name', align: 'left' },
  { title: 'WorkInfo', dataIndex: 'work', align: 'center' },
  { title: 'Note', dataIndex: 'note', align: 'center' },
];
