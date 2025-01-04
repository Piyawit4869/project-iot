'use client';

import React from 'react';
import { Config, Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import { Card, Button } from '@nextui-org/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createTemplate } from '@/pages/api/templates/create';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { updateTemplate } from '@/pages/api/templates/update';
import { deleteTemplate } from '@/pages/api/templates/delete';
import { toast } from 'sonner';

interface BuilderTemplateProps {
  isCreate: boolean;
  initialData?: any;
}

const parseHtmlToPuckData = (htmlString: string) => {
  if (!htmlString) {
    console.warn('Empty HTML string received!');
    return { content: [] };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const puckData: any[] = [];

  doc.querySelectorAll('img').forEach((img) => {
    puckData.push({
      id: uuidv4(),
      type: 'Image',
      props: {
        src: img.getAttribute('src') || '',
        style: { width: img.style.width || '300px' },
        alt: img.getAttribute('alt') || 'Image',
      },
    });
  });

  doc.querySelectorAll('h1').forEach((header) => {
    puckData.push({
      id: uuidv4(),
      type: 'HeaderBar',
      props: { children: header.textContent || '' },
    });
  });

  doc.querySelectorAll('p').forEach((paragraph) => {
    puckData.push({
      id: uuidv4(),
      type: 'Text',
      props: { children: paragraph.textContent || '' },
    });
  });

  return { content: puckData };
};

const puckConfig: Config = {
  components: {
    HeaderBar: {
      label: 'หัวข้อ',
      fields: { children: { type: 'text' } },
      render: ({ children, puck }: any) => (
        <h1 key={puck?.id} style={{ padding: '20px', fontSize: '36px' }}>
          {children}
        </h1>
      ),
    },
    Text: {
      label: 'ข้อความ',
      fields: { children: { type: 'text' } },
      render: ({ children, puck }: any) => (
        <p key={puck?.id} style={{ padding: '20px', fontSize: '18px' }}>
          {children}
        </p>
      ),
    },
    Image: {
      label: 'รูปภาพ',
      fields: { src: { type: 'text' } },
      render: ({ src, puck }: any) => (
        <img
          key={puck?.id}
          src={
            src ||
            'https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg'
          }
          style={{ width: '300px' }}
          alt="Placeholder"
        />
      ),
    },
  },
};

export const TemplateBuilder = ({
  initialData,
  isCreate,
}: BuilderTemplateProps) => {
  const [editorContent, setEditorContent] = React.useState<{ content: any[] }>({
    content: [],
  });
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    setLoading(true);
    if (isCreate) {
      setEditorContent({ content: [] });
      setTimeout(() => setLoading(false), 100);
    } else if (initialData?.templateNotation) {
      const parsedData = parseHtmlToPuckData(initialData.templateNotation);
      setEditorContent(parsedData);
      setTimeout(() => setLoading(false), 100);
    } else {
      setLoading(false);
    }
  }, [initialData, isCreate]);

  const exportToHTML = async () => {
    const generateHTML = (data: any): string => {
      const contentArray = data?.content || [];

      return contentArray
        .map((item: any) => {
          const component = puckConfig.components[item.type];
          if (!component) {
            console.warn(
              `Component type "${item.type}" not found in puckConfig.`,
            );
            return '';
          }

          const props = { ...item.props, puck: { id: item.id } };
          try {
            const reactElement = component.render(props);
            const htmlString = renderToStaticMarkup(reactElement);
            return htmlString ? `<div id="${item.id}">${htmlString}</div>` : '';
          } catch (error) {
            console.error(`Error rendering component "${item.type}":`, error);
            return '';
          }
        })
        .join('');
    };

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Exported Template</title>
    </head>
    <body>
      ${generateHTML(editorContent)}
    </body>
    </html>
    `;

    const payload = {
      templateName: 'template name2',
      templateNotation: htmlContent,
    };

    try {
      if (isCreate) {
        const { data } = await createTemplate({}, payload);

        toast.success('🎉 สร้างรูปแบบเอกสารสำเร็จ!', {
          duration: 3000,
          position: 'bottom-left',
          style: { fontFamily: 'var(--font-ibm-sans)' },
        });
        router.push(`/admin/notation/template/${data.id}`);
      } else if (!isCreate && initialData?.id) {
        const { data } = await updateTemplate({}, payload, initialData?.id);

        toast.success('📝 แก้ไขรูปแบบเอกสารสำเร็จ!', {
          duration: 3000,
          position: 'bottom-left',
          style: { fontFamily: 'var(--font-ibm-sans)' },
        });
        router.push(`/admin/notation/template/${data.id}`);
      }
    } catch (error) {
      toast.error('❌ ไม่สามารถบันทึกรูปแบบเอกสารได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
    }
  };

  const onTemplateDelete = async () => {
    try {
      await deleteTemplate(initialData?.id);

      toast.success('🗑️ ลบรูปแบบเอกสารสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/admin/notation/template`);
    } catch (error) {
      toast.error('❌ ไม่สามารถลบรูปแบบเอกสารได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
      console.error('Delete error:', error);
    }
  };

  return (
    <Card style={{ zIndex: 0 }}>
      {loading ? (
        <div className="flex items-center justify-center m-10">
          <div className="relative flex flex-col items-center space-y-4">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            {/* Loading Text */}
            <p className="text-gray-600 text-lg font-semibold animate-pulse">
              Loading, please wait...
            </p>
          </div>
        </div>
      ) : (
        <Puck
          config={puckConfig}
          data={editorContent}
          onChange={(content: any) => {
            console.log('Puck Editor Updated:', content);
            setEditorContent(content);
          }}
          overrides={{
            headerActions: () => (
              <div className="flex gap-2">
                {isCreate ? (
                  <Button
                    className="bg-blue-400 text-white"
                    onClick={exportToHTML}
                  >
                    สร้าง
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-400 text-white"
                    onClick={exportToHTML}
                  >
                    แก้ไข
                  </Button>
                )}
                {!isCreate && initialData?.id && (
                  <Button
                    className="bg-accent2 text-white"
                    onClick={onTemplateDelete}
                  >
                    ลบ
                  </Button>
                )}
              </div>
            ),
          }}
        />
      )}
    </Card>
  );
};

