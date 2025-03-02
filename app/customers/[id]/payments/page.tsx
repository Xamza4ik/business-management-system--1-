"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { useCustomers } from "@/lib/context"

export default function CustomerPaymentsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { customers, addPayment } = useCustomers()
  const customer = customers.find((c) => c.id === params.id)

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    amount: "",
    type: "payment",
    date: new Date().toISOString().split("T")[0],
  })

  if (!customer) {
    router.push("/customers")
    return null
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.amount) {
      toast({
        title: "Xatolik",
        description: "Summani kiriting",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      addPayment(customer.id, {
        amount: Number(formData.amount),
        type: formData.type as "payment" | "debt",
        date: formData.date,
        customerId: customer.id,
      })
      toast({
        title: formData.type === "payment" ? "To'lov qo'shildi" : "Qarz qo'shildi",
        description: "Ma'lumotlar muvaffaqiyatli saqlandi",
      })
      setFormData({
        amount: "",
        type: "payment",
        date: new Date().toISOString().split("T")[0],
      })
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "Ma'lumotlarni saqlashda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
            <p className="text-muted-foreground">To'lovlar tarixi va yangi to'lov qo'shish</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Yangi to'lov/qarz</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>To'lov turi</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value) => handleChange("type", value)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="payment" id="payment" />
                      <Label htmlFor="payment">To'lov</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debt" id="debt" />
                      <Label htmlFor="debt">Qarz</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Summa (so'm)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Summani kiriting"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Sana</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? "Saqlanmoqda..." : "Saqlash"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                    Bekor qilish
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>To'lovlar tarixi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sana</TableHead>
                      <TableHead>Turi</TableHead>
                      <TableHead className="text-right">Summa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customer.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{format(new Date(payment.date), "dd.MM.yyyy")}</TableCell>
                        <TableCell>{payment.type === "payment" ? "To'lov" : "Qarz"}</TableCell>
                        <TableCell className="text-right">
                          <span className={payment.type === "payment" ? "text-green-600" : "text-red-600"}>
                            {payment.type === "payment" ? "+" : "-"}
                            {payment.amount.toLocaleString()} so'm
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                    {customer.payments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          To'lovlar tarixi bo'sh
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

