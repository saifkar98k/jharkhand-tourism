"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Destination {
  id: string
  name: string
  description: string
  location: string
  category: string
  image_url: string
  featured: boolean
  map_link?: string
}

interface FavoritesContextType {
  favorites: Destination[]
  addToFavorites: (destination: Destination) => void
  removeFromFavorites: (destinationId: string) => void
  isFavorite: (destinationId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Destination[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (destination: Destination) => {
    setFavorites(prev => {
      // Check if already in favorites
      if (prev.find(item => item.id === destination.id)) {
        return prev
      }
      return [...prev, destination]
    })
  }

  const removeFromFavorites = (destinationId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== destinationId))
  }

  const isFavorite = (destinationId: string) => {
    return favorites.some(item => item.id === destinationId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}