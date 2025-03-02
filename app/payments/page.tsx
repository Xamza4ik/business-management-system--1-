import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PaymentTable } from "@/components/payments/payment-table"
import { PaymentForm } from "@/components/payments/payment-form"

export const metadata: Metadata = {
  title: "To'lovlar",
  description: "To'lovlar ro'yxati va ma'lumotlari",
}

export default function PaymentsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">To'lovlar</h1>
          <p className="text-muted-foreground">To'lovlar ro'yxati va yangi to'lov qo'shish</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>To'lovlar ro'yxati</CardTitle>
              <CardDescription>Barcha to'lovlar tarixi</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentTable />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Yangi to'lov</CardTitle>
              <CardDescription>To'lov ma'lumotlarini kiriting</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

