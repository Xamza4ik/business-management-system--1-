"use client"

import { useState } from "react"
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

interface Customer {
  id: string
  name: string
  phone: string
  address: string
  balance: number
  debt: number
  status: "Aktiv" | "Qarzdor"
}

interface CustomerTableProps {
  customers: Customer[]
  onDelete: (id: string) => void
  onUpdate: (customer: Customer) => void
}

export function CustomerTable({ customers, onDelete, onUpdate }: CustomerTableProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleEdit = (customer: Customer) => {
    router.push(`/customers/${customer.id}/edit`)
  }

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      toast({
        title: "Mijoz o'chirildi",
        description: "Mijoz muvaffaqiyatli o'chirildi",
      })
      setShowDeleteDialog(false)
      setDeleteId(null)
    }
  }

  const handlePayment = (customer: Customer) => {
    router.push(`/customers/${customer.id}/payments`)
  }

  const handleHistory = (customer: Customer) => {
    router.push(`/customers/${customer.id}/history`)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
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
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(customer)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePayment(customer)}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        To'lov qilish
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleHistory(customer)}>
                        <History className="mr-2 h-4 w-4" />
                        To'lov tarixi
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setDeleteId(customer.id)
                          setShowDeleteDialog(true)
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
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  Mijozlar topilmadi
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mijozni o'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              Rostdan ham bu mijozni o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

