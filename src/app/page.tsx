'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SkeletonUi } from '@/components/ui/skeleton';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result: any = await signIn('credentials', {
        redirect: false,
        user,
        password,
      });

      if (result?.ok) {
        toast.success('🎉 เข้าสู่ระบบสำเร็จ!', {
          description: `ยินดีต้อนรับ, ${user}`,
          duration: 3000,
          style: { fontFamily: 'var(--font-ibm-sans)' },
        });

        await checkServerReady();
        router.push('/backoffice');
      } else {
        setError(result.error);
        setLoading(false);
        throw new Error(result?.error || 'Invalid credentials');
      }
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred.');
      toast.error('❌ เข้าสู่ระบบล้มเหลว!', {
        description: 'อีเมล ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง',
        duration: 3000,
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
    } finally {
      setLoading(false);
    }
  };

  const checkServerReady = async (): Promise<void> => {
    let isReady = false;
    while (!isReady) {
      try {
        const response = await fetch('/backoffice', { method: 'GET' });
        if (response.ok) {
          isReady = true;
        } else {
          throw new Error('Server not ready');
        }
      } catch (error: any) {
        console.log(`Retry: Server not ready, waiting...`, error);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:flex flex-col justify-center items-center w-1/2 text-white p-12 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/background-login.png')" }}
      >
        <div className="absolute inset-0 bg-[#19142a] opacity-80" />
        <div className="relative z-10">
          <h1 className="text-4xl font-semibold mb-3">ROME</h1>
          <p className="text-lg max-w-md">
            ปลดล็อกพลังแห่งระบบอัตโนมัติและเพิ่มประสิทธิภาพการทำงาน
            จัดการการเข้างาน บันทึกข้อมูล และจัดการ Work flow
            ของคุณได้อย่างง่ายดาย
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 lg:p-16 bg-white">
        <h2 className="text-2xl font-bold mb-6">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          {loading ? (
            <SkeletonUi>
              <label className="text-sm font-medium">อีเมล</label>
              <input
                disabled
                className="w-full p-3 border rounded-md bg-gray-100"
              />
              <div className="mt-6">
                <label className="text-sm font-medium">รหัสผ่าน</label>
                <input
                  disabled
                  className="w-full p-3 border rounded-md bg-gray-100"
                />
              </div>
            </SkeletonUi>
          ) : (
            <div>
              <div>
                <label className="text-sm font-medium">อีเมล</label>
                <input
                  type="text"
                  name="user"
                  placeholder="name@mail.com"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                  required
                />
              </div>

              <div className="relative w-full mt-6">
                <label className="text-sm font-medium">รหัสผ่าน</label>
                <div className="flex justify-between items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="กรุณากรอกรหัสผ่านของคุณ"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'แสดง' : 'ซ่อน'}
                    className="absolute right-0 pr-5"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639..."
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477...M6.228 6.228L3 3..."
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold text-white rounded-md transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-secondary hover:bg-gray-500'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                    className="opacity-75"
                  />
                </svg>
                กำลังโหลด...
              </div>
            ) : (
              'เข้าสู่ระบบ'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
