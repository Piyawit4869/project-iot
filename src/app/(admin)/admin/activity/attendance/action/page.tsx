'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

export const users = [
  {
    key: "1",
    name: "Tony Reichert",
    create_at: "00:00",
    update_at: "00:00",
    active: "on",
    present: "on",
    description: "Forward",
    important: "low",
    start_date: "01/12/2024",
    due_date: "01/12/2024",
    limited_time_day: "10 hour",
    start_Credits: "1000",
    all_Credits: "5000",
    total_hours: "40",
    pay_Day: "30/012/2024",
    user_ID: "7c26d407-b242-47aa-9c5e-1d3e0196af59",
    project_Code: "-",
    info: <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>,
  },{
    key: "2",
    name: "Vachira Rongmuang",
    create_at: "00:00",
    update_at: "00:00",
    active: "on",
    present: "on",
    description: "Forward",
    important: "low",
    start_date: "01/12/2024",
    due_date: "01/12/2024",
    limited_time_day: "10 hour",
    start_Credits: "1000",
    all_Credits: "5000",
    total_hours: "40",
    pay_Day: "30/012/2024",
    user_ID: "7c26d407-b242-47aa-9c5e-1d3e0196af59",
    project_Code: "-",
    info: <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>,
  },{
    key: "3",
    name: "Piyawit",
    create_at: "00:00",
    update_at: "00:00",
    active: "on",
    present: "on",
    description: "Forward",
    important: "low",
    start_date: "01/12/2024",
    due_date: "01/12/2024",
    limited_time_day: "10 hour",
    start_Credits: "1000",
    all_Credits: "5000",
    total_hours: "40",
    pay_Day: "30/012/2024",
    user_ID: "7c26d407-b242-47aa-9c5e-1d3e0196af59",
    project_Code: "-",
    info: <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>,
  },
  
];
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import CardComponent from '@/components/common/card';
import {Button} from "@nextui-org/react";


export default function ActionPage({
  Action,
  icon,
  subTitle,
  body,
  footer,
  customCard,
  custom,
  className,
}: any) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader className="text-center">
        <TableColumn key="name" className="text-center">NAME</TableColumn>
        <TableColumn key="create_at"className="text-center">Create_at</TableColumn>
        <TableColumn key="update_at"className="text-center">Update_at</TableColumn>
        <TableColumn key="active"className="text-center">Active</TableColumn>
        <TableColumn key="present"className="text-center">Present</TableColumn>
        <TableColumn key="description"className="text-center">Description</TableColumn>
        <TableColumn key="important"className="text-center">Important</TableColumn>
        <TableColumn key="start_date"className="text-center">Start_date</TableColumn>
        <TableColumn key="due_date"className="text-center">Due_date</TableColumn>
        <TableColumn key="limited_time_day"className="text-center">Limited_time/Day</TableColumn>
        <TableColumn key="start_Credits"className="text-center">Start_Credits</TableColumn>
        <TableColumn key="all_Credits"className="text-center">All_Credits</TableColumn>
        <TableColumn key="total_hours"className="text-center">Total_hours</TableColumn>
        <TableColumn key="pay_Day"className="text-center">Pay_Day</TableColumn>
        <TableColumn key="user_ID"className="text-center">User_ID</TableColumn>
        <TableColumn key="project_Code"className="text-center">Project_Code</TableColumn>
        <TableColumn key="info"className="text-center"> </TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

