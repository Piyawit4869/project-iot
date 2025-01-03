'use client';

import { login } from '@/app/api/auth';
import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const { data } = await login({}, formData);
      const me = await fetch(`${base_url}/auth/me/`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${data.accessToken}`,
        },
      }).then((response) => response.json());

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      if (me.role.name === 'super_admin') {
        router.push('/superadmin');
      } else if (
        me.role.name === 'employee' &&
        me.employeeRole.name === 'owner'
      ) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-6">ROME</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        {/* Email Input */}
        <div className="mb-3">
          <Input
            size="lg"
            name="username"
            placeholder="ชื่อผู้ใช้หรืออีเมล"
            variant="bordered"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            errorMessage="โปรดป้อนชื่อหรืออีเมล"
            className={`w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <Input
            size="lg"
            name="password"
            type="password"
            placeholder="รหัสผ่าน"
            variant="bordered"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            errorMessage="โปรดป้อนรหัสผ่าน"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading} // Disable during loading
          className={`w-full px-4 py-2 text-lg font-semibold text-white rounded-md ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              กำลังโหลด ...
            </div>
          ) : (
            'เข้าสู่ระบบ'
          )}
        </Button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
