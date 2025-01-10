import { base_url } from '@/constant/common';

interface FetchTemplatesParams {
  page?: number;
  limit?: number;
  name?: string;
  isAll?: boolean;
}

interface FetchTemplatesResponse {
  items: any[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export default async function paginationItems({
  page,
  limit,
  name,
  isAll,
}: FetchTemplatesParams): Promise<FetchTemplatesResponse> {
  try {
    const url = new URL(`${base_url}/crud/items`);

    const accessToken = localStorage.getItem('accessToken');

    if (name) {
      url.searchParams.append('name', name);
    }
    if (page) {
      url.searchParams.append('page', String(page));
    }

    if (limit) {
      url.searchParams.append('limit', String(limit));
    }

    if (isAll) {
      url.searchParams.append('isAll', String(isAll));
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from external API');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return {
      items: [],
      meta: {
        totalItems: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1,
      },
    };
  }
}

//  <div className="flex min-h-screen w-full">
//    {/* Left Section - Branding & Illustration */}
//    <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white p-12">
//      <h1 className="text-2xl font-semibold mb-3">ออกแบบเพื่อบุคคลทั่วไป</h1>
//      <p className="text-sm text-center max-w-md">
//        ดูการวิเคราะห์และขยายข้อมูลของคุณจากที่ใดก็ได้!
//      </p>

//      {/* Mockup Image */}
//      <div className="relative mt-8">
//        <img
//          src="/mockup.png" // เปลี่ยนเป็นภาพที่คุณมี
//          alt="ภาพจำลอง"
//          className="w-full max-w-lg shadow-lg rounded-lg"
//        />
//        {/* Floating avatars for effect */}
//        <div className="absolute -top-5 left-10 w-10 h-10 border-2 border-white rounded-full overflow-hidden">
//          <img src="/avatar1.png" alt="ผู้ใช้ 1" />
//        </div>
//        <div className="absolute -bottom-5 right-10 w-10 h-10 border-2 border-white rounded-full overflow-hidden">
//          <img src="/avatar2.png" alt="ผู้ใช้ 2" />
//        </div>
//      </div>
//    </div>

//    {/* Right Section - Login Form */}
//    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 lg:p-16 bg-white">
//      <h2 className="text-2xl font-bold mb-6">เข้าสู่ระบบ</h2>

//      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
//        {/* Email Input */}
//        <div>
//          <label className="text-sm font-medium">อีเมล</label>
//          <Input
//            size="lg"
//            name="username"
//            placeholder="name@mail.com"
//            variant="bordered"
//            value={user}
//            onChange={(e) => setUser(e.target.value)}
//            errorMessage="กรุณาป้อนอีเมลของคุณ"
//            className="w-full"
//            required
//          />
//        </div>

//        {/* Password Input */}
//        <div>
//          <label className="text-sm font-medium">รหัสผ่าน</label>
//          <div className="flex justify-between items-center">
//            <Input
//              size="lg"
//              name="password"
//              type="password"
//              placeholder="********"
//              variant="bordered"
//              value={password}
//              onChange={(e) => setPassword(e.target.value)}
//              className="w-full"
//              required
//              errorMessage="กรุณาป้อนรหัสผ่าน"
//            />
//            <a href="#" className="text-sm text-blue-500 hover:underline ml-2">
//              ลืมรหัสผ่าน?
//            </a>
//          </div>
//        </div>

//        {/* Remember Me Checkbox */}
//        <div className="flex items-center space-x-2">
//          <input type="checkbox" id="remember" className="form-checkbox" />
//          <label htmlFor="remember" className="text-sm">
//            จดจำรหัสผ่าน
//          </label>
//        </div>

//        {/* Login Button */}
//        <Button
//          type="submit"
//          disabled={loading}
//          className={`w-full py-3 text-lg font-semibold text-white rounded-md transition ${
//            loading
//              ? 'bg-gray-400 cursor-not-allowed'
//              : 'bg-blue-600 hover:bg-blue-700'
//          }`}
//        >
//          {loading ? (
//            <div className="flex items-center justify-center">
//              <svg
//                className="w-5 h-5 mr-2 text-white animate-spin"
//                xmlns="http://www.w3.org/2000/svg"
//                fill="none"
//                viewBox="0 0 24 24"
//              >
//                <circle
//                  className="opacity-25"
//                  cx="12"
//                  cy="12"
//                  r="10"
//                  stroke="currentColor"
//                  strokeWidth="4"
//                ></circle>
//                <path
//                  className="opacity-75"
//                  fill="currentColor"
//                  d="M4 12a8 8 0 018-8v8H4z"
//                ></path>
//              </svg>
//              กำลังโหลด...
//            </div>
//          ) : (
//            'เข้าสู่ระบบ'
//          )}
//        </Button>

//        {/* Signup Link */}
//        <p className="text-sm text-gray-600">
//          ยังไม่มีบัญชี?{' '}
//          <a href="#" className="text-blue-500 hover:underline">
//            สมัครสมาชิก
//          </a>
//        </p>

//        {/* Divider */}
//        <div className="flex items-center my-4">
//          <div className="flex-1 h-px bg-gray-300"></div>
//          <span className="px-3 text-sm text-gray-500">หรือ</span>
//          <div className="flex-1 h-px bg-gray-300"></div>
//        </div>

//        {/* Google Login Button */}
//        <button
//          type="button"
//          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100"
//        >
//          <img
//            src="/google-icon.png" // แก้ไขเป็นไอคอน Google ที่คุณใช้
//            alt="Google"
//            className="w-5 h-5 mr-2"
//          />
//          เข้าสู่ระบบด้วย Google
//        </button>
//      </form>
//    </div>
//  </div>;
