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
  isLoading: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Destination[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFavorites()
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites))
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error)
      }
    }
  }, [favorites, isLoading])

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
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite,
      isLoading 
    }}>
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