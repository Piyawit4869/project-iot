'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import NextTable from '@/components/common/nextTable';
import { Select, SelectItem, DatePicker } from '@nextui-org/react';
import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { useState } from 'react';

export default function AttendanceSinglePage() {
  const [selectedActivity, setSelectedActivity] = useState<string>('All');
  
  const handleActivityChange = (activity: string) => {
    setSelectedActivity(activity);
  };

  const filteredData = data.filter((item) =>
    selectedActivity === 'All' ? true : item.action.toLowerCase() === selectedActivity.toLowerCase()
  );

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="Welcome to ('Full Name User') ,Attendace"
            subtitle="Role:Name"
            backpath={'/admin/activity/attendance/'}
          />
          <div className=" grid grid-row-12 grid-flow-col gap-12 mt-10">
            <Card className="max-w-[800px] mt-3 pl-50">
              <CardHeader className="">
                <div className="flex flex-col">
                  <h2 className="text-md">Working time Today:</h2>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <h1> 08:00 hour</h1>
              </CardBody>
              <Divider />
            </Card>
            <Card className="max-w-[800px] mt-3">
              <CardHeader className="">
                <div className="flex flex-col">
                  <h2 className="text-md">Working All time:</h2>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <h1> 130:00 hour</h1>
              </CardBody>
              <Divider />
            </Card>
          </div>
          <div className="bg-white shadow rounded-lg mb-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {/* Activity Filter */}
              <Select
                className="flex-1 p-2 text-headFont"
                size="sm"
                name="activity"
                label="Select Activity"
                onChange={(a) => handleActivityChange(a.target.value)}
              >
                <SelectItem className="text-headFont" key="all" value="All">
                  All
                </SelectItem>
                <SelectItem className="text-headFont" key="in" value="In">
                  In
                </SelectItem>
                <SelectItem className="text-headFont" key="break" value="Break">
                  Break
                </SelectItem>
                <SelectItem className="text-headFont" key="out" value="Out">
                  Out
                </SelectItem>
              </Select>
              {/* Day Filter */}
              <DatePicker className="flex-1 p-2 text-headFont" label="Select Date" />
            </div>
          </div>
          <div className="text-center">
            <NextTable columns={columns} rows={filteredData} />
          </div>
        </div>
      }
    />
  );
}

const columns: any = [
  { title: 'Action', dataIndex: 'action' },
  { title: 'Time', dataIndex: 'time' },
];

const data = [
  {
    id: 1,
    action: 'in',
    time: '08:00',
  },
  {
    id: 2,
    action: 'break',
    time: '13:00',
  },
  {
    id: 3,
    action: 'out',
    time: '17:00',
  },
];
