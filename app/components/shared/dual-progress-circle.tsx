"@/features/customer/constants/type";
import React from "react";
import { LabelList, Legend, Pie, PieChart, Sector } from "recharts";
import { Search } from "lucide-react";
import type { RelationshipCircleProps } from "~/schemas/customer/customer";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";

export const DualProgressCircle: React.FC<RelationshipCircleProps> = ({
  chartData,
}) => {
  const chartConfig = {
    mainResponsible: {
      label: "ผู้รับผิดชอบหลัก",
      color: "#0D0D0D",
    },
    subResponsible1: {
      label: "ผู้รับผิดชอบรอง 1",
      color: "#D9D9D9",
    },
    subResponsible2: {
      label: "ผู้รับผิดชอบรอง 2",
      color: "#737373",
    },
    subResponsible3: {
      label: "ผู้รับผิดชอบรอง 3",
      color: "#F2F2F2",
    },
    AI: {
      label: "Rome AI",
      color: " #3b82f6",
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
  // const total = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.process, 0);
  // }, []);

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

  const activeIndexes = mockData
    .map((d, idx) => {
      if (viewFocusData) {
        return d.name === focusedName ? idx : -1;
      } else {
        return activeKeys.includes(d.name) ? idx : -1;
      }
    })
    .filter((idx) => idx !== -1);

  // const totalProcess = mockData.reduce((sum, item) => sum + item.process, 0);

  return (
    <div className="flex-1">
      {!chartData || chartData.length === 0 ? (
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
          className="aspect-square max-h-[360px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent nameKey="process" />}
            />
            <Pie
              data={chartData}
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
                  fill="#000"
                  fontSize={12}
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
                const salerGroup = mockData.filter(
                  (p) => !p.name.includes("Rome")
                );
                const aiGroup = mockData.filter((p) => p.name.includes("Rome"));

                const renderGroup = (title: string, items: any[]) => (
                  <div className="mt-3 text-[16px]">
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
                              style={{
                                opacity: opacity,
                                /* fontWeight: isActiveOrFocused ? "bold" : 200, */
                              }}
                              onClick={() => {
                                handleLegendClick(entry.name);
                                setViewFocusData(false);
                                setFocusedName("");
                              }}
                            >
                              {entry.name}: {entry.process}%
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
                  <div className="flex flex-col">
                    {renderGroup("Saler", salerGroup)}
                    {renderGroup("AI", aiGroup)}
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
