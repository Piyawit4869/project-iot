import React from "react";
import { Pie } from "@ant-design/plots";

export function convertStatsToChart(data: any) {
  const senderStats = data.senderStats || [];
  const aiStats = data.aiStats || [];

  const totalMessages = senderStats.reduce(
    (sum: any, s: any) => sum + s.messageCount,
    0
  );

  // convert senderStats to percentage
  let chartData = senderStats.map((s: any) => {
    return {
      type: s.sender,
      value: Math.round((s.messageCount / totalMessages) * 100),
    };
  });

  // calculate sum
  const sum = chartData.reduce((a: any, b: any) => a + b.value, 0);

  // if aiStats has value → use that instead of auto-filling
  if (aiStats.length > 0) {
    aiStats.forEach((ai: any) => {
      chartData.push({
        type: ai.sender || "AI",
        value: ai.messageCount, // assume already percentage or count
      });
    });
    return chartData;
  }

  // If aiStats is empty and sum < 100 → fill AI to complete 100%
  if (sum < 100) {
    chartData.push({
      type: "AI",
      value: 100 - sum,
    });
  }

  return chartData;
}

export const PieChart = ({ initData }: any) => {
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    setTimeout(() => {
      setData(convertStatsToChart(initData));
    }, 1000);
  }, [initData]);

  // const config = {
  //   data,
  //   angleField: "value",
  //   colorField: "type",
  //   label: {
  //     text: "type",
  //     position: "outside",
  //     style: {
  //       fontWeight: "bold",
  //     },
  //   },
  //   legend: {
  //     color: {
  //       title: false,
  //       position: "bottom",
  //       rowPadding: 5,
  //     },
  //   },
  // };
  // return <Pie {...config} />;

  const config = {
    data,
    height: 330,

    angleField: "value",
    colorField: "label",
    innerRadius: 0.6,
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        itemLabelMaxWidth: 9999,
        itemLabelFill: "#000000",
        itemLabelFontSize: 15,
        position: "top",

        itemLabelFontFamily: "IBMPlexSansThai",
        layout: "vertical",
      },
      size: {
        titleFontSize: 16,
        titleFontFamily: "IBMPlexSansThai",
      },
    },

    scale: {
      color: {
        range: [
          "#F0EEF7",
          "#B3A9D6",
          "#7664B5",
          "#5D4A9B",
          "#332956",
          "#19142A",
        ],
      },
    },
  };
  return (
    <div className="flex flex-col w-full">
      <Pie {...config} />
      {/* <div className="mt-6 space-y-5">
       
        <div>
          <h3 className="font-semibold text-lg mb-2">Seller</h3>
          <div className="grid grid-cols-2 gap-y-2">
            {data.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-sm">
                  {s.label}: {s.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

       
        <div>
          <h3 className="font-semibold text-lg mb-2">AI</h3>
          <div className="grid grid-cols-2 gap-y-2">
            {data.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-sm"> 
                  {s.label}: {s.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};
