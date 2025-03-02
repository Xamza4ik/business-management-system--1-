import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportTable } from "@/components/reports/report-table"
import { ReportChart } from "@/components/reports/report-chart"

export const metadata: Metadata = {
  title: "Hisobotlar",
  description: "Hisobotlar va analitika",
}

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hisobotlar</h1>
          <p className="text-muted-foreground">Kunlik, oylik va yillik hisobotlar</p>
        </div>
        <Tabs defaultValue="daily" className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Kunlik</TabsTrigger>
            <TabsTrigger value="monthly">Oylik</TabsTrigger>
            <TabsTrigger value="yearly">Yillik</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Kunlik daromad</CardTitle>
                  <CardDescription>So'nggi 7 kun uchun daromad</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportChart period="daily" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Kunlik hisobot</CardTitle>
                  <CardDescription>So'nggi 7 kun uchun hisobot</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportTable period="daily" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Oylik daromad</CardTitle>
                  <CardDescription>So'nggi 12 oy uchun daromad</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportChart period="monthly" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Oylik hisobot</CardTitle>
                  <CardDescription>So'nggi 12 oy uchun hisobot</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportTable period="monthly" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="yearly" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Yillik daromad</CardTitle>
                  <CardDescription>So'nggi 5 yil uchun daromad</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportChart period="yearly" />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Yillik hisobot</CardTitle>
                  <CardDescription>So'nggi 5 yil uchun hisobot</CardDescription>
                </CardHeader>
                <CardContent>
                  <ReportTable period="yearly" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

