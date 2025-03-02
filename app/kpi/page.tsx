import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KpiTable } from "@/components/kpi/kpi-table"
import { KpiChart } from "@/components/kpi/kpi-chart"

export const metadata: Metadata = {
  title: "KPI tizimi",
  description: "Ishchilar samaradorligi va KPI ko'rsatkichlari",
}

export default function KpiPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">KPI tizimi</h1>
          <p className="text-muted-foreground">Ishchilar samaradorligi va maosh hisoblash</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Ishchilar samaradorligi</CardTitle>
              <CardDescription>Ishchilar bo'yicha KPI ko'rsatkichlari</CardDescription>
            </CardHeader>
            <CardContent>
              <KpiChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Ishchilar reytingi</CardTitle>
              <CardDescription>Eng yuqori ko'rsatkichli ishchilar</CardDescription>
            </CardHeader>
            <CardContent>
              <KpiTable />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

