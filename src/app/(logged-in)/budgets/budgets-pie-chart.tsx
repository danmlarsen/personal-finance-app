"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { type TBudget } from "@/data/getBudgets";
import numeral from "numeral";
import { Label, Pie, PieChart } from "recharts";

export default function BudgetsPieChart({ budgets }: { budgets: TBudget[] }) {
  const totalSpent = budgets.reduce(
    (acc, budget) => acc + Math.abs(Number(budget.totalSpent)),
    0,
  );
  const totalBudget = budgets.reduce(
    (acc, budget) => acc + Math.abs(Number(budget.maximum)),
    0,
  );

  const chartData = budgets.map((budget) => ({
    name: budget.name
      .toLowerCase()
      .split(" ")
      .map((v, i) => (i > 0 ? v.at(0)?.toUpperCase() + v.slice(1) : v))
      .join(""),
    label: budget.name,
    spent: Math.abs(Number(budget.totalSpent)),
    fill: budget.theme,
  }));

  const chartConfig = chartData.reduce(
    (acc, { name, label }) => {
      acc[name] = {
        label,
      };
      return acc;
    },
    {} as Record<string, { label: string }>,
  ) satisfies ChartConfig;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-45 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25" />
      <ChartContainer
        config={chartConfig}
        className="absolute top-1/2 left-1/2 mx-auto aspect-square w-[300px] -translate-x-1/2 -translate-y-1/2"
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="spent"
            nameKey="name"
            innerRadius={70}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <>
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {numeral(totalSpent).format("$0,0")}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          of {numeral(totalBudget).format("$0,0")} limit
                        </tspan>
                      </text>
                    </>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}
