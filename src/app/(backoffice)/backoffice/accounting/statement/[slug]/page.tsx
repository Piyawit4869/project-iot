'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Spacer } from '@nextui-org/react';

export default function StatementSinglePage() {
  const exportData = () => {
    const data = {
      name: 'Product A',
      description: 'รายได้จากการให้บริการ Product A เดือนธันวาคม',
      category: 'รายได้จากการให้บริการ',
      amount: '฿2,000',
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
    { date: '1 ธันวาคม 2567', description: 'เริ่มต้นนับรายได้ของเดือนธันวา' },
    {
      date: '15 ธันวาคม 2567',
      description: 'ตรวจสอบสถานะการจ่ายเงินของลูกค้า',
    },
    { date: '29 ธันวาคม 2567', description: 'ได้รับเงินแล้ว' },
  ];

  return (
    <Scaffold
      child={
        <div>
          <TopSection title={'รายการข้อมูลเงินเข้า-ออก'} />
          <div className="flex space-x-4 mt-8">
            <div className="flex-1">
              <CardComponent
                className={'bg-secondary'}
                customCard
                custom={
                  <div className="text-headFont text-white">
                    <div className="text-xl">เงินเข้า</div>
                    <div className="text-sm mt-2">รายได้จากการให้บริการ</div>
                  </div>
                }
              />
            </div>
            <div className="flex-1">
              <CardComponent
                className={'bg-accent1'}
                customCard
                custom={
                  <div className="text-white">
                    <div className="text-xl">สถานะ</div>
                    <div className="mt-1">
                      <span className="font-bold text-sm">สำเร็จ</span>
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
                  <div className="text-white">
                    <div className="text-xl">จำนวนเงิน</div>
                    <div className="mt-1">
                      <span className="font-bold text-sm">฿2,000</span>
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
                        <h2 className="text-2xl font-bold text-headFont">
                          รายได้จากการติดตั้ง Product A เดือนธันวาคม
                        </h2>
                        <button
                          onClick={exportData}
                          className="mt-4 px-4 py-2 bg-primary text-white rounded shadow hover:bg-gray-600"
                        >
                          ดาวน์โหลดข้อมูล
                        </button>
                      </div>
                      <div className="mt-6">
                        <p className="text-md text-gray-500">
                          ประเภท : <span>รายได้จากการให้บริการ</span>
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
                            ฿2,000
                          </span>
                        </p>
                        <p className="text-md text-gray-500">
                          รายอะเอียด :{' '}
                          <span>
                            รายได้จากการให้บริการ Product A ประจำเดือนธันวาคม
                            2567 ได้จำนวน 10 การขาย นับเป็นจำนวนเงิน 2,000
                            บาทถ้วน
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
