"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface Payment {
  id: string
  customerId: string
  amount: number
  type: "payment" | "debt"
  date: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  address: string
  balance: number
  debt: number
  status: string
  payments: Payment[]
}

interface CustomerContextType {
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, "id" | "payments" | "status">) => void
  deleteCustomer: (id: string) => void
  updateCustomer: (customer: Customer) => void
  addPayment: (customerId: string, payment: Omit<Payment, "id">) => void
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
    payments: [],
  },
  {
    id: "002",
    name: "Dilshod Rahimov",
    phone: "+998 90 234 56 78",
    address: "Toshkent sh.",
    balance: 200000,
    debt: 300000,
    status: "Qarzdor",
    payments: [],
  },
]

export function CustomerProvider({ children }: { children: React.ReactNode }) {
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

  const addCustomer = (customerData: Omit<Customer, "id" | "payments" | "status">) => {
    setCustomers((prev) => [
      ...prev,
      {
        ...customerData,
        id: `00${prev.length + 1}`,
        payments: [],
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

  const addPayment = (customerId: string, payment: Omit<Payment, "id">) => {
    setCustomers((prev) =>
      prev.map((customer) => {
        if (customer.id === customerId) {
          const newPayment = {
            ...payment,
            id: `PAY-${customer.payments.length + 1}`,
          }

          let newBalance = customer.balance
          let newDebt = customer.debt

          if (payment.type === "payment") {
            newBalance += payment.amount
          } else {
            newDebt += payment.amount
          }

          return {
            ...customer,
            balance: newBalance,
            debt: newDebt,
            status: newDebt > 0 ? "Qarzdor" : "Aktiv",
            payments: [...customer.payments, newPayment],
          }
        }
        return customer
      }),
    )
  }

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, deleteCustomer, updateCustomer, addPayment }}>
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

