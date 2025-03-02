"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="company-name">Kompaniya nomi</Label>
        <Input id="company-name" defaultValue="Biznes Boshqaruv" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="default-price">Standart 1 kv.m narxi (so'm)</Label>
        <Input id="default-price" type="number" defaultValue="100000" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="kpi-rate">KPI koeffitsienti (so'm/kv.m)</Label>
        <Input id="kpi-rate" type="number" defaultValue="30000" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="dark-mode">Qorong'i rejim</Label>
          <div className="text-sm text-muted-foreground">Tizimni qorong'i rejimda ishlatish</div>
        </div>
        <Switch id="dark-mode" />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="notifications">Bildirishnomalar</Label>
          <div className="text-sm text-muted-foreground">Yangi buyurtma va to'lovlar haqida bildirishnomalar</div>
        </div>
        <Switch id="notifications" defaultChecked />
      </div>
      <Button>Saqlash</Button>
    </div>
  )
}

