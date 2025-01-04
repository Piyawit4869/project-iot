'use client';

import { TemplateBuilder } from '@/components/builder/templateBuilder';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import getTemplate from '@/pages/api/templates/get';
import { Card } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import React from 'react';

export default function SingleTemplatePage() {
  const params = useParams<{ slug?: string }>();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState() as any;

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL params.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      const { data } = await getTemplate(params.slug as string);

      setData(data);
      setLoading(false);
    };

    fetchData();
  }, [params]);

  return (
    <Scaffold
      backgroundColor=""
      child={
        <div>
          <TopSection
            backpath={'/admin/notation/template'}
            title="แก้ไขรูปแบบเอกสาร"
            buttons={[]}
          />
          <Card className="mb-4 mt-4">
            <TemplateBuilder isCreate={false} initialData={data} />
          </Card>
        </div>
      }
    />
  );
}
