"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Anvar",
    kv_metr: 120,
    maosh: 3600000,
  },
  {
    name: "Bekzod",
    kv_metr: 100,
    maosh: 3000000,
  },
  {
    name: "Davron",
    kv_metr: 150,
    maosh: 4500000,
  },
  {
    name: "Eldor",
    kv_metr: 80,
    maosh: 2400000,
  },
  {
    name: "Farrux",
    kv_metr: 110,
    maosh: 3300000,
  },
]

export function KpiChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          formatter={(value: number, name: string) => {
            if (name === "kv_metr") return [`${value} kv.m`, "Ishlab chiqarilgan"]
            return [`${value.toLocaleString()} so'm`, "Maosh"]
          }}
        />
        <Legend />
        <Bar dataKey="kv_metr" name="Ishlab chiqarilgan (kv.m)" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        <Bar dataKey="maosh" name="Maosh (so'm)" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

