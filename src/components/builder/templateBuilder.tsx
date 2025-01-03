'use client';

import React from 'react';
import { Config, DropZone, Puck } from '@measured/puck';
import '@measured/puck/puck.css';
import { Card, Button } from '@nextui-org/react';
import { renderToStaticMarkup } from 'react-dom/server';

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
    Text: {
      label: 'ข้อความ',
      fields: {
        children: {
          type: 'text',
        },
      },
      render: ({ children }: any) => {
        return <p style={{ padding: '20px', fontSize: '18px' }}>{children}</p>;
      },
    },
    Image: {
      label: 'รูปภาพ',
      render: () => {
        return (
          <img
            src="https://static.vecteezy.com/system/resources/previews/016/916/479/original/placeholder-icon-design-free-vector.jpg"
            style={{ width: '300px' }}
            alt="Placeholder"
          />
        );
      },
    },

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
  },
};

export const TemplateBuilder: React.FC = () => {
  const [editorContent, setEditorContent] = React.useState(initialData);

  const exportToHTML = () => {
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

          const props = item.props || {};
          try {
            const reactElement = component.render(props);
            const htmlString = renderToStaticMarkup(reactElement);
            return htmlString ? `<div>${htmlString}</div>` : '';
          } catch (error) {
            console.error(`Error rendering component "${item.type}":`, error);
            return '';
          }
        })
        .join('');
    };
    console.log(generateHTML(editorContent));

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

    console.log({ htmlContent });

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'template.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Card style={{ zIndex: 0 }}>
      <Puck
        config={puckConfig}
        data={editorContent}
        onChange={(content: any) => setEditorContent(content)}
      />
      <Button onClick={exportToHTML} style={{ marginTop: '20px' }}>
        Export to HTML
      </Button>
    </Card>
  );
};
