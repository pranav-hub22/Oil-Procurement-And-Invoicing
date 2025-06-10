"use client"

import type React from "react"

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
  description: string
  uom: string
  isActive: boolean
  createdDate: string
  currentPrice?: number
}

interface EditProductDialogProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (product: Product) => void
}

export function EditProductDialog({ product, open, onOpenChange, onUpdate }: EditProductDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [uom, setUom] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setName(product.name)
      setDescription(product.description)
      setUom(product.uom)
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedProduct = {
        ...product,
        name,
        description,
        uom,
      }

      console.log("Updating product:", updatedProduct)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onUpdate(updatedProduct)
      alert("Product updated successfully!")
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Error updating product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update product information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
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
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uom" className="text-right">
              Unit of Measure
            </Label>
            <Select value={uom} onValueChange={setUom} required>
              <SelectTrigger id="uom" className="col-span-3">
                <SelectValue />
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

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !name || !uom}>
              {loading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
