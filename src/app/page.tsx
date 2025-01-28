// // import { getSession } from '@/libs/lib';

// export default async function App() {
//   // const session = await getSession();

//   return (
//     <div>
//       <main>
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//           <div className="text-center">
//             <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
//               Welcome to ROME!
//             </h1>
//             <p className="text-lg text-gray-600 mb-8">
//               {`"If you haven't figured out how to build Rome in a day. let us
//               show you how with the ROME platform"`}
//             </p>

//             <a href={'/login'}>
//               <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow hover:bg-blue-700 transition duration-300 mr-5">
//                 Sign in
//               </button>
//             </a>
//             <a href={'/home'}>
//               <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow hover:bg-blue-700 transition duration-300">
//                 Bring to Homepage
//               </button>
//             </a>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

// import { signIn, signOut, useSession } from 'next-auth/react';

// export default function AuthActions() {
//   const { data: session, status } = useSession();
//   const handleLogin = async () => {
//     await signIn('credentials', {
//       user: 'owner@utotech.org', // Replace with user input
//       password: 'localpass', // Replace with user input
//       callbackUrl: '/', // Redirect after successful login
//     });
//   };
//   const handleLogout = async () => {
//     await signOut({ callbackUrl: '/login' }); // Redirect after logout
//   };
//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }
//   if (!session) {
//     return (
//       <div>
//         <p>You are not logged in.</p>
//         <button onClick={handleLogin}>Login</button>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <p>Welcome, {session.user?.name || 'User'}!</p>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'sonner';
// import Icon from '@ant-design/icons';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    // 'use server';
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result: any = await signIn('credentials', {
        redirect: false,
        user,
        password,
      });
      console.log({ result });

      if (result?.ok) {
        toast.success('🎉 เข้าสู่ระบบสำเร็จ!', {
          description: `ยินดีต้อนรับ, ${user}`,
          duration: 3000,
          style: { fontFamily: 'var(--font-ibm-sans)' },
        });

        router.push('/admin');
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
            จัดการการเข้างาน บันทึกข้อมูล และจัดการ Work flow
            ของคุณได้อย่างง่ายดาย
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

          {/* Password Input */}
          <div>
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
              <Button
                type="button"
                aria-label={showPassword ? 'แสดง' : 'ซ่อน'}
                className="text-black dark:text-white"
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
                    className="w-6 select-none  cursor-pointer h-6 absolute top-2 right-2"
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
                    className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    ></path>
                  </svg>
                )}
              </Button>
              {/* <span>
                {
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword((prev) => !prev);
                      }}
                    >
                      {showPassword ? 'ซ่อน' : 'แสดง'}
                    </button>
                  </div>
                }
              </span> */}
            </div>
          </div>

          {/* Remember Me Checkbox */}
          {/* <div className="flex items-center space-x-2 justify-between">
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
          </div> */}

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
          {/* <p className="text-sm text-gray-600">
            ยังไม่มีบัญชี?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              สมัครสมาชิก
            </a>
          </p> */}

          {/* Divider */}
          {/* <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">หรือ</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div> */}

          {/* Google Login Button */}
          {/* <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
          >
            <img
              src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0" // แก้ไขเป็นไอคอน Google ที่คุณใช้
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            เข้าสู่ระบบด้วย Google
          </button> */}
        </form>
      </div>
    </div>
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Email</label>
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label>Password</label>
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>
    //   {error && <p>{error}</p>}
    //   <button type="submit">Login</button>
    // </form>
  );
};

export default Login;
