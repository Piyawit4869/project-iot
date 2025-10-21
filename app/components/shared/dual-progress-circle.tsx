"@/features/customer/constants/type";
import React from "react";
import { LabelList, Legend, Pie, PieChart, Sector } from "recharts";
import { Search } from "lucide-react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";

export interface SenderStat {
  sender: string;
  messageCount: number;
}
interface Data {
  senderStats?: SenderStat[];
  aiStats?: SenderStat[];
}

export interface RelationshipCircleProps {
  chartData?: Data;
}

function generateColor(index: number): string {
  const baseColors = ["#5D4A9B", "#7664B5", "#B3A9D6", "#F0EEF7"];
  if (index < baseColors.length) return baseColors[index];

  const hue = (index * 45) % 360;
  return `hsl(${hue}, 60%, 60%)`;
}

export const DualProgressCircle: React.FC<RelationshipCircleProps> = ({
  chartData,
}) => {
  const chartConfig = {
    AI: {
      label: "Rome AI",
      color: " #332956",
    },
  } satisfies ChartConfig;

  const mockData = [
    { name: "หัวหน้าฝ่ายขาย", process: 0, fill: "#0D0D0D" },
    {
      name: "ผู้ช่วยฝ่ายขาย",
      process: 0,
      fill: "#332956",
    },

    { name: "Rome AI", process: 2, fill: " #A6A6A6" },
  ];

  const [activeKeys, setActiveKeys] = React.useState<string[]>([]);
  const [viewFocusData, setViewFocusData] = React.useState<boolean>(false);
  const [focusedName, setFocusedName] = React.useState<string>("");

  const handleLegendClick = (key: string) => {
    setActiveKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const renderActiveShape = ({ outerRadius = 0, ...props }: any) => (
    <Sector {...props} outerRadius={outerRadius + 10} fillOpacity={1} />
  );

  let chartDataData = [
    ...(chartData?.senderStats?.map((s, idx) => ({
      name: s.sender,
      process: s.messageCount,
      fill: generateColor(idx),
    })) ?? []),
    ...(chartData?.aiStats?.map((s) => ({
      name: s.sender,
      process: s.messageCount,
      fill: "#332956",
    })) ?? []),
  ];

  let salerGroup = chartDataData.filter((p) => !p.name.includes("Rome"));
  let aiGroup = chartDataData.filter((p) => p.name.includes("Rome"));

  const totalSaler = salerGroup.reduce((sum, item) => sum + item.process, 0);

  if (totalSaler < 100) {
    const remaining = 100 - totalSaler;
    if (aiGroup.length > 0) {
      aiGroup = aiGroup.map((a, idx) =>
        idx === 0 ? { ...a, process: a.process + remaining } : a
      );
    } else {
      aiGroup = [
        {
          name: "Rome AI",
          process: remaining,
          fill: "#332956",
        },
      ];
    }
  } else if (totalSaler > 100) {
    const normalizeFactor = 100 / totalSaler;
    salerGroup = salerGroup.map((s) => ({
      ...s,
      process: s.process * normalizeFactor,
    }));
  }

  chartDataData = [...salerGroup, ...aiGroup];
  const activeIndexes = chartDataData
    .map((d, idx) => {
      if (viewFocusData) {
        return d.name === focusedName ? idx : -1;
      } else {
        return activeKeys.includes(d.name) ? idx : -1;
      }
    })
    .filter((idx) => idx !== -1);

  // const totalProcess = mockData.reduce((sum, item) => sum + item.process, 0);

  const hasData =
    (chartData?.senderStats && chartData?.senderStats?.length > 0) ||
    (chartData?.aiStats && chartData?.aiStats?.length > 0);
  return (
    <div className="flex-1">
      {!hasData ? (
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[290px] w-full"
        >
          <PieChart>
            {/* <ChartTooltip cursor={false} /> */}

            <Pie
              data={mockData}
              dataKey="process"
              nameKey="name"
              innerRadius={55}
              strokeWidth={5}
              fillOpacity={0.8}
              labelLine={false}
            ></Pie>

            <Legend
              verticalAlign="bottom"
              content={() => (
                <div className="flex justify-center w-full">
                  <span className="text-base text-[#71717A]  dark:text-[#b4b4c5]">
                    ยังไม่มีการพูดคุยกับลูกค้า
                  </span>
                </div>
              )}
            />
          </PieChart>
        </ChartContainer>
      ) : (
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[350px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="process" />}
            />
            <Pie
              data={chartDataData}
              dataKey="process"
              nameKey="name"
              innerRadius={50}
              strokeWidth={5}
              fillOpacity={0.8}
              activeIndex={activeIndexes.length > 0 ? activeIndexes : undefined}
              activeShape={renderActiveShape}
              label={({ name, x, y, cx }) => (
                <text
                  x={x}
                  y={y}
                  fill="currentColor"
                  className="text-black dark:text-white"
                  fontSize={14}
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {name}
                </text>
              )}
              labelLine={false}
            >
              <LabelList
                dataKey="process"
                position="inside"
                className="fill-white"
                stroke="none"
                fontSize={13}
                formatter={(value: number) => `${value}%`}
              />
            </Pie>

            <Legend
              verticalAlign="bottom"
              content={() => {
                const renderGroup = (title: string, items: any[]) => (
                  <div className=" text-[16px]">
                    <strong>{title}</strong>
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {items.map((entry: any) => {
                        const isActiveOrFocused = viewFocusData
                          ? entry.name === focusedName
                          : activeKeys.includes(entry.name);

                        const opacity = isActiveOrFocused ? 0.5 : 1;

                        return (
                          <div
                            key={entry.name}
                            className="flex items-center gap-x-2 mt-1 cursor-pointer"
                          >
                            <span
                              style={{
                                backgroundColor: entry.fill,
                                width: 12,
                                height: 12,
                                opacity: opacity,
                              }}
                            />
                            <span
                              style={{ opacity: opacity }}
                              onClick={() => {
                                handleLegendClick(entry.name);
                                setViewFocusData(false);
                                setFocusedName("");
                              }}
                            >
                              {entry.name} : {entry.process.toFixed(1)}%
                            </span>
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setFocusedName(entry.name);
                                setViewFocusData(true);
                              }}
                            >
                              <Search size={17} />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );

                return (
                  <div className="flex flex-col gap-3">
                    {renderGroup("Saler", salerGroup)}
                    {(aiGroup ?? []).length > 0 && renderGroup("AI", aiGroup)}
                  </div>
                );
              }}
            />
          </PieChart>
        </ChartContainer>
      )}
    </div>
  );
};
