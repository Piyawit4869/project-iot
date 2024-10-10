import React from 'react';
import { Calendar, theme } from 'antd';
import type { Dayjs } from 'dayjs';
import { HeaderRender, SelectInfo } from 'antd/es/calendar/generateCalendar';
import thTH from 'antd/es/locale/th_TH'; // Import Ant Design Thai locale
import dayjs from 'dayjs';
import 'dayjs/locale/th'; // Import Thai locale for dayjs
import { PickerLocale } from 'antd/es/date-picker/generatePicker';

// Set the dayjs locale to Thai
dayjs.locale('th');

interface CalendarProps {
  fullWidth?: boolean;
  headerRender?: HeaderRender<Dayjs> | undefined;
  onSelect?: ((date: Dayjs, selectInfo: SelectInfo) => void) | undefined;
  cellRender?: ((date: Dayjs, info: any) => React.ReactNode) | undefined;
  local?: PickerLocale | undefined;
  footer?: React.ReactNode;
}

export const CalendarComponent = (props: CalendarProps) => {
  const { fullWidth, headerRender, onSelect, footer, cellRender, local } =
    props;
  const { token } = theme.useToken();
  // const today = dayjs(); // Get today's date
  // const startOfMonth = today.startOf('month'); // Start of the current month
  // const endOfMonth = today.endOf('month'); // End of the current month

  // Ensure the locale structure is valid for Ant Design Calendar
  const thaiLocale = {
    lang: {
      ...thTH,
      locale: 'th',
    },
    timePickerLocale: {
      timePickerLocale: {
        placeholder: 'Select time', // Provide a placeholder for time picker
        rangePlaceholder: ['Start time', 'End time'], // Range time placeholders
      },
    },
  };

  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      {/* Apply the small-calendar class */}
      <Calendar
        fullscreen={fullWidth ? fullWidth : false}
        headerRender={headerRender}
        cellRender={cellRender}
        onSelect={onSelect}
        locale={local ? local : (thaiLocale as any)}
      />
      {footer ? footer : <></>}
    </div>
  );
};
