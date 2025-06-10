"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface CreateCounterPartyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateCounterPartyDialog({ open, onOpenChange }: CreateCounterPartyDialogProps) {
  const [name, setName] = useState("")
  const [contactInfo, setContactInfo] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const counterPartyData = {
        name,
        contactInfo,
        address,
      }

      console.log("Creating counter party:", counterPartyData)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Counter party created successfully!")

      // Reset form
      setName("")
      setContactInfo("")
      setAddress("")
      onOpenChange(false)
    } catch (error) {
      console.error("Error creating counter party:", error)
      alert("Error creating counter party. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Counter Party</DialogTitle>
          <DialogDescription>Add a new business partner or supplier</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Company Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Enter company name"
              required
            />
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
              placeholder="Email, phone, etc."
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
              placeholder="Enter business address"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !name || !contactInfo || !address}>
              {loading ? "Creating..." : "Create Counter Party"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
