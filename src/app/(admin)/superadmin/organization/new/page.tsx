import { TopSection } from '@/components/common/topSection';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <TopSection
          title={'สร้างข้อมูงองค์กร'}
          buttons={[
            <button className="bg-primary" key={'1'}>
              ยืนยัน
            </button>,
          ]}
        />
      </div>
    </div>
  );
}
