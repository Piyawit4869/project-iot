import Link from 'next/link';
import { Table } from '@/components/common/table';
import { organizationsLoader } from '@/app/api/organization';

export default async function IndexPage() {
  const organizations = await organizationsLoader();

  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Action</h1>
          <Link href={`action/new`}>
            <button className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-gray-600">
              เพิ่มข้อมูลองค์กร
            </button>
          </Link>
        </div>

        {/* Table */}
        <Table data={organizations.items} columns={columns} />
      </div>
    </div>
  );
}

const columns = [
  { Header: 'name', accessor: 'name' },
  { Header: 'create_at', accessor: 'create_at' },
  { Header: 'update_at', accessor: 'update_at' },
  { Header: 'use', accessor: 'use' },
  { Header: 'now', accessor: 'now' },
  { Header: 'desciption', accessor: 'desciption' },
  { Header: 'importance', accessor: 'importance' },
  { Header: 'date_start', accessor: 'date_start' },
  { Header: 'due_date', accessor: 'due_date' },
  { Header: 'Limited time/day', accessor: 'Limited time/day' },
  { Header: 'Starting Credits', accessor: 'Starting Credits' },
  { Header: 'All Credits', accessor: 'All Credits' },
  { Header: 'Total_working_hours', accessor: 'Total_working_hours' },
  { Header: 'Pay Day', accessor: 'Pay Day' },
  { Header: 'User ID', accessor: 'User ID' },
  { Header: 'Project_Code', accessor: 'Project_Code' },
];
