import { organizationLoader } from '@/app/api/organization';

export default async function OrganizationPage({ params }: any) {
  const { data: organization } = await organizationLoader(params.slug);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Organization Details
        </h1>
        <p className="text-gray-700">
          <strong>ID:</strong> {organization.id}
        </p>
        <p className="text-gray-700">
          <strong>Name:</strong> {organization.nameTh}
        </p>
      </div>
    </div>
  );
}
