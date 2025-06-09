"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Product {
  productId: number
  name: string
  uom: string
}

interface User {
  userId: number
  name: string
}

interface CreateRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateRequestDialog({ open, onOpenChange }: CreateRequestDialogProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [uom, setUom] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        // Mocking data for demonstration
        setProducts([
          { productId: 1, name: "Crude Oil", uom: "Barrel" },
          { productId: 2, name: "Natural Gas", uom: "MMBtu" },
          { productId: 3, name: "Diesel", uom: "Barrel" },
        ])

        setUsers([
          { userId: 1, name: "John Doe" },
          { userId: 2, name: "Jane Smith" },
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleProductChange = (value: string) => {
    setSelectedProduct(value)
    const product = products.find((p) => p.productId.toString() === value)
    if (product) {
      setUom(product.uom)
    }
  }

  const handleSubmit = async () => {
    try {
      // In a real app, this would be an actual API call
      const requestData = {
        userId: Number.parseInt(selectedUser),
        productId: Number.parseInt(selectedProduct),
        quantity: Number.parseFloat(quantity),
        uom,
        notes,
      }

      console.log("Creating request:", requestData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message (in a real app, you'd update the requests list)
      alert("Request created successfully!")

      // Reset form
      setSelectedProduct("")
      setSelectedUser("")
      setQuantity("")
      setNotes("")
      setUom("")

      // Close dialog
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating request:", error)
      alert("Error creating request. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Request</DialogTitle>
          <DialogDescription>Create a new oil product request</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="user" className="text-right">
              User
            </Label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger id="user" className="col-span-3">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.userId} value={user.userId.toString()}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Product
            </Label>
            <Select value={selectedProduct} onValueChange={handleProductChange}>
              <SelectTrigger id="product" className="col-span-3">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.productId} value={product.productId.toString()}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <div className="col-span-3 flex">
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="flex-1"
              />
              <div className="ml-2 flex items-center px-3 border rounded-md bg-muted">{uom}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
              placeholder="Add any notes or special requirements"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedUser || !selectedProduct || !quantity}>
            Create Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
