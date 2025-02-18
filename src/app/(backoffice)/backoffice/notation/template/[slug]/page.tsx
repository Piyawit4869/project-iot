'use client';

import { TemplateBuilder } from '@/components/builder/templateBuilder';
import { Breadcrumb } from '@/components/common/breadcrumb';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import getTemplate from '@/pages/api/templates/get';
import { Card } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React from 'react';

export default function SingleTemplatePage() {
  const params = useParams<{ slug?: string }>();
  const [data, setData] = React.useState() as any;

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL params.');
      return;
    }

    const fetchData = async () => {
      const { data } = await getTemplate(params.slug as string);

      setData(data);
    };

    fetchData();
  }, [params]);

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb title={data?.templateName} />
      </div>
      <Scaffold
        backgroundColor=""
        child={
          <div>
            <TopSection
              backpath={'/backoffice/notation/template'}
              title="แก้ไขรูปแบบเอกสาร"
              buttons={[]}
            />
            <Card className="mb-4 mt-4">
              <TemplateBuilder isCreate={false} initialData={data} />
            </Card>
          </div>
        }
      />
    </div>
  );
}
