"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface CreateProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateProductDialog({ open, onOpenChange }: CreateProductDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [uom, setUom] = useState("")
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        name,
        description,
        uom,
        price: price ? Number.parseFloat(price) : null,
      }

      console.log("Creating product:", productData)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Product created successfully!")

      // Reset form
      setName("")
      setDescription("")
      setUom("")
      setPrice("")
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Error creating product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>Add a new oil product to the system</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Enter product description"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uom" className="text-right">
              Unit of Measure
            </Label>
            <Select value={uom} onValueChange={setUom} required>
              <SelectTrigger id="uom" className="col-span-3">
                <SelectValue placeholder="Select unit of measure" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Barrel">Barrel</SelectItem>
                <SelectItem value="MMBtu">MMBtu</SelectItem>
                <SelectItem value="Gallon">Gallon</SelectItem>
                <SelectItem value="Liter">Liter</SelectItem>
                <SelectItem value="Ton">Ton</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Initial Price
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
              placeholder="Enter initial price (optional)"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !name || !uom}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
