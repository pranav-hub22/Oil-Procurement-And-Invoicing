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
import { MoreHorizontal, Eye, Printer, Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface Invoice {
  invoiceId: number
  invoiceDate: string
  totalAmount: number
  status: string
  invoiceOrders: {
    orderId: number
    order: {
      counterParty: {
        name: string
      }
    }
  }[]
}

export function InvoicesTable() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        // Using mock data instead of API call for demo
        const mockInvoices: Invoice[] = [
          {
            invoiceId: 1,
            invoiceDate: "2024-01-18T10:00:00Z",
            totalAmount: 7550.0,
            status: "Draft",
            invoiceOrders: [
              {
                orderId: 1,
                order: {
                  counterParty: { name: "Oil Corp Ltd" },
                },
              },
            ],
          },
          {
            invoiceId: 2,
            invoiceDate: "2024-01-19T15:30:00Z",
            totalAmount: 1625.0,
            status: "Issued",
            invoiceOrders: [
              {
                orderId: 2,
                order: {
                  counterParty: { name: "Energy Solutions Inc" },
                },
              },
            ],
          },
          {
            invoiceId: 3,
            invoiceDate: "2024-01-20T09:15:00Z",
            totalAmount: 18775.0,
            status: "Paid",
            invoiceOrders: [
              {
                orderId: 1,
                order: {
                  counterParty: { name: "Oil Corp Ltd" },
                },
              },
              {
                orderId: 3,
                order: {
                  counterParty: { name: "Petroleum Partners" },
                },
              },
            ],
          },
        ]

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        setInvoices(mockInvoices)
      } catch (error) {
        console.error("Error fetching invoices:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "issued":
        return "bg-blue-100 text-blue-800"
      case "paid":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return <div>Loading invoices...</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice #</TableHead>
          <TableHead>Counter Party</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No invoices found
            </TableCell>
          </TableRow>
        ) : (
          invoices.map((invoice) => (
            <TableRow key={invoice.invoiceId}>
              <TableCell>INV-{invoice.invoiceId.toString().padStart(5, "0")}</TableCell>
              <TableCell>
                {invoice.invoiceOrders.length > 0 ? invoice.invoiceOrders[0].order.counterParty.name : "N/A"}
              </TableCell>
              <TableCell>{formatCurrency(invoice.totalAmount)}</TableCell>
              <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(invoice.status)}>
                  {invoice.status}
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
                      <Printer className="mr-2 h-4 w-4" />
                      Print invoice
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {invoice.status === "Draft" && <DropdownMenuItem>Issue invoice</DropdownMenuItem>}
                    {invoice.status === "Issued" && <DropdownMenuItem>Mark as paid</DropdownMenuItem>}
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
