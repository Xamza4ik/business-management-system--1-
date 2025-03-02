"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function KpiTable() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ishchi</TableHead>
              <TableHead>Kv.m</TableHead>
              <TableHead>Maosh</TableHead>
              <TableHead>Reyting</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell className="font-medium">{worker.name}</TableCell>
                <TableCell>{worker.squareMeters} kv.m</TableCell>
                <TableCell>{worker.salary.toLocaleString()} so'm</TableCell>
                <TableCell>
                  <Badge variant={getRatingVariant(worker.rating)}>{worker.rating}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function getRatingVariant(rating: string) {
  switch (rating) {
    case "A+":
      return "default"
    case "A":
      return "secondary"
    case "B":
      return "outline"
    case "C":
      return "destructive"
    default:
      return "outline"
  }
}

const workers = [
  {
    id: "1",
    name: "Davron Qodirov",
    squareMeters: 150,
    salary: 4500000,
    rating: "A+",
  },
  {
    id: "2",
    name: "Anvar Toshmatov",
    squareMeters: 120,
    salary: 3600000,
    rating: "A",
  },
  {
    id: "3",
    name: "Farrux Kamolov",
    squareMeters: 110,
    salary: 3300000,
    rating: "A",
  },
  {
    id: "4",
    name: "Bekzod Alimov",
    squareMeters: 100,
    salary: 3000000,
    rating: "B",
  },
  {
    id: "5",
    name: "Eldor Rasulov",
    squareMeters: 80,
    salary: 2400000,
    rating: "C",
  },
]

