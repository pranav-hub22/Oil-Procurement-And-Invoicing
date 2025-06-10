"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface CounterParty {
  counterPartyId: number
  name: string
  contactInfo: string
  address: string
  isActive: boolean
  createdDate: string
}

interface EditCounterPartyDialogProps {
  counterParty: CounterParty
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (counterParty: CounterParty) => void
}

export function EditCounterPartyDialog({ counterParty, open, onOpenChange, onUpdate }: EditCounterPartyDialogProps) {
  const [name, setName] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (counterParty) {
      setName(counterParty.name)
      setContactInfo(counterParty.contactInfo)
      setAddress(counterParty.address)
    }
  }, [counterParty])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedCounterParty = {
        ...counterParty,
        name,
        contactInfo,
        address,
      }

      console.log("Updating counter party:", updatedCounterParty)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onUpdate(updatedCounterParty)
      alert("Counter party updated successfully!")
    } catch (error) {
      console.error("Error updating counter party:", error)
      alert("Error updating counter party. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Counter Party</DialogTitle>
          <DialogDescription>Update counter party information</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Company Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactInfo" className="text-right">
              Contact Info
            </Label>
            <Textarea
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !name || !contactInfo || !address}>
              {loading ? "Updating..." : "Update Counter Party"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
