"use client"

import { Mails, ArrowLeft, CircleUser, User, X, Mail, Calendar, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

import Link from "next/link"
import { Session } from "next-auth"
import { useState, useEffect } from "react"

interface NavbarProps {
  showBackButton?: boolean
  backButtonText?: string
  backButtonHref?: string
  initialSession: Session | null
}

// Modal Component
function UserDetailsModal({
  isOpen,
  onClose,
  session
}: {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
}) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key) onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute top-full right-0 z-50 mt-2">
        <div className="bg-white rounded-lg shadow-xl w-80 p-6 border">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{session?.user?.name}</h2>
              <p className="text-sm text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          {/* User Info */}
          <div className="mb-6">
            <div className="border-t  border-gray-200 -mx-6"></div>
            <div className="flex items-center gap-3 justify-start py-3  space-x-3  px-3 hover:bg-gray-50 cursor-pointer transition-colors rounded-t-lg">
              <Settings className="h-5 w-5 text-gray-400" />
              <Link href="/profile" onClick={onClose} className="font-medium text-gray-900">Manage Account</Link>
            </div>
            <div className="border-b  border-gray-200 -mx-6"></div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
            >
              Notifications
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                signOut({ callbackUrl: '/' })
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function Navbar({
  showBackButton = true,
  backButtonText = "Back to Home",
  backButtonHref = "/",
  initialSession
}: NavbarProps) {

  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [showUserDetails, setShowUserDetails] = useState(false)

  // Hide navbar on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return null
  }

  if (pathname === "/") {
    showBackButton = false
  }

  // Use session from useSession or fallback to initialSession
  const currentSession = session || initialSession

  return (
    <>
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Mails className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">PingStack</span>
          </Link>

          {showBackButton ? (
            <Button variant="outline" asChild>
              <Link href={backButtonHref} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {backButtonText}
              </Link>
            </Button>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
            </nav>
          )}

          {!showBackButton ? (
            initialSession == null ? (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                  Sign In
                </Link>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4 relative">
                <button
                  onClick={() => setShowUserDetails(true)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="View profile"
                  id="profile-button"
                >
                  <CircleUser className="h-6 w-6 text-gray-600" />
                </button>

                {/* User Details Modal positioned below profile icon */}
                <UserDetailsModal
                  isOpen={showUserDetails}
                  onClose={() => setShowUserDetails(false)}
                  session={currentSession}
                />
              </div>
            )
          ) : null}
        </div>
      </header>
    </>
  )
}