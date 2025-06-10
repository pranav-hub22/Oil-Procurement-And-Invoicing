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
import { MoreHorizontal, Edit, Trash2, Building } from "lucide-react"
import { EditCounterPartyDialog } from "@/components/edit-counter-party-dialog"

interface CounterParty {
  counterPartyId: number
  name: string
  contactInfo: string
  address: string
  isActive: boolean
  createdDate: string
}

export function CounterPartiesTable() {
  const [counterParties, setCounterParties] = useState<CounterParty[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCounterParty, setEditingCounterParty] = useState<CounterParty | null>(null)

  useEffect(() => {
    fetchCounterParties()
  }, [])

  const fetchCounterParties = async () => {
    try {
      const mockCounterParties: CounterParty[] = [
        {
          counterPartyId: 1,
          name: "Oil Corp Ltd",
          contactInfo: "contact@oilcorp.com | +1-555-0101",
          address: "123 Industrial Ave, Houston, TX 77001",
          isActive: true,
          createdDate: "2024-01-15T10:00:00Z",
        },
        {
          counterPartyId: 2,
          name: "Energy Solutions Inc",
          contactInfo: "info@energysolutions.com | +1-555-0102",
          address: "456 Energy Blvd, Dallas, TX 75201",
          isActive: true,
          createdDate: "2024-01-16T14:30:00Z",
        },
        {
          counterPartyId: 3,
          name: "Petroleum Partners",
          contactInfo: "sales@petropartners.com | +1-555-0103",
          address: "789 Refinery Rd, Beaumont, TX 77701",
          isActive: true,
          createdDate: "2024-01-17T09:15:00Z",
        },
        {
          counterPartyId: 4,
          name: "Global Energy Co",
          contactInfo: "orders@globalenergy.com | +1-555-0104",
          address: "321 Oil Plaza, Midland, TX 79701",
          isActive: false,
          createdDate: "2024-01-18T11:45:00Z",
        },
      ]

      await new Promise((resolve) => setTimeout(resolve, 500))
      setCounterParties(mockCounterParties)
    } catch (error) {
      console.error("Error fetching counter parties:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (counterPartyId: number) => {
    if (confirm("Are you sure you want to delete this counter party?")) {
      try {
        setCounterParties(counterParties.filter((cp) => cp.counterPartyId !== counterPartyId))
        console.log(`Deleted counter party ${counterPartyId}`)
      } catch (error) {
        console.error("Error deleting counter party:", error)
      }
    }
  }

  const handleEdit = (counterParty: CounterParty) => {
    setEditingCounterParty(counterParty)
  }

  const handleUpdateCounterParty = (updatedCounterParty: CounterParty) => {
    setCounterParties(
      counterParties.map((cp) => (cp.counterPartyId === updatedCounterParty.counterPartyId ? updatedCounterParty : cp)),
    )
    setEditingCounterParty(null)
  }

  if (loading) {
    return <div>Loading counter parties...</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {counterParties.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No counter parties found
              </TableCell>
            </TableRow>
          ) : (
            counterParties.map((counterParty) => (
              <TableRow key={counterParty.counterPartyId}>
                <TableCell>{counterParty.counterPartyId}</TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    {counterParty.name}
                  </div>
                </TableCell>
                <TableCell>{counterParty.contactInfo}</TableCell>
                <TableCell>{counterParty.address}</TableCell>
                <TableCell>
                  <Badge variant={counterParty.isActive ? "default" : "destructive"}>
                    {counterParty.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(counterParty.createdDate).toLocaleDateString()}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(counterParty)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit counter party
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(counterParty.counterPartyId)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete counter party
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {editingCounterParty && (
        <EditCounterPartyDialog
          counterParty={editingCounterParty}
          open={!!editingCounterParty}
          onOpenChange={(open) => !open && setEditingCounterParty(null)}
          onUpdate={handleUpdateCounterParty}
        />
      )}
    </>
  )
}
