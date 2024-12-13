// `app/page.tsx` is the UI for the `/` URL
import { Table } from '@/components/common/table';
import { organizationsLoader } from '@/app/api/organization';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { TopSection } from '@/components/common/topSection';
import { div } from 'framer-motion/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
);

export default async function Page() {
  const organizations = await organizationsLoader();
  return (
    <div className="max-lg rounded shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="min-h-screen bg-white-50 p-8">
          <h1 style={{ fontSize: 25 }}>ภาพรวมการทำงานในองค์กรวันนี้</h1>
          <p className="m-2" style={{ fontSize: 15 }}>
            สวัสดีตอนเที่ยง!
          </p>

          <div className=" grid grid-row-4 grid-flow-col gap-4">
            <div className="bg-white shadow rounded p-4 mt-5 mb-5">
              <h5>ยังไม่เข้างาน</h5>
              <hr className="m-2" />
              <h2>0คน</h2>
            </div>

            <div className="bg-white shadow rounded p-4  mt-5 mb-5">
              <h5>ลากิจ / ลาป่วย</h5>
              <hr className="m-2" />
              <h2>0คน</h2>
            </div>

            <div className="bg-white shadow rounded p-4  mt-5 mb-5">
              <h5>เข้างานแล้ว</h5>
              <hr className="m-2" />
              <h2>0คน</h2>
            </div>
          </div>
          {/*End age Header*/}
          <div className=" grid grid-row-12 grid-flow-col gap-12">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Order</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Activities</th>
                  <th className="border px-4 py-2">In-work</th>
                  <th className="border px-4 py-2">Break</th>
                  <th className="border px-4 py-2">Out-work</th>
                  <th className="border px-4 py-2">Summery</th>
                  <th className="border px-4 py-2">Note</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">Nam</td>
                  <td className="border px-4 py-2">เข้างาน</td>
                  <td className="border px-4 py-2">08:30</td>
                  <td className="border px-4 py-2">13:00</td>
                  <td className="border px-4 py-2">17:00</td>
                  <td className="border px-4 py-2">8.00</td>
                  <td className="border px-4 py-2">-</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Jame</td>
                  <td className="border px-4 py-2">ไม่เข้างาน</td>
                  <td className="border px-4 py-2">08:30</td>
                  <td className="border px-4 py-2">13:00</td>
                  <td className="border px-4 py-2">17:00</td>
                  <td className="border px-4 py-2">8.00</td>
                  <td className="border px-4 py-2">-</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">3</td>
                  <td className="border px-4 py-2">Beam</td>
                  <td className="border px-4 py-2">พักเบรก</td>
                  <td className="border px-4 py-2">08:30</td>
                  <td className="border px-4 py-2">13:00</td>
                  <td className="border px-4 py-2">17:00</td>
                  <td className="border px-4 py-2">8.00</td>
                  <td className="border px-4 py-2">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
        </div>
      </div>
    </div>
  );
}
