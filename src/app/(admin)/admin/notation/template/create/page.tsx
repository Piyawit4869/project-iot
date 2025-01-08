import { TemplateBuilder } from '@/components/builder/templateBuilder';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Card, Input } from '@nextui-org/react';

export default function CreateTemplatePage() {
  return (
    <Scaffold
      backgroundColor=""
      child={
        <div>
          <TopSection
            backpath={'/admin/notation/template'}
            title="สร้างรูปแบบเอกสาร"
            buttons={[]}
          />
          <Card className="mb-4 mt-4">
            <TemplateBuilder isCreate={true} />
          </Card>
        </div>
      }
    />
  );
}
