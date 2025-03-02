"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Network, RefreshCw } from "lucide-react"

export function NetworkSettings() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="server-address">Server manzili</Label>
        <Input id="server-address" defaultValue="192.168.1.100" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="port">Port</Label>
        <Input id="port" defaultValue="3306" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="connection-type">Ulanish turi</Label>
        <Select defaultValue="local">
          <SelectTrigger id="connection-type">
            <SelectValue placeholder="Ulanish turini tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="local">Lokal tarmoq</SelectItem>
            <SelectItem value="remote">Masofaviy ulanish</SelectItem>
            <SelectItem value="cloud">Bulutli ulanish</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="auto-sync">Avtomatik sinxronizatsiya</Label>
          <div className="text-sm text-muted-foreground">Ma'lumotlarni avtomatik sinxronizatsiya qilish</div>
        </div>
        <Switch id="auto-sync" defaultChecked />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sync-interval">Sinxronizatsiya intervali (daqiqa)</Label>
        <Input id="sync-interval" type="number" defaultValue="15" />
      </div>
      <div className="flex gap-2">
        <Button className="flex-1">
          <Network className="mr-2 h-4 w-4" />
          Ulanish
        </Button>
        <Button className="flex-1" variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Sinxronizatsiya
        </Button>
      </div>
    </div>
  )
}

