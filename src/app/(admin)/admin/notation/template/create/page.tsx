import { TemplateBuilder } from '@/components/builder/templateBuilder';
import Scaffold from '@/components/common/scaffold';
import { Card } from '@nextui-org/react';

export default function CreateTemplatePage() {
  return (
    <Scaffold
      backgroundColor=""
      child={
        <div>
          <Card>
            <TemplateBuilder isCreate={true} />
          </Card>
        </div>
      }
    />
  );
}
