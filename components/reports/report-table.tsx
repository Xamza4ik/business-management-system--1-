"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ReportTableProps {
  period: "daily" | "monthly" | "yearly"
}

export function ReportTable({ period }: ReportTableProps) {
  const data = getDataByPeriod(period)

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Davr</TableHead>
              <TableHead>Buyurtmalar</TableHead>
              <TableHead>Daromad</TableHead>
              <TableHead>Xarajatlar</TableHead>
              <TableHead>Foyda</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.period}>
                <TableCell className="font-medium">{item.period}</TableCell>
                <TableCell>{item.orders}</TableCell>
                <TableCell>{item.revenue.toLocaleString()} so'm</TableCell>
                <TableCell>{item.expenses.toLocaleString()} so'm</TableCell>
                <TableCell className="font-medium">{item.profit.toLocaleString()} so'm</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function getDataByPeriod(period: "daily" | "monthly" | "yearly") {
  switch (period) {
    case "daily":
      return [
        { period: "Dushanba", orders: 5, revenue: 450000, expenses: 200000, profit: 250000 },
        { period: "Seshanba", orders: 7, revenue: 620000, expenses: 280000, profit: 340000 },
        { period: "Chorshanba", orders: 6, revenue: 580000, expenses: 250000, profit: 330000 },
        { period: "Payshanba", orders: 8, revenue: 750000, expenses: 320000, profit: 430000 },
        { period: "Juma", orders: 10, revenue: 900000, expenses: 380000, profit: 520000 },
        { period: "Shanba", orders: 9, revenue: 850000, expenses: 360000, profit: 490000 },
        { period: "Yakshanba", orders: 4, revenue: 400000, expenses: 180000, profit: 220000 },
      ]
    case "monthly":
      return [
        { period: "Yanvar", orders: 85, revenue: 8500000, expenses: 3800000, profit: 4700000 },
        { period: "Fevral", orders: 92, revenue: 9200000, expenses: 4100000, profit: 5100000 },
        { period: "Mart", orders: 78, revenue: 7800000, expenses: 3500000, profit: 4300000 },
        { period: "Aprel", orders: 105, revenue: 10500000, expenses: 4700000, profit: 5800000 },
        { period: "May", orders: 98, revenue: 9800000, expenses: 4400000, profit: 5400000 },
      ]
    case "yearly":
      return [
        { period: "2019", orders: 850, revenue: 85000000, expenses: 38000000, profit: 47000000 },
        { period: "2020", orders: 920, revenue: 92000000, expenses: 41000000, profit: 51000000 },
        { period: "2021", orders: 1050, revenue: 105000000, expenses: 47000000, profit: 58000000 },
        { period: "2022", orders: 1200, revenue: 120000000, expenses: 54000000, profit: 66000000 },
        { period: "2023", orders: 1400, revenue: 140000000, expenses: 63000000, profit: 77000000 },
      ]
    default:
      return []
  }
}

