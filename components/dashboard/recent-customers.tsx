import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentCustomers() {
  return (
    <div className="space-y-8">
      {recentCustomers.map((customer) => (
        <div key={customer.id} className="flex items-center">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={customer.avatar} alt="Avatar" />
            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{customer.name}</p>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
          </div>
          <div className="ml-auto font-medium">{customer.balance.toLocaleString()} so'm</div>
        </div>
      ))}
    </div>
  )
}

const recentCustomers = [
  {
    id: "1",
    name: "Gulnora Saidova",
    email: "gulnora@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    balance: 500000,
  },
  {
    id: "2",
    name: "Rustam Qodirov",
    email: "rustam@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    balance: -150000,
  },
  {
    id: "3",
    name: "Malika Tursunova",
    email: "malika@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    balance: 1200000,
  },
  {
    id: "4",
    name: "Botir Kamolov",
    email: "botir@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    balance: 0,
  },
]

