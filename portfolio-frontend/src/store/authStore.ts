// src/store/authStore.ts
'use client'

import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => {
    set({ user, token, isAuthenticated: true })
    // HttpOnly cookie is set server-side via API route
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false })
    // Cookie cleared server-side via API route
  },

  setToken: (token) => {
    set({ token, isAuthenticated: !!token })
  },
}))