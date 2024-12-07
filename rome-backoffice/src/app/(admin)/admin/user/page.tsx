'use client';

import { useRouter } from 'next/navigation';

export default function Indexpage() {
  const router = useRouter();

  // Example data for the table
  const organizations = [
    { id: 1, name: 'John Doe', slug: '1', role: 'Owner' },
    { id: 2, name: 'Doe John', slug: '2', role: 'Manager' },
    { id: 3, name: 'Don joh', slug: '3', role: 'Employee' },
  ];

  const handleRowClick = (slug: string) => {
    router.push(`user/${slug}`);
  };

  const handleNewPageClick = () => {
    router.push('user/new');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <button
            onClick={handleNewPageClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Add New User
          </button>
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
                  Role
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Username
                </th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr
                  key={org.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(org.slug)}
                >
                  <td className="px-6 py-4 text-gray-700">{org.id}</td>
                  <td className="px-6 py-4 text-gray-700">{org.name}</td>
                  <td className="px-6 py-4 text-gray-700">{org.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
