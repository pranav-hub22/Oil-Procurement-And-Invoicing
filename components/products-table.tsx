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
import { MoreHorizontal, Edit, Trash2, DollarSign } from "lucide-react"
import { EditProductDialog } from "@/components/edit-product-dialog"

interface Product {
  productId: number
  name: string
  description: string
  uom: string
  isActive: boolean
  createdDate: string
  currentPrice?: number
}

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const mockProducts: Product[] = [
        {
          productId: 1,
          name: "Crude Oil",
          description: "West Texas Intermediate Crude Oil",
          uom: "Barrel",
          isActive: true,
          createdDate: "2024-01-15T10:00:00Z",
          currentPrice: 75.5,
        },
        {
          productId: 2,
          name: "Natural Gas",
          description: "Pipeline Quality Natural Gas",
          uom: "MMBtu",
          isActive: true,
          createdDate: "2024-01-16T14:30:00Z",
          currentPrice: 3.25,
        },
        {
          productId: 3,
          name: "Diesel",
          description: "Ultra Low Sulfur Diesel",
          uom: "Barrel",
          isActive: true,
          createdDate: "2024-01-17T09:15:00Z",
          currentPrice: 85.75,
        },
        {
          productId: 4,
          name: "Gasoline",
          description: "Regular Unleaded Gasoline",
          uom: "Barrel",
          isActive: false,
          createdDate: "2024-01-18T11:45:00Z",
          currentPrice: 82.3,
        },
      ]

      await new Promise((resolve) => setTimeout(resolve, 500))
      setProducts(mockProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        setProducts(products.filter((product) => product.productId !== productId))
        console.log(`Deleted product ${productId}`)
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
  }

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map((product) => (product.productId === updatedProduct.productId ? updatedProduct : product)))
    setEditingProduct(null)
  }

  if (loading) {
    return <div>Loading products...</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>UOM</TableHead>
            <TableHead>Current Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.productId}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.uom}</Badge>
                </TableCell>
                <TableCell>{product.currentPrice ? `$${product.currentPrice.toFixed(2)}` : "No price set"}</TableCell>
                <TableCell>
                  <Badge variant={product.isActive ? "default" : "destructive"}>
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(product.createdDate).toLocaleDateString()}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(product)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit product
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Manage pricing
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(product.productId)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          open={!!editingProduct}
          onOpenChange={(open) => !open && setEditingProduct(null)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </>
  )
}
