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
import { redirect, useRouter } from 'next/navigation';
import { Button, Input } from '@nextui-org/react';
import { toast } from 'sonner';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    // 'use server';
    e.preventDefault();

    setLoading(true);

    const result: any = await signIn('credentials', {
      redirect: false,
      user,
      password,
    });
    console.log({ result });

    if (result) {
      toast.success('🎉 เข้าสู่ระบบสำเร็จ!', {
        description: `ยินดีต้อนรับ, ${user}`,
        duration: 3000,
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push('/admin');
    } else {
      setError(result.error);
      setLoading(false);
      toast.error('❌ เข้าสู่ระบบล้มเหลว!', {
        description: 'อีเมล ชื่อผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง',
        duration: 3000,
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
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
                type="password"
                placeholder="กรุณากรอกรหัสผ่านของคุณ"
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
