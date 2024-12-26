import React, { useEffect, useState } from 'react';

export default function TemplateLoader() {
  const [template, setTemplate] = useState('');

  useEffect(() => {
    // Fetch the template
    fetch('src/assets/templates/quotation.html')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load template: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => setTemplate(html))
      .catch((error) => console.error('Error loading HTML template:', error));
  }, []);

  return (
    <div>
      {/* Render the loaded template */}
      <div dangerouslySetInnerHTML={{ __html: template }} />
    </div>
  );
}
