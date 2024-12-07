import Link from 'next/link';
import { organizationsLoader } from './api/loaders';

export default async function IndexPage() {
  const organizations = await organizationsLoader();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
          <Link href={`organization/new`}>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
              Add New Organization
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-md overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Organization Name
                </th>
              </tr>
            </thead>
            <tbody>
              {organizations.items.map((organize: any) => (
                <tr
                  key={organize.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="px-6 py-4 text-gray-700">
                    <Link href={`organization/${organize.id}`}>
                      {organize.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <Link href={`organization/${organize.id}`}>
                      {organize.nameTh}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
