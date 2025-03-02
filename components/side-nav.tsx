"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  CreditCard,
  BarChart2,
  FileSpreadsheet,
  Settings,
  Network,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export function SideNav() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Bosh sahifa",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Mijozlar",
      href: "/customers",
      icon: Users,
    },
    {
      title: "Buyurtmalar",
      href: "/orders",
      icon: ShoppingBag,
    },
    {
      title: "To'lovlar",
      href: "/payments",
      icon: CreditCard,
    },
    {
      title: "KPI",
      href: "/kpi",
      icon: BarChart2,
    },
    {
      title: "Hisobotlar",
      href: "/reports",
      icon: FileSpreadsheet,
    },
    {
      title: "Sozlamalar",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Tarmoq",
      href: "/network",
      icon: Network,
    },
  ]

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={pathname === item.href ? "default" : "ghost"} className="w-full justify-start gap-2">
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

