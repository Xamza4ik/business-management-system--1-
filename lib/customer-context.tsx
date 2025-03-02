"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface Customer {
  id: string
  name: string
  phone: string
  address: string
  balance: number
  debt: number
  status: "Aktiv" | "Qarzdor"
}

interface CustomerContextType {
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, "id" | "status">) => void
  deleteCustomer: (id: string) => void
  updateCustomer: (customer: Customer) => void
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

const initialCustomers: Customer[] = [
  {
    id: "001",
    name: "Alisher Karimov",
    phone: "+998 90 123 45 67",
    address: "Toshkent sh.",
    balance: 500000,
    debt: 0,
    status: "Aktiv",
  },
  {
    id: "002",
    name: "Dilshod Rahimov",
    phone: "+998 90 234 56 78",
    address: "Toshkent sh.",
    balance: 200000,
    debt: 300000,
    status: "Qarzdor",
  },
]

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("customers")
      return saved ? JSON.parse(saved) : initialCustomers
    }
    return initialCustomers
  })

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers))
  }, [customers])

  const addCustomer = (customerData: Omit<Customer, "id" | "status">) => {
    setCustomers((prev) => [
      ...prev,
      {
        ...customerData,
        id: `00${prev.length + 1}`,
        status: customerData.debt > 0 ? "Qarzdor" : "Aktiv",
      },
    ])
  }

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id))
  }

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers((prev) => prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)))
  }

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, deleteCustomer, updateCustomer }}>
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomers() {
  const context = useContext(CustomerContext)
  if (context === undefined) {
    throw new Error("useCustomers must be used within a CustomerProvider")
  }
  return context
}

