import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button, Input } from '@nextui-org/react';
import React from 'react';

interface columns {
  title: string;
}

interface SkeletonTableProps {
  rowCount: number;
  columns: columns[];
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({ rowCount, columns }) => {
  return (
    <Skeleton>
      <div className="bg-white px-5 py-4 rounded-xl ">
        <div className="overflow-x-auto rounded-xl ">
          <Table className="border bg-white rounded-xl">
            <TableHeader className="rounded-t-xl">
              <TableRow className="text-sm hover:bg-gray-50 divide-x">
                {columns.map((col, index) => (
                  <TableCell
                    key={index}
                    className="py-2.5 px-4 font-semibold text-center whitespace-nowrap"
                  >
                    {col.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(rowCount)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className="p-3 border border-gray-200 text-sm"
                    >
                      <div className="h-4 bg-gray-300 rounded-md"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-end items-center mt-4 space-y-4 md:space-y-0">
          <div className="text-gray-700 text-sm">จากทั้งหมด รายการ</div>

          <div className="flex items-center space-x-2">
            <span className="text-sm">แสดง:</span>
            <Select>
              <SelectTrigger className="w-[110px] h-[30px] p-1 text-sm">
                <SelectValue placeholder="รายการ" className="text-sm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="รายการ">รายการ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button size={'sm'} className="bg-white shadow-md">
              ย้อนกลับ
            </Button>

            <Button size={'sm'} className="bg-white shadow-md">
              ถัดไป
            </Button>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};

const SkeletonInput: React.FC = () => {
  return (
    <Skeleton>
      <div className="w-full">
        <Input className="w-full" />
      </div>
    </Skeleton>
  );
};

export const SkeletonLoad = {
  Table: SkeletonTable,
  Input: SkeletonInput,
};
