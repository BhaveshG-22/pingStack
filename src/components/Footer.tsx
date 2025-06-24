import { Brain } from "lucide-react"
import type { FooterProps } from "../../types/components"

export default function Footer({ variant = 'default', className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear()

  if (variant === 'privacy') {
    return (
      <footer className={`py-8 px-4 bg-gray-900 text-white ${className}`}>
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-5 w-5" />
            <span className="font-bold">PingStack</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {currentYear} PingStack. All rights reserved. Protecting your privacy is our priority.
          </p>
        </div>
      </footer>
    )
  }

  return (
    <footer className={`py-12 px-4 bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Brain className="h-6 w-6" />
            <span className="text-xl font-bold">PingStack</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {currentYear} PingStack. All rights reserved. Built for ambitious professionals.
        </div>
      </div>
    </footer>
  )
}