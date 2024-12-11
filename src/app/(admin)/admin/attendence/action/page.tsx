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
  { Header: 'order', accessor: 'nameTh' },
  { Header: 'name', accessor: 'contactPhone' },
  { Header: 'active', accessor: 'contactEmail' },
  { Header: 'in', accessor: 'contactFacebook' },
  { Header: 'break', accessor: 'contactLine' },
  { Header: 'out', accessor: 'contactWhatsapp' },
  { Header: 'Summary time', accessor: 'contactWebsite' },
  { Header: 'Note', accessor: 'Note' },
  {
    Header: '',
    accessor: 'details',
  },
];
