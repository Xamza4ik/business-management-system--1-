"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

export function PaymentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerId: "",
    orderId: "",
    amount: "",
    method: "naqd",
    date: new Date().toISOString().split("T")[0],
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      customerId: "",
      orderId: "",
      amount: "",
      method: "naqd",
      date: new Date().toISOString().split("T")[0],
    })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.customerId || !formData.orderId || !formData.amount) {
      toast({
        title: "Xatolik",
        description: "Barcha maydonlarni to'ldiring",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)
      // API call would go here
      console.log(formData)
      toast({
        title: "To'lov saqlandi",
        description: "To'lov muvaffaqiyatli saqlandi",
      })
      resetForm()
      router.refresh()
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "To'lovni saqlashda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customer">Mijoz</Label>
        <Select value={formData.customerId} onValueChange={(value) => handleChange("customerId", value)}>
          <SelectTrigger id="customer">
            <SelectValue placeholder="Mijozni tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Alisher Karimov</SelectItem>
            <SelectItem value="2">Dilshod Rahimov</SelectItem>
            <SelectItem value="3">Nodira Azizova</SelectItem>
            <SelectItem value="4">Jahongir Umarov</SelectItem>
            <SelectItem value="5">Gulnora Saidova</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="order">Buyurtma</Label>
        <Select value={formData.orderId} onValueChange={(value) => handleChange("orderId", value)}>
          <SelectTrigger id="order">
            <SelectValue placeholder="Buyurtmani tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ORD-001">ORD-001 (2,000,000 so'm)</SelectItem>
            <SelectItem value="ORD-002">ORD-002 (1,800,000 so'm)</SelectItem>
            <SelectItem value="ORD-003">ORD-003 (1,200,000 so'm)</SelectItem>
            <SelectItem value="ORD-004">ORD-004 (3,000,000 so'm)</SelectItem>
            <SelectItem value="ORD-005">ORD-005 (1,500,000 so'm)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">To'lov summasi (so'm)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Summani kiriting"
          value={formData.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>To'lov usuli</Label>
        <RadioGroup value={formData.method} onValueChange={(value) => handleChange("method", value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="naqd" id="naqd" />
            <Label htmlFor="naqd">Naqd</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="karta" id="karta" />
            <Label htmlFor="karta">Karta</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Sana</Label>
        <Input id="date" type="date" value={formData.date} onChange={(e) => handleChange("date", e.target.value)} />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saqlanmoqda..." : "To'lovni saqlash"}
      </Button>
    </form>
  )
}

