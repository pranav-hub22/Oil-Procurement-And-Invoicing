"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, FileText } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Order {
  orderId: number
  counterPartyId: number
  counterParty: {
    name: string
  }
  deliveryAddress: string
  placedDate: string
  status: string
  totalAmount: number
  orderRequests: {
    requestId: number
    request: {
      product: {
        name: string
      }
      quantity: number
      uom: string
    }
  }[]
}

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Using mock data instead of API call for demo
        const mockOrders: Order[] = [
          {
            orderId: 1,
            counterPartyId: 1,
            counterParty: { name: "Oil Corp Ltd" },
            deliveryAddress: "123 Industrial Ave, Houston, TX 77001",
            placedDate: "2024-01-15T10:00:00Z",
            status: "Placed",
            totalAmount: 7550.0,
            orderRequests: [
              {
                requestId: 1,
                request: {
                  product: { name: "Crude Oil" },
                  quantity: 100,
                  uom: "Barrel",
                },
              },
            ],
          },
          {
            orderId: 2,
            counterPartyId: 2,
            counterParty: { name: "Energy Solutions Inc" },
            deliveryAddress: "456 Energy Blvd, Dallas, TX 75201",
            placedDate: "2024-01-16T14:30:00Z",
            status: "Delivered",
            totalAmount: 1625.0,
            orderRequests: [
              {
                requestId: 2,
                request: {
                  product: { name: "Natural Gas" },
                  quantity: 500,
                  uom: "MMBtu",
                },
              },
            ],
          },
          {
            orderId: 3,
            counterPartyId: 3,
            counterParty: { name: "Petroleum Partners" },
            deliveryAddress: "789 Refinery Rd, Beaumont, TX 77701",
            placedDate: "2024-01-17T11:45:00Z",
            status: "Placed",
            totalAmount: 17150.0,
            orderRequests: [
              {
                requestId: 3,
                request: {
                  product: { name: "Diesel" },
                  quantity: 200,
                  uom: "Barrel",
                },
              },
            ],
          },
        ]

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        setOrders(mockOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "placed":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div>Loading orders...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Counter Party</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No orders found
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.counterParty.name}</TableCell>
              <TableCell>
                {order.orderRequests.map((or, index) => (
                  <div key={or.requestId}>
                    {or.request.product.name} ({or.request.quantity} {or.request.uom})
                    {index < order.orderRequests.length - 1 ? ", " : ""}
                  </div>
                ))}
              </TableCell>
              <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
              <TableCell>{new Date(order.placedDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Create invoice
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {order.status === "Placed" && (
                      <>
                        <DropdownMenuItem>Mark as delivered</DropdownMenuItem>
                        <DropdownMenuItem>Cancel order</DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
