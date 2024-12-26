import Link from 'next/link';
import { Table } from '@/components/common/table';
import { organizationsLoader } from '@/app/api/organization';

export default async function IndexPage() {
  const organizations = await organizationsLoader();
  console.log(organizations)

  return (
    <div className="bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">องค์กรทั้งหมด</h1>
          <Link href={`organization/new`}>
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
  { Header: 'ชื่อ', accessor: 'nameTh' },
  { Header: 'เบอร์โทรศัพท์', accessor: 'contactPhone' },
  { Header: 'อีเมลติดต่อ', accessor: 'contactEmail' },
  { Header: 'Facebook', accessor: 'contactFacebook' },
  { Header: 'ไลน์ไอดี', accessor: 'contactLine' },
  { Header: 'WhatsApp', accessor: 'contactWhatsapp' },
  { Header: 'เว็บไซต์', accessor: 'contactWebsite' },
  {
    Header: '',
    accessor: 'details',
  },
];
