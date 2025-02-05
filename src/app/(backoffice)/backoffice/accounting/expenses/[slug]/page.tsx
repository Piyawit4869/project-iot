import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { Spacer } from '@nextui-org/react';
import Link from 'next/link';
import * as Icon from '@ant-design/icons';
import { TopSection } from '@/components/common/topSection';

export default function ExpensesSinglePage() {
  const exportData = () => {
    const data = {
      name: 'Product A',
      description: 'รายได้จากขาย Product A เดือนธันวาคม',
      category: 'รายได้จากการขาย',
      amount: '฿50,000',
      status: 'สำเร็จ',
    };

    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${data.name}_details.json`);
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const timeline = [
    {
      date: '2 มกราคม 2568',
      description: 'เริ่มต้นนับเงินเดือนของเดือนมกราคม',
    },

    { date: '29 มกราคม 2568', description: 'จ่ายเงินเสร็จสิ้น' },
  ];

  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'รายจ่าย'} />
          <div className="flex space-x-4 mt-8">
            <div className="flex-1">
              <CardComponent
                className={'bg-secondary'}
                customCard
                custom={
                  <div className="text-headFont">
                    <div className="text-xl text-white">ประเภทรายจ่าย</div>
                    <div className="text-sm mt-2 text-white">งบบุคลากร</div>
                  </div>
                }
              />
            </div>
            <div className="flex-1">
              <CardComponent
                className={'bg-accent1'}
                customCard
                custom={
                  <div className="text-headFont">
                    <div className="text-xl text-white">สถานะ</div>
                    <div className="mt-1">
                      <span className="text-sm mt-2 text-white">สำเร็จ</span>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="flex-1">
              <CardComponent
                className={'bg-accent2'}
                customCard
                custom={
                  <div className="text-headFont">
                    <div className="text-xl text-white">จำนวนเงิน</div>
                    <div className="mt-1">
                      <span className="text-sm mt-2 text-white">฿50,000</span>
                    </div>
                  </div>
                }
              />
            </div>
          </div>
          <div>
            <div className="flex space-x-4 mt-8">
              <div className="flex-1">
                <CardComponent
                  customCard
                  custom={
                    <div className="text-start">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-headFont ">
                          เงินเดือน นาย{' '}
                          <Link
                            href={'/backoffice/user'}
                            className="hover:text-secondary"
                          >
                            ภูวิศ วัฒนะ{' '}
                            <Icon.EyeOutlined className="text-lg text-gray-500" />
                          </Link>
                        </h2>
                        <button
                          onClick={exportData}
                          className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg shadow hover:bg-gray-600"
                        >
                          ดาวน์โหลดข้อมูล
                        </button>
                      </div>
                      <div className="mt-6">
                        <p className="text-md text-gray-500">
                          ประเภทรายจ่าย : <span>งบบุคลากร</span>
                        </p>
                        <p className="text-md text-gray-500">
                          สถานะ :{' '}
                          <span className="font-bold text-green-500">
                            สำเร็จ
                          </span>
                        </p>
                        <p className="text-md text-gray-500">
                          จำนวนเงิน :{' '}
                          <span className="font-bold text-green-500">
                            ฿50,000
                          </span>
                        </p>
                        <p className="text-md text-gray-500">
                          รายอะเอียด :{' '}
                          <span>
                            ค่าแรงของ นายภูวิศ วัฒนะ ประจำเดือนมกราคม 2568
                          </span>
                        </p>
                      </div>
                      <Spacer y={5} />
                      <h3 className="text-xl font-bold text-headFont mb-3">
                        ประวัติและขั้นตอนการดำเนินงาน
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {timeline.map((event, index) => (
                          <li key={index} className="flex items-start mb-6">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                index === timeline.length - 1
                                  ? 'bg-green-500'
                                  : 'bg-blue-500'
                              } mr-4`}
                            ></div>
                            <div>
                              <p className="text-sm font-medium text-headFont">
                                {event.date}
                              </p>
                              <p className="text-sm text-gray-500">
                                {event.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
