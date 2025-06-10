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
import { MoreHorizontal, Edit, Trash2, UserCheck, UserX } from "lucide-react"
import { EditUserDialog } from "@/components/edit-user-dialog"

interface User {
  userId: number
  name: string
  email: string
  role: string
  isActive: boolean
  createdDate: string
}

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // In production, this would be: const response = await fetch('/api/users')
      // For now, using mock data that simulates database records
      const mockUsers: User[] = [
        {
          userId: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          role: "Buyer",
          isActive: true,
          createdDate: "2024-01-15T10:00:00Z",
        },
        {
          userId: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "Buyer",
          isActive: true,
          createdDate: "2024-01-16T14:30:00Z",
        },
        {
          userId: 3,
          name: "Mike Johnson",
          email: "mike.johnson@example.com",
          role: "Admin",
          isActive: true,
          createdDate: "2024-01-17T09:15:00Z",
        },
        {
          userId: 4,
          name: "Sarah Wilson",
          email: "sarah.wilson@example.com",
          role: "Buyer",
          isActive: false,
          createdDate: "2024-01-18T11:45:00Z",
        },
      ]

      await new Promise((resolve) => setTimeout(resolve, 500))
      setUsers(mockUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        // In production: await fetch(`/api/users/${userId}`, { method: 'DELETE' })
        setUsers(users.filter((user) => user.userId !== userId))
        console.log(`Deleted user ${userId}`)
      } catch (error) {
        console.error("Error deleting user:", error)
      }
    }
  }

  const handleToggleActive = async (userId: number) => {
    try {
      // In production: await fetch(`/api/users/${userId}/toggle-active`, { method: 'PATCH' })
      setUsers(users.map((user) => (user.userId === userId ? { ...user, isActive: !user.isActive } : user)))
      console.log(`Toggled active status for user ${userId}`)
    } catch (error) {
      console.error("Error toggling user status:", error)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.userId === updatedUser.userId ? updatedUser : user)))
    setEditingUser(null)
  }

  if (loading) {
    return <div>Loading users...</div>
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "default" : "destructive"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.createdDate).toLocaleDateString()}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleEdit(user)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit user
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleActive(user.userId)}>
                        {user.isActive ? (
                          <>
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDelete(user.userId)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onUpdate={handleUpdateUser}
        />
      )}
    </>
  )
}
