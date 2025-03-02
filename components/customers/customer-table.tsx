"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MoreHorizontal, Edit, Trash, CreditCard, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useCustomers, type Customer } from "@/lib/context"

interface CustomerTableProps {
  searchQuery: string
}

export function CustomerTable({ searchQuery }: CustomerTableProps) {
  const router = useRouter()
  const { customers, deleteCustomer } = useCustomers()
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers)
  const [deleteCustomerId, setDeleteCustomerId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || customer.phone.includes(searchQuery),
    )
    setFilteredCustomers(filtered)
  }, [searchQuery, customers])

  const handleEdit = (id: string) => {
    router.push(`/customers/edit/${id}`)
  }

  const handleDelete = async (id: string) => {
    try {
      deleteCustomer(id)
      toast({
        title: "Mijoz o'chirildi",
        description: "Mijoz muvaffaqiyatli o'chirildi",
      })
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "Mijozni o'chirishda xatolik yuz berdi",
        variant: "destructive",
      })
    }
    setIsDeleteDialogOpen(false)
  }

  const handlePayment = (id: string) => {
    router.push(`/payments/new?customerId=${id}`)
  }

  const handlePaymentHistory = (id: string) => {
    router.push(`/payments/history/${id}`)
  }

  return (
    <>
      <div className="w-full">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Ism</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Balans</TableHead>
                <TableHead>Qarz</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.balance.toLocaleString()} so'm</TableCell>
                  <TableCell>{customer.debt.toLocaleString()} so'm</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "Aktiv" ? "default" : "destructive"}>{customer.status}</Badge>
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
                        <DropdownMenuItem onClick={() => handleEdit(customer.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Tahrirlash
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePayment(customer.id)}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          To'lov qilish
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePaymentHistory(customer.id)}>
                          <History className="mr-2 h-4 w-4" />
                          To'lov tarixi
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setDeleteCustomerId(customer.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
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
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mijozni o'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              Rostdan ham bu mijozni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteCustomerId && handleDelete(deleteCustomerId)}
            >
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

