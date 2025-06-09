"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

interface CreateInvoiceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateInvoiceDialog({ open, onOpenChange }: CreateInvoiceDialogProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedOrders, setSelectedOrders] = useState<number[]>([])
  const [customAmount, setCustomAmount] = useState<string>("")
  const [useCustomAmount, setUseCustomAmount] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an actual API call
        // Fetch orders that haven't been invoiced yet
        setOrders([
          {
            orderId: 1,
            counterPartyId: 1,
            counterParty: { name: "Oil Corp Ltd" },
            deliveryAddress: "123 Industrial Ave, Houston, TX",
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
            deliveryAddress: "456 Energy Blvd, Dallas, TX",
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
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleOrderToggle = (orderId: number) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const calculateTotal = () => {
    return orders.filter((o) => selectedOrders.includes(o.orderId)).reduce((total, o) => total + o.totalAmount, 0)
  }

  const getFinalAmount = () => {
    return useCustomAmount && customAmount ? Number.parseFloat(customAmount) : calculateTotal()
  }

  const handleSubmit = async () => {
    try {
      // In a real app, this would be an actual API call
      const invoiceData = {
        orderIds: selectedOrders,
        totalAmount: useCustomAmount ? Number.parseFloat(customAmount) : null,
      }

      console.log("Creating invoice:", invoiceData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      alert("Invoice created successfully!")

      // Reset form
      setSelectedOrders([])
      setCustomAmount("")
      setUseCustomAmount(false)

      // Close dialog
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating invoice:", error)
      alert("Error creating invoice. Please try again.")
    }
  }

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div>Loading...</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>Select orders to include in the invoice</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Select Orders</Label>
            <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
              {orders.length === 0 ? (
                <p className="text-muted-foreground">No orders available for invoicing</p>
              ) : (
                orders.map((order) => (
                  <div key={order.orderId} className="flex items-center space-x-2 py-2">
                    <Checkbox
                      id={`order-${order.orderId}`}
                      checked={selectedOrders.includes(order.orderId)}
                      onCheckedChange={() => handleOrderToggle(order.orderId)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">
                        Order #{order.orderId} - {order.counterParty.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.orderRequests.map((or, index) => (
                          <span key={or.requestId}>
                            {or.request.product.name} ({or.request.quantity} {or.request.uom})
                            {index < order.orderRequests.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm font-medium">Amount: {formatCurrency(order.totalAmount)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedOrders.length > 0 && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <div className="font-medium">Invoice Summary</div>
                <div className="text-sm text-muted-foreground">{selectedOrders.length} order(s) selected</div>
                <div className="text-lg font-bold">Calculated Total: {formatCurrency(calculateTotal())}</div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="custom-amount" checked={useCustomAmount} onCheckedChange={setUseCustomAmount} />
                <Label htmlFor="custom-amount">Use custom amount</Label>
              </div>

              {useCustomAmount && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Invoice Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="col-span-3"
                    placeholder="Enter custom amount"
                  />
                </div>
              )}

              <div className="bg-primary/10 p-4 rounded-md">
                <div className="font-bold text-lg">Final Invoice Amount: {formatCurrency(getFinalAmount())}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={selectedOrders.length === 0 || (useCustomAmount && !customAmount)}>
            Create Invoice
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
