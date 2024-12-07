'use client';

import React, { useActionState } from 'react';
import { login } from '@/app/(auth)/login/api/actions';

export default function LoginPage() {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [state, formAction] = useActionState<any, FormData>(login, undefined);

  // const handleLogin = async (e: React.FormEvent) => {
  //   // e.preventDefault(); // Prevent default form submission
  //   // setError(null); // Clear any previous errors
  //   // setLoading(true); // Start loading state
  //   // // const cookieStore = await cookies();

  //   // try {
  //   //   const res = await API.auth.login({ user, password });
  //   //   // cookieStore.set('accessToken', res.accessToken);
  //   //   // cookieStore.set('refreshToken', res.refreshToken);

  //   //   console.log({ res });

  //   //   login(res);

  //   //   // router.push('/superadmin');
  //   // } catch (err: any) {
  //   //   setError(err.message || 'An unexpected error occurred');
  //   // } finally {
  //   //   setLoading(false); // End loading state
  //   // }

  //   loginT({ user, password });
  // };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form
        action={formAction}
        className="w-full max-w-sm"
        // onSubmit={handleLogin}
      >
        {/* Email Input */}
        <div className="mb-4">
          <input
            name="username"
            type="email"
            placeholder="User"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full px-4 py-2 text-lg font-semibold text-white rounded-md ${
            // loading
            //   ? 'bg-gray-400 cursor-not-allowed'
            'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {'Login'}
        </button>

        {/* Error Message */}
        {state?.error && (
          <div className="mt-4 text-red-600">
            <p>{state.error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