// Grid: {
//   label: 'Grid',
//   fields: {
//     columns: {
//       type: 'number',
//       label: 'Number of Columns',
//     },
//     gap: {
//       type: 'number', // Number input for gap size
//       label: 'Gap Size',
//     },
//   },
//   render: ({ puck: { renderDropZone }, zones }) => {
//     const columns = 3; // Default to 3 columns
//     const gap = 16; // Default to 16px gap

//     console.log({ zones });

//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: `repeat(${columns}, 1fr)`,
//           gap: `${gap}px`,
//           padding: '10px',
//           border: '1px dashed #aaa',
//           minHeight: '50px',
//         }}
//       >
//         {Array.from({ length: columns }).map((_, index) =>
//           renderDropZone({ zone: `grid-zone-${index + 1}` }),
//         )}
//       </div>
//     );
//   },
// },
// Row: {
//   label: 'Row',
//   render: ({ puck: { renderDropZone }, zones }) => {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           gap: '10px',
//           padding: '10px',
//           border: '1px dashed #aaa',
//           minHeight: '50px',
//         }}
//       >
//         {renderDropZone({ zone: zones?.children || 'children' })}
//       </div>
//     );
//   },
// },

// Column: {
//   label: 'Column',
//   render: ({ puck: { renderDropZone }, children }: any) => {
//     return (
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           // border: '1px solid #ddd',
//           padding: '10px',
//           minHeight: '50px',
//         }}
//       >
//         {renderDropZone({ zone: 'content' })}
//         {children}
//       </div>
//     );
//   },
// },
