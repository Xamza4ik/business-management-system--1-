import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExcelSettings } from "@/components/settings/excel-settings"
import { NetworkSettings } from "@/components/settings/network-settings"
import { GeneralSettings } from "@/components/settings/general-settings"

export const metadata: Metadata = {
  title: "Sozlamalar",
  description: "Tizim sozlamalari",
}

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sozlamalar</h1>
          <p className="text-muted-foreground">Tizim sozlamalari va konfiguratsiyasi</p>
        </div>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Umumiy</TabsTrigger>
            <TabsTrigger value="excel">Excel integratsiyasi</TabsTrigger>
            <TabsTrigger value="network">Tarmoq sozlamalari</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Umumiy sozlamalar</CardTitle>
                <CardDescription>Tizimning asosiy sozlamalari</CardDescription>
              </CardHeader>
              <CardContent>
                <GeneralSettings />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="excel" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Excel integratsiyasi</CardTitle>
                <CardDescription>Ma'lumotlarni Excel formatida yuklash va saqlash</CardDescription>
              </CardHeader>
              <CardContent>
                <ExcelSettings />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="network" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tarmoq sozlamalari</CardTitle>
                <CardDescription>Ko'p kompyuterda ishlash uchun tarmoq sozlamalari</CardDescription>
              </CardHeader>
              <CardContent>
                <NetworkSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

