import type React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    if (onClick) onClick()
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors ${className}`}
    >
      {children}
    </a>
  )
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container max-w-6xl mx-auto">
        <nav className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Rollon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#use-cases">Use Cases</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Button onClick={() => navigate('/signup')} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 shadow-sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="h-5 w-5" />
          </button>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
              <div className="py-2">
                <NavLink
                  href="#features"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </NavLink>
                <NavLink
                  href="#use-cases"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Use Cases
                </NavLink>
                <NavLink
                  href="#testimonials"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Testimonials
                </NavLink>
                <NavLink href="#pricing" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                  Pricing
                </NavLink>
                <hr className="my-2" />
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <div className="px-4 py-2">
                  <Button onClick={() => {
                    setIsOpen(false)
                    navigate('/signup')
                  }} className="w-full bg-blue-500 hover:bg-blue-600">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export function FooterNavigation() {
  return (
    <ul className="space-y-2">
      <li>
        <Link to="/" className="text-slate-400 hover:text-white">
          Home
        </Link>
      </li>
      <li>
        <NavLink href="#features" className="text-slate-400 hover:text-white">
          Features
        </NavLink>
      </li>
      <li>
        <NavLink href="#pricing" className="text-slate-400 hover:text-white">
          Pricing
        </NavLink>
      </li>
      <li>
        <Link to="#" className="text-slate-400 hover:text-white">
          FAQ
        </Link>
      </li>
    </ul>
  )
}
