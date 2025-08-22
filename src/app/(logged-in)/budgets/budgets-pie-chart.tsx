"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type TBudget } from "@/data/getBudgets";
import numeral from "numeral";
import { Label, Pie, PieChart } from "recharts";

export default function BudgetsPieChart({ budgets }: { budgets: TBudget[] }) {
  const totalSpent = budgets.reduce(
    (acc, budget) => acc + Number(budget.totalSpent),
    0,
  );
  const totalBudget = budgets.reduce(
    (acc, budget) => acc + Number(budget.maximum),
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
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[280px]"
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
                      {numeral(Math.abs(totalSpent)).format("$0,0")}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      of {numeral(Math.abs(totalBudget)).format("$0,0")} limit
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
