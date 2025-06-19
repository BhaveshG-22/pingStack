"use client"

import * as React from "react"
import {
  User,
  Settings,
  Bell,
  LogOut,
} from "lucide-react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

const profileData = {
  nav: [
    { name: "Profile Settings", icon: Settings, action: "profile" },
    { name: "Notifications", icon: Bell, action: "notifications" },
    { name: "Sign Out", icon: LogOut, action: "signout" },
  ],
}

interface UserProfileSidebarProps {
  session: Session | null
  children: React.ReactNode
}

export function UserProfileSidebar({ session, children }: UserProfileSidebarProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedSection, setSelectedSection] = React.useState("profile")
  const [showSignoutConfirm, setShowSignoutConfirm] = React.useState(false)

  const handleMenuClick = (item: any) => {
    if (item.action === "signout") {
      setShowSignoutConfirm(true)
    } else {
      // Reset signout confirmation if user clicks on other sections
      setShowSignoutConfirm(false)
      setSelectedSection(item.action)
    }
  }

  const handleConfirmSignout = () => {
    signOut({ callbackUrl: "/" })
    setOpen(false)
    setShowSignoutConfirm(false)
  }

  const handleCancelSignout = () => {
    setShowSignoutConfirm(false)
    // Reset to profile section when canceling signout
    setSelectedSection("profile")
  }

  const renderContent = () => {
    if (showSignoutConfirm) {
      return (
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Sign Out Confirmation</h3>
              <p className="text-sm text-gray-500">Are you sure you want to sign out?</p>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-4">
              You will be signed out of your PingStack account and redirected to the home page.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleConfirmSignout}
                variant="outline"
                className="flex-1"
              >
                Yes, Sign Out
              </Button>
              <Button
                onClick={handleCancelSignout}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )
    }

    switch (selectedSection) {
      case "profile":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{session?.user?.name}</h3>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Profile Settings</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="text-sm font-medium">{session?.user?.name || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-sm font-medium">{session?.user?.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Account Type</label>
                  <p className="text-sm font-medium">Free Plan</p>
                </div>
              </div>
            </div>
          </div>
        )
      
      case "notifications":
        return (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Notification Settings</h3>
                <p className="text-sm text-gray-500">Manage your notification preferences</p>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email campaigns sent</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Weekly reports</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System updates</span>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{session?.user?.name}</h3>
                <p className="text-sm text-gray-500">{session?.user?.email}</p>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Welcome to PingStack! Use the sidebar options to manage your account settings and preferences.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[400px] md:max-w-[600px] bg-white">
        <DialogTitle className="sr-only">User Profile</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your account settings and preferences.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex bg-white">
            <SidebarContent className="bg-white">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {profileData.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          onClick={() => handleMenuClick(item)}
                          className="cursor-pointer"
                          isActive={!showSignoutConfirm && selectedSection === item.action}
                        >
                          <item.icon />
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[320px] flex-1 flex-col overflow-hidden bg-white">
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b">
              <h2 className="text-lg font-semibold">
                {showSignoutConfirm ? "Sign Out" :
                 selectedSection === "profile" ? "Profile Settings" : 
                 selectedSection === "notifications" ? "Notification Settings" : "Account"}
              </h2>
            </header>
            {renderContent()}
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}