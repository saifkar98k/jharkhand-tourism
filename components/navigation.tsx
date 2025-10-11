"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Mountain, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/context/favorites-context"
import { cn } from "@/lib/utils" // Assumes you have a utility for merging Tailwind classes

// --- IMPROVEMENT: Moved static data outside the component ---
// This prevents the array from being recreated on every render.
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/culture", label: "Culture & Heritage" },
  { href: "/eco-tourism", label: "Eco-Tourism" },
  { href: "/trip-planner", label: "AI Trip Planner" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { favorites } = useFavorites()

  // --- UX IMPROVEMENT: Prevent body scroll when mobile menu is open ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])
  
  // --- UX IMPROVEMENT: Close mobile menu on route change ---
  useEffect(() => {
    if(isOpen) {
      setIsOpen(false)
    }
  }, [pathname])


  // --- CODE IMPROVEMENT: Reusable NavLink component for active state logic ---
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground/80"
        )}
      >
        {children}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Mountain className="h-6 w-6" />
            <span>Discover Jharkhand</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <Link
              href="/favorites"
              className="group relative flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-red-500"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-all group-hover:fill-red-200 group-hover:text-red-500",
                  favorites.length > 0 && "fill-red-500 text-red-500"
                )}
                aria-hidden="true"
              />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            // --- ACCESSIBILITY IMPROVEMENT ---
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - without Framer Motion */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="overflow-hidden border-t border-border/40 md:hidden transition-all duration-300 ease-in-out"
        >
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
            <Link
              href="/favorites"
              className="flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-red-500"
            >
              <Heart
                className={cn("h-5 w-5", favorites.length > 0 && "fill-red-500 text-red-500")}
                aria-hidden="true"
              />
              <span>Favorites</span>
              {favorites.length > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}