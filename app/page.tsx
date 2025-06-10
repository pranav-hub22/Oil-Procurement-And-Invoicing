"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestsTable } from "@/components/requests-table"
import { OrdersTable } from "@/components/orders-table"
import { InvoicesTable } from "@/components/invoices-table"
import { UsersTable } from "@/components/users-table"
import { ProductsTable } from "@/components/products-table"
import { CounterPartiesTable } from "@/components/counter-parties-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { CreateRequestDialog } from "@/components/create-request-dialog"
import { CreateOrderDialog } from "@/components/create-order-dialog"
import { CreateInvoiceDialog } from "@/components/create-invoice-dialog"
import { CreateUserDialog } from "@/components/create-user-dialog"
import { CreateProductDialog } from "@/components/create-product-dialog"
import { CreateCounterPartyDialog } from "@/components/create-counter-party-dialog"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("requests")
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false)
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false)
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false)
  const [isCreateCounterPartyOpen, setIsCreateCounterPartyOpen] = useState(false)

  const getCreateButton = () => {
    switch (activeTab) {
      case "requests":
        return (
          <Button onClick={() => setIsCreateRequestOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Request
          </Button>
        )
      case "orders":
        return (
          <Button onClick={() => setIsCreateOrderOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Order
          </Button>
        )
      case "invoices":
        return (
          <Button onClick={() => setIsCreateInvoiceOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        )
      case "users":
        return (
          <Button onClick={() => setIsCreateUserOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New User
          </Button>
        )
      case "products":
        return (
          <Button onClick={() => setIsCreateProductOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Product
          </Button>
        )
      case "counterparties":
        return (
          <Button onClick={() => setIsCreateCounterPartyOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Counter Party
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Oil Booking System</h1>

      <Tabs defaultValue="requests" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="counterparties">Counter Parties</TabsTrigger>
          </TabsList>

          {getCreateButton()}
        </div>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Requests</CardTitle>
              <CardDescription>Manage oil product requests from users</CardDescription>
            </CardHeader>
            <CardContent>
              <RequestsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Manage orders created from requests</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage invoices generated from orders</CardDescription>
            </CardHeader>
            <CardContent>
              <InvoicesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage system users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage oil products and their specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <ProductsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="counterparties">
          <Card>
            <CardHeader>
              <CardTitle>Counter Parties</CardTitle>
              <CardDescription>Manage business partners and suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <CounterPartiesTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* All Create Dialogs */}
      <CreateRequestDialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen} />
      <CreateOrderDialog open={isCreateOrderOpen} onOpenChange={setIsCreateOrderOpen} />
      <CreateInvoiceDialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen} />
      <CreateUserDialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen} />
      <CreateProductDialog open={isCreateProductOpen} onOpenChange={setIsCreateProductOpen} />
      <CreateCounterPartyDialog open={isCreateCounterPartyOpen} onOpenChange={setIsCreateCounterPartyOpen} />
    </div>
  )
}
