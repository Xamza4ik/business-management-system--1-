"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function NewOrderPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [totalArea, setTotalArea] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [formData, setFormData] = useState({
    customerId: "",
    width: "",
    length: "",
    pricePerMeter: "",
  })

  const calculateTotals = (width: string, length: string, price: string) => {
    const w = Number.parseFloat(width) || 0
    const l = Number.parseFloat(length) || 0
    const p = Number.parseFloat(price) || 0
    const area = w * l
    const total = area * p
    setTotalArea(area)
    setTotalPrice(total)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "width" || field === "length" || field === "pricePerMeter") {
      calculateTotals(
        field === "width" ? value : formData.width,
        field === "length" ? value : formData.length,
        field === "pricePerMeter" ? value : formData.pricePerMeter,
      )
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.customerId || !formData.width || !formData.length || !formData.pricePerMeter) {
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
      console.log({
        ...formData,
        totalArea,
        totalPrice,
      })
      toast({
        title: "Buyurtma qo'shildi",
        description: "Yangi buyurtma muvaffaqiyatli qo'shildi",
      })
      router.push("/orders")
      router.refresh()
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "Buyurtmani qo'shishda xatolik yuz berdi",
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
            <h1 className="text-2xl font-bold tracking-tight">Yangi buyurtma</h1>
            <p className="text-muted-foreground">Yangi buyurtma ma'lumotlarini kiriting</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Buyurtma ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
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
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="width">Eni (metr)</Label>
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    value={formData.width}
                    onChange={(e) => handleChange("width", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Bo'yi (metr)</Label>
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    value={formData.length}
                    onChange={(e) => handleChange("length", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price-per-meter">1 kv.m narxi (so'm)</Label>
                  <Input
                    id="price-per-meter"
                    type="number"
                    value={formData.pricePerMeter}
                    onChange={(e) => handleChange("pricePerMeter", e.target.value)}
                  />
                </div>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Umumiy maydon</Label>
                      <div className="text-2xl font-bold">{totalArea.toFixed(1)} m²</div>
                    </div>
                    <div>
                      <Label>Umumiy narx</Label>
                      <div className="text-2xl font-bold">{totalPrice.toLocaleString()} so'm</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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

