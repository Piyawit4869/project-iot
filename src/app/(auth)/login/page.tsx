'use client';

import { login } from '@/app/api/auth';
import { Button, Input, Image } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; // ✅ Import Toast
import LoginBackground from '../../../../public/background-login.png';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const { data } = await login({}, formData);

      // Fetch user data
      const me = await fetch(`${base_url}/auth/me/`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${data.accessToken}`,
        },
      }).then((response) => response.json());

      // Store login data in localStorage
      localStorage.setItem('me', JSON.stringify(me));
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      // ✅ Show success toast notification
      toast.success('🎉 เข้าสู่ระบบสำเร็จ!', {
        description: `ยินดีต้อนรับ, ${me.employeeRole.name}`,
        duration: 3000,
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      // Redirect based on user role
      if (me.employeeRole.name === 'super_admin') {
        router.push('/superadmin');
      } else if (
        me.employeeRole.name === 'employee' ||
        me.employeeRole.name === 'owner'
      ) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      // ❌ Show error toast notification
      toast.error('❌ เข้าสู่ระบบล้มเหลว!', {
        description: 'อีเมล ชื่อผู้ใช้ หรือผ่านไม่ถูกต้อง โปรดลองอีกครั้ง',
        duration: 3000,
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section - Branding & Illustration */}

      {/* i want to change this to background image  */}
      <div
        className="hidden lg:flex flex-col justify-center items-center w-1/2 text-white p-12 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/background-login.png')" }}
      >
        <div className="absolute inset-0 bg-[#19142a] opacity-80" />
        <div>
          <h1 className="text-4xl font-semibold mb-3 relative z-10">ROME</h1>
          <p className="text-lg  max-w-md relative z-10">
            ปลดล็อกพลังแห่งระบบอัตโนมัติและเพิ่มประสิทธิภาพการทำงาน
            จัดการการเข้างาน บันทึกข้อมูล
            และจัดการเวิร์กโฟลว์ของคุณได้อย่างง่ายดาย
          </p>
        </div>

        {/* Mockup Image */}
        {/* <div className="relative mt-8">
          <img
            src="https://static.vecteezy.com/system/resources/previews/011/377/062/original/continuous-one-line-drawing-colosseum-amphitheater-in-rome-italy-landmark-concept-single-line-draw-design-graphic-illustration-vector.jpg"
            alt="ภาพจำลอง"
            className="w-full max-w-lg shadow-lg rounded-lg"
          />
          <div className="absolute -top-5 left-10 w-20 h-20 border-2 border-white rounded-full overflow-hidden">
            <img
              src="https://th.bing.com/th/id/R.8a6e98694704f6a48a710409ef85c324?rik=p30zunKZVWjD1g&pid=ImgRaw&r=0"
              alt="ผู้ใช้ 1"
            />
          </div>
          <div className="absolute -bottom-5 right-10 w-20 h-20 border-2 border-white rounded-full overflow-hidden">
            <img
              src="https://aura.services/wp-content/uploads/2023/01/Female.png"
              alt="ผู้ใช้ 2"
            />
          </div>
        </div> */}
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 lg:p-16 bg-white">
        <h2 className="text-2xl font-bold mb-6">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          {/* Email Input */}
          <div>
            <label className="text-sm font-medium">อีเมล</label>
            <Input
              size="lg"
              name="username"
              placeholder="name@mail.com"
              variant="bordered"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              errorMessage="กรุณาป้อนอีเมลของคุณ"
              className="w-full"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="text-sm font-medium">รหัสผ่าน</label>
            <div className="flex justify-between items-center">
              <Input
                size="lg"
                name="password"
                type="password"
                placeholder="********"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
                errorMessage="กรุณาป้อนรหัสผ่าน"
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2 justify-between">
            <div>
              <input type="checkbox" id="remember" className="form-checkbox" />
              <label htmlFor="remember" className="text-sm">
                จดจำรหัสผ่าน
              </label>
            </div>

            <a
              href="#"
              className="text-sm text-blue-500 hover:underline ml-2 text-nowrap pl-12"
            >
              ลืมรหัสผ่าน?
            </a>
          </div>

          {/* Login Button */}
          <Button
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
                กำลังโหลด...
              </div>
            ) : (
              'เข้าสู่ระบบ'
            )}
          </Button>

          {/* Signup Link */}
          <p className="text-sm text-gray-600">
            ยังไม่มีบัญชี?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              สมัครสมาชิก
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">หรือ</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
          >
            <img
              src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0" // แก้ไขเป็นไอคอน Google ที่คุณใช้
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            เข้าสู่ระบบด้วย Google
          </button>
        </form>
      </div>
    </div>
  );
}
