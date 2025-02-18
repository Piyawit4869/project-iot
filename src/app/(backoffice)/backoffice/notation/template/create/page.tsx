import { TemplateBuilder } from '@/components/builder/templateBuilder';
import { Breadcrumb } from '@/components/common/breadcrumb';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Card } from '@nextui-org/react';

export default function CreateTemplatePage() {
  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
      <Scaffold
        backgroundColor=""
        child={
          <div>
            <TopSection
              backpath={'/backoffice/notation/template'}
              title="สร้างรูปแบบเอกสาร"
              buttons={[]}
            />
            <Card className="mb-4 mt-4">
              <TemplateBuilder isCreate={true} />
            </Card>
          </div>
        }
      />
    </div>
  );
}
