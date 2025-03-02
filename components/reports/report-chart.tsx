"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

interface ReportChartProps {
  period: "daily" | "monthly" | "yearly"
}

export function ReportChart({ period }: ReportChartProps) {
  const data = getDataByPeriod(period)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <Tooltip formatter={(value: number) => [`${value.toLocaleString()} so'm`, "Daromad"]} />
        <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

function getDataByPeriod(period: "daily" | "monthly" | "yearly") {
  switch (period) {
    case "daily":
      return [
        { name: "Dushanba", revenue: 450000 },
        { name: "Seshanba", revenue: 620000 },
        { name: "Chorshanba", revenue: 580000 },
        { name: "Payshanba", revenue: 750000 },
        { name: "Juma", revenue: 900000 },
        { name: "Shanba", revenue: 850000 },
        { name: "Yakshanba", revenue: 400000 },
      ]
    case "monthly":
      return [
        { name: "Yan", revenue: 8500000 },
        { name: "Fev", revenue: 9200000 },
        { name: "Mar", revenue: 7800000 },
        { name: "Apr", revenue: 10500000 },
        { name: "May", revenue: 9800000 },
        { name: "Iyun", revenue: 11200000 },
        { name: "Iyul", revenue: 12500000 },
        { name: "Avg", revenue: 11800000 },
        { name: "Sen", revenue: 10200000 },
        { name: "Okt", revenue: 9500000 },
        { name: "Noy", revenue: 8900000 },
        { name: "Dek", revenue: 12800000 },
      ]
    case "yearly":
      return [
        { name: "2019", revenue: 85000000 },
        { name: "2020", revenue: 92000000 },
        { name: "2021", revenue: 105000000 },
        { name: "2022", revenue: 120000000 },
        { name: "2023", revenue: 140000000 },
      ]
    default:
      return []
  }
}

