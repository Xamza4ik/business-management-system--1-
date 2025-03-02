import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentOrders() {
  return (
    <div className="space-y-8">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src={order.customerAvatar} alt="Avatar" />
            <AvatarFallback>{order.customer.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer}</p>
            <p className="text-sm text-muted-foreground">
              {order.width}x{order.height} = {order.squareMeters} kv.m
            </p>
          </div>
          <div className="ml-auto font-medium">{order.amount.toLocaleString()} so'm</div>
          <Badge variant={order.status === "To'langan" ? "default" : "outline"} className="ml-2">
            {order.status}
          </Badge>
        </div>
      ))}
    </div>
  )
}

const recentOrders = [
  {
    id: "1",
    customer: "Alisher Karimov",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    width: 5,
    height: 4,
    squareMeters: 20,
    amount: 2000000,
    status: "To'langan",
  },
  {
    id: "2",
    customer: "Dilshod Rahimov",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    width: 3,
    height: 6,
    squareMeters: 18,
    amount: 1800000,
    status: "Qisman to'langan",
  },
  {
    id: "3",
    customer: "Nodira Azizova",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    width: 4,
    height: 3,
    squareMeters: 12,
    amount: 1200000,
    status: "To'langan",
  },
  {
    id: "4",
    customer: "Jahongir Umarov",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    width: 6,
    height: 5,
    squareMeters: 30,
    amount: 3000000,
    status: "Qarzdor",
  },
]

