'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import Scaffold from '@/components/common/scaffold';
// import { useRouter } from 'next/navigation';
import { DatePicker, Select, SelectItem } from '@nextui-org/react';
import CardComponent from '@/components/common/card';

// Define TypeScript types
interface EmployeeData {
  id: string;
  action: string;
  name: string;
  role: string;
  activity: string;
  in: string;
  break: string;
  out: string;
  time: string;
  note: string;
  date: string;
}

interface FilterOption {
  label: string;
  value: string;
}

const filterActivityOptions: FilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'In', value: 'in' },
  { label: 'Break', value: 'break' },
  { label: 'Out', value: 'out' },
];

export default function AttendanceDetailPage() {
  const [selectedActivity, setSelectedActivity] = useState('all');
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]); // State to hold JSON data

  useEffect(() => {
    // Fetch JSON data from public directory
    fetch('/test.json') // ชื่อไฟล์เป็น test.json
      .then((response) => response.json())
      .then((data: EmployeeData[]) => {
        setEmployeeData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Run only once when component mounts

  // Filter function to apply multiple filters
  const filteredData = useMemo(() => {
    return employeeData.filter((item) => {
      const matchesActivity =
        selectedActivity === 'all' ||
        item.activity.toLowerCase() === selectedActivity.toLowerCase();

      return matchesActivity;
    });
  }, [selectedActivity, employeeData]);

  const handleActivityChange = (value: string) => {
    setSelectedActivity(value);
  };

  const renderCard = (title: string, count: number, colorClass: string) => (
    <div className="flex-1">
      <CardComponent
        className={colorClass}
        customCard
        custom={
          <div className="text-center">
            <div className="text-sm text-white">{title}</div>
            <div className="text-2xl font-bold text-white">{count} ชม.</div>
          </div>
        }
      />
    </div>
  );

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            backpath={'/backoffice/attendance/attendance'}
            title="ยินดีต้อนรับคุณ (' ชื่อจริง-นามสกุล ผู้ใช้ ') ,เข้าสู่หน้าการเข้าร่วม"
            subtitle="ตำแหน่ง : ?"
          />
          <div className="flex space-x-4 mt-8">
            {renderCard('เวลา(วันนี้)', 8, 'bg-accent2')}
            {renderCard('เวลาทั้งหมด', 130, 'bg-accent1')}
          </div>
          <div className="bg-white shadow rounded-2xl mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="activity"
                label="เลือกกิจกรรม"
                value={selectedActivity}
                onChange={(a) => handleActivityChange(a.target.value)}
              >
                {filterActivityOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    className="text-headFont"
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </Select>

              <DatePicker className=" flex-1 p-2" size="sm" label="Pick Date" />
            </div>
          </div>
          <div>
            <NextTable
              rows={filteredData}
              columns={columns}
              tabFieldName="Overview Employee table"
            />
          </div>
        </div>
      }
    />
  );
}

const columns: any = [
  { title: 'Action', dataIndex: 'activity', align: 'left' },
  { title: 'Time', dataIndex: 'time', align: 'center' },
  { title: 'Date', dataIndex: 'date', align: 'center' },
];
