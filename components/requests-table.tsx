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
import { MoreHorizontal, Eye } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Request {
  requestId: number
  userId: number
  user: {
    name: string
  }
  productId: number
  product: {
    name: string
  }
  quantity: number
  uom: string
  price: number
  requestDate: string
  notes: string
  status: string
}

export function RequestsTable() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Using mock data instead of API call for demo
        const mockRequests: Request[] = [
          {
            requestId: 1,
            userId: 1,
            user: { name: "John Doe" },
            productId: 1,
            product: { name: "Crude Oil" },
            quantity: 100,
            uom: "Barrel",
            price: 75.5,
            requestDate: "2024-01-15T10:00:00Z",
            notes: "Urgent delivery required",
            status: "Pending",
          },
          {
            requestId: 2,
            userId: 2,
            user: { name: "Jane Smith" },
            productId: 2,
            product: { name: "Natural Gas" },
            quantity: 500,
            uom: "MMBtu",
            price: 3.25,
            requestDate: "2024-01-16T14:30:00Z",
            notes: "Standard delivery",
            status: "Approved",
          },
          {
            requestId: 3,
            userId: 1,
            user: { name: "John Doe" },
            productId: 3,
            product: { name: "Diesel" },
            quantity: 200,
            uom: "Barrel",
            price: 85.75,
            requestDate: "2024-01-17T09:15:00Z",
            notes: "Premium grade required",
            status: "Ordered",
          },
        ]

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        setRequests(mockRequests)
      } catch (error) {
        console.error("Error fetching requests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "ordered":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div>Loading requests...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.length === 0 ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              No requests found
            </TableCell>
          </TableRow>
        ) : (
          requests.map((request) => (
            <TableRow key={request.requestId}>
              <TableCell>{request.requestId}</TableCell>
              <TableCell>{request.user.name}</TableCell>
              <TableCell>{request.product.name}</TableCell>
              <TableCell>
                {request.quantity} {request.uom}
              </TableCell>
              <TableCell>{formatCurrency(request.price)}</TableCell>
              <TableCell>{formatCurrency(request.price * request.quantity)}</TableCell>
              <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(request.status)}>
                  {request.status}
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit request</DropdownMenuItem>
                    {request.status === "Pending" && (
                      <>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
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
