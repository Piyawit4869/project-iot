import React from "react";
import { Pie } from "@ant-design/plots";

export function convertStatsToChart(data: any) {
  const senderStats = data?.senderStats ?? [];
  const aiStats = data?.aiStats ?? [];

  const totalMessages = senderStats.reduce(
    (sum: number, s: any) => sum + (s.messageCount || 0),
    0
  );

  // nodata
  if (senderStats.length === 0 || totalMessages === 0) {
    return [
      {
        type: "ไม่มีข้อมูล",
        value: 0,
      },
    ];
  }

  // convert senderStats to percentage
  let chartData = senderStats.map((s: any) => ({
    type: s.sender,
    value: Math.round((s.messageCount / totalMessages) * 100),
  }));

  const sum = chartData.reduce((a: number, b: any) => a + b.value, 0);

  if (aiStats.length > 0) {
    const aiTotal = aiStats.reduce(
      (sum: number, ai: any) => sum + (ai.messageCount || 0),
      0
    );

    chartData.push({
      type: "AI",
      value: Math.round((aiTotal / totalMessages) * 100),
    });

    return chartData;
  }

  return chartData;
}

type PieChartProps = {
  initData: any;
  isEdit?: boolean;
};

export const PieChart = ({ initData, isEdit }: PieChartProps) => {
  const [data, setData] = React.useState<any>([]);

  const handleGetInitialTheme = (): boolean => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  };

  const [isDark, _] = React.useState<boolean>(handleGetInitialTheme);

  React.useEffect(() => {
    setTimeout(() => {
      setData(convertStatsToChart(initData));
    }, 1000);
  }, [initData]);

  const config = {
    data,
    height: isEdit ? 400 : 300,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    innerRadius: 0.5,
    label: {
      text: (d: any) => {
        return d.value < 10 ? `${d.value}` : `${d.value}%`;
      },
      style: {
        stroke: isDark ? "#D3D3D3" : "#000000",
      },
    },

    legend: {
      color: {
        position: "bottom",
        layout: "vertical",

        itemMarkerSize: 12,
        itemLabelFontSize: 15,
        itemLabelLineHeight: 18,
        itemLabelFontFamily: "IBMPlexSansThai",
        itemLabelFill: isDark ? "#D3D3D3" : "#000000",
      },
      size: {
        titleFontSize: 16,
        titleFontFamily: "IBMPlexSansThai",
      },
    },

    scale: {
      color: {
        range: ["#9D91CA", "#7664B5", "#5D4A9B", "#332956", "#19142A"],
      },
    },
    // tooltip: ({ type, value }: any) => {
    //   return { type, value };
    // },
    // tooltip: ({ type, value }: any) => {
    //   return { type, value };
    // },
    tooltip: false,

    // interaction: {
    //   tooltip: {
    //     render: (e: any, { items }: any) => {
    //       return (
    //         <React.Fragment>
    //           {items.map((item: any, index: number) => {
    //             const { type, value, color } = item;
    //             return (
    //               <div
    //                 key={index}
    //                 style={{
    //                   margin: 0,
    //                   display: "flex",
    //                   justifyContent: "space-between",
    //                 }}
    //               >
    //                 <div>
    //                   <span
    //                     style={{
    //                       display: "inline-block",
    //                       width: 6,
    //                       height: 6,
    //                       borderRadius: "50%",
    //                       backgroundColor: color,
    //                       marginRight: 6,
    //                     }}
    //                   ></span>
    //                   <span>{type}</span>
    //                 </div>
    //                 <b className="ml-5"> {value}</b>
    //               </div>
    //             );
    //           })}
    //         </React.Fragment>
    //       );
    //     },
    //   },
    // },
  };

  return (
    <div className="flex flex-col w-full">
      <Pie {...config} />
    </div>
  );
};
