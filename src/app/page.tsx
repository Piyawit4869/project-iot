import { getSession } from '@/libs/lib';

export default async function App() {
  const session = await getSession();

  return (
    <div>
      <main>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Welcome to ROME!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {`"If you haven't figured out how to build Rome in a day. let us
              show you how with the ROME platform"`}
            </p>
            {session.isLoggedIn && (
              <a href={'/login'}>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow hover:bg-blue-700 transition duration-300 mr-5">
                  Sign in
                </button>
              </a>
            )}
            <a href={'/home'}>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow hover:bg-blue-700 transition duration-300">
                Bring to Homepage
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
