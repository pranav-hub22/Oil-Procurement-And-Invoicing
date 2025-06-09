"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
  status: string
}

interface CounterParty {
  counterPartyId: number
  name: string
  contactInfo: string
}

interface CreateOrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateOrderDialog({ open, onOpenChange }: CreateOrderDialogProps) {
  const [requests, setRequests] = useState<Request[]>([])
  const [counterParties, setCounterParties] = useState<CounterParty[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedCounterParty, setSelectedCounterParty] = useState<string>("")
  const [selectedRequests, setSelectedRequests] = useState<number[]>([])
  const [deliveryAddress, setDeliveryAddress] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        // Fetch approved requests that haven't been ordered yet
        setRequests([
          {
            requestId: 1,
            userId: 1,
            user: { name: "John Doe" },
            productId: 1,
            product: { name: "Crude Oil" },
            quantity: 100,
            uom: "Barrel",
            price: 75.5,
            status: "Approved",
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
            status: "Approved",
          },
        ])

        setCounterParties([
          { counterPartyId: 1, name: "Oil Corp Ltd", contactInfo: "contact@oilcorp.com" },
          { counterPartyId: 2, name: "Energy Solutions Inc", contactInfo: "info@energysolutions.com" },
          { counterPartyId: 3, name: "Petroleum Partners", contactInfo: "sales@petropartners.com" },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleRequestToggle = (requestId: number) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId) ? prev.filter((id) => id !== requestId) : [...prev, requestId],
    )
  }

  const calculateTotal = () => {
    return requests
      .filter((r) => selectedRequests.includes(r.requestId))
      .reduce((total, r) => total + r.price * r.quantity, 0)
  }

  const handleSubmit = async () => {
    try {
      // In a real app, this would be an actual API call
      const orderData = {
        counterPartyId: Number.parseInt(selectedCounterParty),
        deliveryAddress,
        requestIds: selectedRequests,
      }

      console.log("Creating order:", orderData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      alert("Order created successfully!")

      // Reset form
      setSelectedCounterParty("")
      setSelectedRequests([])
      setDeliveryAddress("")

      // Close dialog
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating order:", error)
      alert("Error creating order. Please try again.")
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
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>Select approved requests and counter party to create an order</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="counterparty" className="text-right">
              Counter Party
            </Label>
            <Select value={selectedCounterParty} onValueChange={setSelectedCounterParty}>
              <SelectTrigger id="counterparty" className="col-span-3">
                <SelectValue placeholder="Select counter party" />
              </SelectTrigger>
              <SelectContent>
                {counterParties.map((cp) => (
                  <SelectItem key={cp.counterPartyId} value={cp.counterPartyId.toString()}>
                    {cp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Delivery Address
            </Label>
            <Textarea
              id="address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="col-span-3"
              placeholder="Enter delivery address"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Requests</Label>
            <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
              {requests.length === 0 ? (
                <p className="text-muted-foreground">No approved requests available</p>
              ) : (
                requests.map((request) => (
                  <div key={request.requestId} className="flex items-center space-x-2 py-2">
                    <Checkbox
                      id={`request-${request.requestId}`}
                      checked={selectedRequests.includes(request.requestId)}
                      onCheckedChange={() => handleRequestToggle(request.requestId)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">
                        {request.product.name} - {request.quantity} {request.uom}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        User: {request.user.name} | Price: {formatCurrency(request.price)} | Total:{" "}
                        {formatCurrency(request.price * request.quantity)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {selectedRequests.length > 0 && (
            <div className="bg-muted p-4 rounded-md">
              <div className="font-medium">Order Summary</div>
              <div className="text-sm text-muted-foreground">{selectedRequests.length} request(s) selected</div>
              <div className="text-lg font-bold">Total: {formatCurrency(calculateTotal())}</div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedCounterParty || !deliveryAddress || selectedRequests.length === 0}
          >
            Create Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
