"use client"

import { MoreHorizontal, Edit, Trash, CreditCard, FileText } from "lucide-react"

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

export function OrderTable() {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Mijoz</TableHead>
              <TableHead>O'lcham (kv.m)</TableHead>
              <TableHead>Narx</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.squareMeters} kv.m</TableCell>
                <TableCell>{order.price.toLocaleString()} so'm</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
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
                        <CreditCard className="mr-2 h-4 w-4" />
                        To'lov qilish
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

function getStatusVariant(status: string) {
  switch (status) {
    case "To'langan":
      return "default"
    case "Qisman to'langan":
      return "warning"
    case "Qarzdor":
      return "destructive"
    case "Jarayonda":
      return "secondary"
    default:
      return "outline"
  }
}

const orders = [
  {
    id: "ORD-001",
    customer: "Alisher Karimov",
    squareMeters: 20,
    price: 2000000,
    status: "To'langan",
  },
  {
    id: "ORD-002",
    customer: "Dilshod Rahimov",
    squareMeters: 18,
    price: 1800000,
    status: "Qisman to'langan",
  },
  {
    id: "ORD-003",
    customer: "Nodira Azizova",
    squareMeters: 12,
    price: 1200000,
    status: "To'langan",
  },
  {
    id: "ORD-004",
    customer: "Jahongir Umarov",
    squareMeters: 30,
    price: 3000000,
    status: "Qarzdor",
  },
  {
    id: "ORD-005",
    customer: "Gulnora Saidova",
    squareMeters: 15,
    price: 1500000,
    status: "Jarayonda",
  },
]

