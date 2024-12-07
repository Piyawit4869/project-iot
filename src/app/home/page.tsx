'use client';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
          User-Focused Features
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Explore the features we designed to improve your experience and
          maximize productivity.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Feature 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
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
                d="M9.75 21l-2.5-7.5H1l5.5-4L3.25 2l5.5 4h7l5.5-4-2.25 7.5 5.5 4h-6.25l-2.5 7.5-5.5-4-5.5 4z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Fast Performance
          </h3>
          <p className="mt-2 text-gray-600">
            Experience lightning-fast load times and seamless interactions.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
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
                d="M9.75 21l-2.5-7.5H1l5.5-4L3.25 2l5.5 4h7l5.5-4-2.25 7.5 5.5 4h-6.25l-2.5 7.5-5.5-4-5.5 4z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Intuitive Interface
          </h3>
          <p className="mt-2 text-gray-600">
            Enjoy a simple, user-friendly interface that gets the job done.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
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
          <h3 className="text-xl font-semibold text-gray-900">
            Customizable Settings
          </h3>
          <p className="mt-2 text-gray-600">
            Tailor the app to meet your unique needs and preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
