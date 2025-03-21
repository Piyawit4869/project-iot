import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
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

    if (!isReady) {
      throw new Error('Server is still not ready after multiple retries.');
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:flex flex-col justify-center items-center w-1/2 text-white p-12 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/background-login.png')" }}
      >
        <div className="absolute inset-0 bg-[#19142a] opacity-80" />
        <div>
          <h1 className="text-4xl font-semibold mb-3 relative z-10">ROME</h1>
          <p className="text-lg  max-w-md relative z-10">
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
              <Input size="lg" />

              <div className="mt-6">
                <label className="text-sm font-medium">รหัสผ่าน</label>
                <Input size="lg" />
              </div>
            </SkeletonUi>
          ) : (
            <div>
              {/* Email Input */}
              <div>
                <label className="text-sm font-medium">อีเมล</label>
                <Input
                  size="lg"
                  name="user"
                  placeholder="name@mail.com"
                  variant="bordered"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  errorMessage="กรุณาป้อนอีเมลของคุณ"
                  className="w-full"
                  required
                />
              </div>

              <div className="relative w-full mt-6">
                <label className="text-sm font-medium">รหัสผ่าน</label>
                <div className="flex justify-between items-center">
                  <Input
                    size="lg"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="กรุณากรอกรหัสผ่านของคุณ"
                    variant="bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                    required
                    errorMessage="กรุณาป้อนรหัสผ่าน"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'แสดง' : 'ซ่อน'}
                    // className="text-black dark:text-white ml-3"
                    className="absolute right-0 items-center pr-5 cursor-pointer"
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 select-none  cursor-pointer h-6 top-2 right-2 hover:text-accent2 transition-colors duration-200"
                        tabIndex={-1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 select-none cursor-pointer h-6 top-2 right-2 hover:text-accent1 transition-colors duration-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

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
        </form>
      </div>
    </div>
  );
};

export default Login;
