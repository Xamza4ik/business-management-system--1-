"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { FileSpreadsheet, Upload, Download } from "lucide-react"

export function ExcelSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="export-path">Excel fayllarini saqlash joyi</Label>
        <div className="flex gap-2">
          <Input id="export-path" defaultValue="C:\Biznes\Exports" />
          <Button variant="outline" size="icon">
            <FileSpreadsheet className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="auto-export">Avtomatik eksport</Label>
          <div className="text-sm text-muted-foreground">Har kuni ma'lumotlarni avtomatik eksport qilish</div>
        </div>
        <Switch id="auto-export" defaultChecked />
      </div>
      <div className="space-y-2">
        <Label>Ma'lumotlarni import/eksport qilish</Label>
        <div className="flex gap-2">
          <Button className="flex-1">
            <Upload className="mr-2 h-4 w-4" />
            Import qilish
          </Button>
          <Button className="flex-1" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Eksport qilish
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Eksport qilinadigan ma'lumotlar</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="export-customers" defaultChecked />
            <Label htmlFor="export-customers">Mijozlar</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="export-orders" defaultChecked />
            <Label htmlFor="export-orders">Buyurtmalar</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="export-payments" defaultChecked />
            <Label htmlFor="export-payments">To'lovlar</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="export-kpi" defaultChecked />
            <Label htmlFor="export-kpi">KPI ma'lumotlari</Label>
          </div>
        </div>
      </div>
      <Button>Saqlash</Button>
    </div>
  )
}

