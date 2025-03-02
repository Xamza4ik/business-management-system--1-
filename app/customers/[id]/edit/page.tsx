"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useCustomers } from "@/lib/context"

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { customers, updateCustomer } = useCustomers()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    balance: "0",
    debt: "0",
  })

  useEffect(() => {
    const customer = customers.find((c) => c.id === params.id)
    if (customer) {
      setFormData({
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        balance: customer.balance.toString(),
        debt: customer.debt.toString(),
      })
    } else {
      router.push("/customers")
    }
  }, [customers, params.id, router])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      const customer = customers.find((c) => c.id === params.id)
      if (customer) {
        updateCustomer({
          ...customer,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          balance: Number(formData.balance) || 0,
          debt: Number(formData.debt) || 0,
          status: Number(formData.debt) > 0 ? "Qarzdor" : "Aktiv",
        })
        toast({
          title: "Mijoz yangilandi",
          description: "Mijoz ma'lumotlari muvaffaqiyatli yangilandi",
        })
        router.push("/customers")
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "Mijozni yangilashda xatolik yuz berdi",
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
            <h1 className="text-2xl font-bold tracking-tight">Mijozni tahrirlash</h1>
            <p className="text-muted-foreground">Mijoz ma'lumotlarini tahrirlash</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Mijoz ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">To'liq ism</Label>
                <Input
                  id="name"
                  placeholder="Ism familiya"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon raqam</Label>
                <Input
                  id="phone"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Manzil</Label>
                <Input
                  id="address"
                  placeholder="Manzilni kiriting"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="balance">Balans (so'm)</Label>
                  <Input
                    id="balance"
                    type="number"
                    placeholder="0"
                    value={formData.balance}
                    onChange={(e) => handleChange("balance", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="debt">Qarz (so'm)</Label>
                  <Input
                    id="debt"
                    type="number"
                    placeholder="0"
                    value={formData.debt}
                    onChange={(e) => handleChange("debt", e.target.value)}
                  />
                </div>
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
      </div>
    </div>
  )
}

