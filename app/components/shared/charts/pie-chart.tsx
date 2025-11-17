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

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    label: {
      text: "type",
      position: "outside",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "bottom",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};
