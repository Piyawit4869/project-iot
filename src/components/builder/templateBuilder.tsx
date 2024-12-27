'use client';

import React, { useState } from 'react';
import { Config, DropZone, Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import { Card } from '@nextui-org/react';
import { Image } from '@nextui-org/image';

const initialData: any = [];

const puckConfig: Config = {
  components: {
    HeaderBar: {
      label: 'หัวข้อ',
      fields: {
        children: {
          type: 'text',
        },
      },
      render: ({ children }: any) => {
        return (
          <h1 style={{ padding: '20px', fontSize: '36px' }}>{children}</h1>
        );
      },
    },
    Image: {
      label: 'รูปภาพ',
      render: ({ children }: any) => {
        return (
          <Image
            src="https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg"
            width={300}
          />
        );
      },
    },
    Text: {
      label: 'ข้อความ',
      fields: {
        children: {
          type: 'text',
        },
      },
      render: ({ children }: any) => {
        return (
          <h1 style={{ padding: '20px', fontSize: '18px' }}>{children}</h1>
        );
      },
    },
    Row: {
      label: 'Row',
      render: ({ puck: { renderDropZone } }) => {
        return <div>{renderDropZone({ zone: 'children' })}</div>;
      },
    },
    Column: {
      label: 'Column',
      render: ({ zones }) => {
        console.log(zones);

        return (
          <div
            style={{
              flex: 1,
              border: '1px solid #ddd',
              padding: '10px',
              minHeight: '50px',
            }}
          >
            <DropZone zone={zones?.content} />
          </div>
        );
      },
    },
  },
};

export const TemplateBuilder: React.FC = () => {
  const [editorContent, setEditorContent] = useState(initialData);

  return (
    <Card style={{ zIndex: 0 }}>
      <Puck
        // viewports={[{ width: 800, height: 500, label: 'PC', icon: 'Monitor' }]}
        config={puckConfig}
        data={editorContent} // Pass valid initial data
        onChange={(content: any) => {
          if (!content || typeof content !== 'object') {
            console.error('Invalid content received:', content);
            return;
          }
          setEditorContent(content); // Update state on valid change
        }}
      />
    </Card>
  );
};
