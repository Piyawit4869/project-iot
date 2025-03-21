import Link from 'next/link';

export default async function Homepage() {
  // const redirectToBackoffice = (role: string) => {
  //   switch (role) {
  //     case 'super_admin':
  //       return '/superadmin';
  //     case 'owner':
  //       return '/backoffice';
  //     default:
  //       return '/';
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12 sm:py-16 lg:py-20">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
          User-Focused Features
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl">
          Explore the features designed to enhance productivity and streamline
          your workflow.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {/* Feature 1: Attendance */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <svg
              className="h-8 w-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 2l-4 8H4l4 8h8l4-8h-8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Attendance</h3>
          <p className="mt-2 text-gray-600 text-center">
            Keep track of employee or team attendance effortlessly with
            real-time monitoring and comprehensive records to ensure
            accountability and transparency.
          </p>
        </div>

        {/* Feature 2: Notation */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20v-6m-6 6h12m-8-10V8m4 2v6m-4-6H6m8 0h4M5 9v2m2-2v2M5 7v2m2-2v2m6-4h2m-2 0h2m-6 0h2m-6 0h2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Notation</h3>
          <p className="mt-2 text-gray-600 text-center">
            Organize and manage documents effectively. Add, review, and
            collaborate on notations with ease, ensuring seamless document
            handling.
          </p>
        </div>

        {/* Feature 3: Planning */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.333 0 2.667-.667 4-2s2.667-3 4-4c0 1.333-.667 2.667-2 4s-3 2.667-4 4m-2 0c-1.333 0-2.667.667-4 2s-2.667 3-4 4c0-1.333.667-2.667 2-4s3-2.667 4-4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Planning</h3>
          <p className="mt-2 text-gray-600 text-center">
            Create, prioritize, and schedule tasks efficiently. Utilize planning
            tools to keep your projects on track and ensure everyone is aligned
            with objectives.
          </p>
        </div>
      </div>

      {/* Backoffice Button */}
      <div className="mt-8 flex justify-center items-center">
        <Link href={'/'}>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}
