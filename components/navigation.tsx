"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Mountain, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/context/favorites-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { favorites, isLoading } = useFavorites()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/culture", label: "Culture & Heritage" },
    { href: "/eco-tourism", label: "Eco-Tourism" },
    { href: "/trip-planner", label: "AI Trip Planner" },
    // { href: "/map", label: "Interactive Map" },
  ]

  // Don't show badge count while loading to avoid flash
  const showBadge = !isLoading && favorites.length > 0

  // Prevent body scroll when mobile menu is open
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
  
  // Close mobile menu on route change
  useEffect(() => {
    if(isOpen) {
      setIsOpen(false)
    }
  }, [pathname])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
            <Mountain className="h-6 w-6" />
            <span>Discover Jharkhand</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Favorites Link with Heart Icon */}
            <Link
              href="/favorites"
              className={`relative flex items-center gap-1 text-sm font-medium transition-colors hover:text-red-500 group ${
                pathname === "/favorites" ? "text-red-500" : "text-foreground/80"
              }`}
            >
              <Heart 
                className={`h-5 w-5 transition-all ${
                  showBadge 
                    ? "fill-red-500 text-red-500" 
                    : "group-hover:fill-red-200 group-hover:text-red-500"
                }`} 
              />
              <span>Favorites</span>
              {showBadge && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="border-t border-border/40 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Favorites Link */}
              <Link
                href="/favorites"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-red-500 ${
                  pathname === "/favorites" ? "text-red-500" : "text-foreground/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Heart 
                  className={`h-5 w-5 ${
                    showBadge ? "fill-red-500 text-red-500" : ""
                  }`} 
                />
                <span>Favorites</span>
                {showBadge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}