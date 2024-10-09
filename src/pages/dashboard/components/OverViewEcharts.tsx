
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import type {
  ChartConfig
} from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { apiFetch } from "@/lib/fetch";
import type { IActivity } from "@/types";

const DateEnum: Record<string, string> = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
}

interface IChartData {
  value: string
  month: string
  mileage: number
  climb: number
}

function computedMonthData(activities: IActivity[]) {
  const monthlyTotals: { value: string, month: string, distance: number, elevationGain: number }[] = [];
  const monthlyData: Record<string, { month: string, distance: number, total_elevation_gain: number }> = {};

  activities.forEach(activity => {
    const month = dayjs(activity.start_date).format('MM'); // 获取活动的月份
    if (!monthlyData[month]) {
      monthlyData[month] = { month, distance: 0, total_elevation_gain: 0 };
    }
    monthlyData[month].distance += activity.distance; // 累加距离
    monthlyData[month].total_elevation_gain += activity.total_elevation_gain; // 累加海拔增益
  });

  for (const month in monthlyData) {
    monthlyTotals.push({
      value: month,
      month: DateEnum[month],
      distance: Number.parseFloat(monthlyData[month].distance.toFixed(2)),
      elevationGain: Number.parseFloat(monthlyData[month].total_elevation_gain.toFixed(2))
    });
  }
  monthlyTotals.sort((a, b) => Number.parseInt(a.value) - Number.parseInt(b.value));

  return monthlyTotals
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

async function getActivity() {
  const now = dayjs();
  const activities = [];

  for (let i = 0; i < 6; i++) {
    const startOfMonth = now.subtract(i, 'month').startOf('month').unix()
    const endOfMonth = now.subtract(i, 'month').endOf('month').unix()

    const res = await apiFetch('/athlete/activities', {
      method: 'GET',
      params: {
        before: endOfMonth,
        after: startOfMonth,
        per_page: 200,
      }
    });

    activities.push(...res); // 将每次请求的数据合并到活动数组中
  }
  const data = computedMonthData(activities)
  return data
}

export function OverViewEcharts() {
  const [chartData, setChartData] = useState<IChartData[]>([])

  useEffect(() => {
    getActivity().then(data => {
      setChartData(data.map(item => ({
        value: item.value,
        month: item.month,
        mileage: Number.parseFloat((item.distance / 1000).toFixed(2)),
        climb: Number.parseFloat((item.elevationGain).toFixed(2))
      })))
    })
  }, [])
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
          formatter={(value, name) => {
            if (name === 'mileage') {
              return `mileage: ${value} km`
            } else if (name === 'climb') {
              return `climb: ${value} m`
            }
            return value
          }}
        />
        <Bar dataKey="mileage" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="climb" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
