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
    
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-white shadow rounded p-4">
          <h1 style={{ fontSize: 25 }}>ภาพรวมการทำงานในองค์กรวันนี้</h1>
          <p className="m-2" style={{ fontSize: 15 }}>
            {' '}
            สวัสดีตอนเที่ยง!
          </p>
        </div>

        <div className=" grid grid-row-4 grid-flow-col gap-4" >
        
        <div className="bg-white shadow rounded p-4 m-5 ">
            <h5>ยังไม่เข้างาน</h5>
            <hr />
            <h2>0คน</h2>
          </div>

          <div className="bg-white shadow rounded p-4 m-5 ">
            <h5>ลากิจ / ลาป่วย</h5>
            <hr />
            <h2>0คน</h2>
          </div>

          <div className="bg-white shadow rounded p-4 m-5 ">
            <h5>เข้างานแล้ว</h5>
            <hr />
            <h2>0คน</h2>
          </div>

        </div>
        {/*End age Header*/}
        <Table data={organizations.items} columns={columns} />
      </div>
    </div>
  );
}

const columns = [
  { Header: 'Order', accessor: 'Order' },
  { Header: 'name', accessor: 'name' },
  { Header: 'activities', accessor: 'activities' },
  { Header: 'in-work', accessor: 'in-work' },
  { Header: 'break', accessor: 'break' },
  { Header: 'out-work', accessor: 'out-work' },
  { Header: 'summery', accessor: 'summery' },
  { Header: 'note', accessor: 'note' },
];
