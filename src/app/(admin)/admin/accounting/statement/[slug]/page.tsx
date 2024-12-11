'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { Spacer } from '@nextui-org/react';

export default function SingleSinglePage() {
  const exportData = () => {
    const data = {
      name: 'นาย ภูวิศ วัฒนะ',
      description: 'ค่าแรงของ นายภูวิศ วัฒนะ ประจำเดือนมกราคม 2568',
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
    { date: '1 มกราคม 2568', description: 'การเริ่มคำนวณค่าแรง' },
    { date: '15 มกราคม 2568', description: 'ตรวจสอบสถานะการจ่ายเงิน' },
    { date: '20 มกราคม 2568', description: 'การจ่ายเงินสำเร็จ' },
  ];

  return (
    <Scaffold
      child={
        <div>
          <div className="flex space-x-4 mt-8">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <div>
                    ประเภท<div>รายรับ</div>
                  </div>
                }
              />
            </div>
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <div>
                    สถานะ
                    <div>
                      <span className="font-bold text-green-500">สำเร็จ</span>
                    </div>
                  </div>
                }
              />
            </div>
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <div>
                    จำนวนเงิน
                    <div>
                      <span className="font-bold text-green-500">฿50,000</span>
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
                        <h2 className="text-lg font-bold">
                          เงินเดือน นาย ภูวิศ วัฒนะ <></>
                        </h2>
                        <button
                          onClick={exportData}
                          className="mt-4 px-4 py-2 bg-primary text-white rounded shadow hover:bg-gray-600"
                        >
                          ดาวน์โหลดข้อมูล
                        </button>
                      </div>
                      <div className="mt-6">
                        <p className="text-sm text-gray-500">
                          สถานะ :{' '}
                          <span className="font-bold text-green-500">
                            สำเร็จ
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          จำนวนเงิน :{' '}
                          <span className="font-bold text-green-500">
                            ฿50,000
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">
                          ค่าแรงของ นายภูวิศ วัฒนะ ประจำเดือนมกราคม 2568
                        </p>
                      </div>
                      <Spacer y={5} />
                      <h3 className="text-md font-bold">Timeline</h3>
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
                              <p className="text-sm font-medium">
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
