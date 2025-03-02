"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function NewCustomerPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    balance: "0",
    debt: "0",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "Xatolik",
        description: "Iltimos, barcha maydonlarni to'ldiring",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // Get existing customers from localStorage
      const existingCustomers = localStorage.getItem("customers")
      const customers = existingCustomers ? JSON.parse(existingCustomers) : []

      // Create new customer
      const newCustomer = {
        id: `00${customers.length + 1}`,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        balance: Number(formData.balance) || 0,
        debt: Number(formData.debt) || 0,
        status: Number(formData.debt) > 0 ? "Qarzdor" : "Aktiv",
      }

      // Add to customers array
      const updatedCustomers = [...customers, newCustomer]

      // Save to localStorage
      localStorage.setItem("customers", JSON.stringify(updatedCustomers))

      toast({
        title: "Muvaffaqiyatli",
        description: "Yangi mijoz qo'shildi",
      })

      router.push("/customers")
      router.refresh()
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Mijoz qo'shishda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Yangi mijoz qo'shish</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Mijoz ismi</Label>
              <Input
                id="name"
                placeholder="Ism familiya"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon raqami</Label>
              <Input
                id="phone"
                placeholder="+998 90 123 45 67"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Manzili</Label>
              <Input
                id="address"
                placeholder="Manzilni kiriting"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="balance">Boshlang'ich balans</Label>
                <Input
                  id="balance"
                  type="number"
                  placeholder="0"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="debt">Boshlang'ich qarz</Label>
                <Input
                  id="debt"
                  type="number"
                  placeholder="0"
                  value={formData.debt}
                  onChange={(e) => setFormData({ ...formData, debt: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
              <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
                Bekor qilish
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

