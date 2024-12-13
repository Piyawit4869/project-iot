import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button } from '@nextui-org/react';

export default function NotationSinglePage() {
  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="แก้ไขเอกสาร"
            backpath={'/admin/notation'}
            buttons={[
              <Button className="bg-accent2 text-white" key={'create button'}>
                ยืนยัน
              </Button>,
            ]}
          />
          <p>Notation Single Page</p>
        </div>
      }
    />
  );
}
