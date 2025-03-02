"use client"

import { MoreHorizontal, Edit, Trash, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function PaymentTable() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Mijoz</TableHead>
              <TableHead>Buyurtma</TableHead>
              <TableHead>Summa</TableHead>
              <TableHead>Usul</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>{payment.order}</TableCell>
                <TableCell>{payment.amount.toLocaleString()} so'm</TableCell>
                <TableCell>
                  <Badge variant={payment.method === "Naqd" ? "default" : "secondary"}>{payment.method}</Badge>
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menyu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Amallar</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Chek chiqarish
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        O'chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm">
          Oldingi
        </Button>
        <Button variant="outline" size="sm">
          Keyingi
        </Button>
      </div>
    </div>
  )
}

const payments = [
  {
    id: "PAY-001",
    customer: "Alisher Karimov",
    order: "ORD-001",
    amount: 2000000,
    method: "Naqd",
    date: "2023-07-15",
  },
  {
    id: "PAY-002",
    customer: "Dilshod Rahimov",
    order: "ORD-002",
    amount: 1000000,
    method: "Karta",
    date: "2023-07-16",
  },
  {
    id: "PAY-003",
    customer: "Nodira Azizova",
    order: "ORD-003",
    amount: 1200000,
    method: "Naqd",
    date: "2023-07-18",
  },
  {
    id: "PAY-004",
    customer: "Jahongir Umarov",
    order: "ORD-004",
    amount: 1500000,
    method: "Karta",
    date: "2023-07-20",
  },
  {
    id: "PAY-005",
    customer: "Gulnora Saidova",
    order: "ORD-005",
    amount: 800000,
    method: "Naqd",
    date: "2023-07-22",
  },
]

