import type { Metadata } from "next"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OrderTable } from "@/components/orders/order-table"
import { OrderForm } from "@/components/orders/order-form"

export const metadata: Metadata = {
  title: "Buyurtmalar",
  description: "Buyurtmalar ro'yxati va ma'lumotlari",
}

export default function OrdersPage() {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Buyurtmalar</h1>
            <p className="text-muted-foreground">Buyurtmalar ro'yxati va hisob-kitob</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/orders/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Yangi buyurtma
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Buyurtmalar ro'yxati</CardTitle>
              <CardDescription>Jami 45 ta buyurtma</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderTable />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Yangi buyurtma</CardTitle>
              <CardDescription>Buyurtma ma'lumotlarini kiriting</CardDescription>
            </CardHeader>
            <CardContent>
              <OrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

