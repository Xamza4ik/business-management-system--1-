"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Yan",
    total: 8500000,
  },
  {
    name: "Fev",
    total: 9200000,
  },
  {
    name: "Mar",
    total: 7800000,
  },
  {
    name: "Apr",
    total: 10500000,
  },
  {
    name: "May",
    total: 9800000,
  },
  {
    name: "Iyun",
    total: 11200000,
  },
  {
    name: "Iyul",
    total: 12500000,
  },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000000}M`}
        />
        <Tooltip
          formatter={(value: number) => [`${value.toLocaleString()} so'm`, "Daromad"]}
          labelFormatter={(label) => `${label} oyi`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

