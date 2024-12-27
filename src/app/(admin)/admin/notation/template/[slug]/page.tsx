import { TemplateBuilder } from '@/components/builder/templateBuilder';
import { Card } from '@nextui-org/react';

export default function SingleTemplate() {
  return (
    <div>
      <Card>
        <TemplateBuilder />
      </Card>
    </div>
  );
}
