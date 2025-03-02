import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Customer {
  id: string
  name: string
  phone: string
  address: string
  balance: number
  debt: number
  status: string
}

interface CustomerState {
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, "id" | "balance" | "debt" | "status">) => void
  deleteCustomer: (id: string) => void
  updateCustomer: (customer: Customer) => void
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      customers: [
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
      ],
      addCustomer: (customerData) =>
        set((state) => ({
          customers: [
            ...state.customers,
            {
              ...customerData,
              id: `00${state.customers.length + 1}`,
              balance: 0,
              debt: 0,
              status: "Aktiv",
            },
          ],
        })),
      deleteCustomer: (id) =>
        set((state) => ({
          customers: state.customers.filter((c) => c.id !== id),
        })),
      updateCustomer: (updatedCustomer) =>
        set((state) => ({
          customers: state.customers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)),
        })),
    }),
    {
      name: "customer-store",
    },
  ),
)

