"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RequestsTable } from "@/components/requests-table"
import { OrdersTable } from "@/components/orders-table"
import { InvoicesTable } from "@/components/invoices-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { CreateRequestDialog } from "@/components/create-request-dialog"
import { CreateOrderDialog } from "@/components/create-order-dialog"
import { CreateInvoiceDialog } from "@/components/create-invoice-dialog"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("requests")
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false)
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false)
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Oil Booking System</h1>

      <Tabs defaultValue="requests" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          {activeTab === "requests" && (
            <Button onClick={() => setIsCreateRequestOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Request
            </Button>
          )}

          {activeTab === "orders" && (
            <Button onClick={() => setIsCreateOrderOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Order
            </Button>
          )}

          {activeTab === "invoices" && (
            <Button onClick={() => setIsCreateInvoiceOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          )}
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

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products & Pricing</CardTitle>
              <CardDescription>Manage oil products and their pricing</CardDescription>
            </CardHeader>
            <CardContent>{/* Products table component */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateRequestDialog open={isCreateRequestOpen} onOpenChange={setIsCreateRequestOpen} />

      <CreateOrderDialog open={isCreateOrderOpen} onOpenChange={setIsCreateOrderOpen} />

      <CreateInvoiceDialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen} />
    </div>
  )
}
