// src/store/uiStore.ts
'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UiState {
  sidebarOpen: boolean
  theme: 'dark' | 'light' | 'system'
  activeToast: { id: string; title: string; description?: string; variant?: 'default' | 'destructive' } | null
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'dark' | 'light' | 'system') => void
  showToast: (toast: Omit<UiState['activeToast'], 'id'>) => void
  hideToast: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      theme: 'dark', // Sovereign Architect is dark-first
      activeToast: null,

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setTheme: (theme) => set({ theme }),
      
      showToast: (toast) =>
        set({
          activeToast: {
            ...toast,
            id: `toast-${Date.now()}`,
          },
        }),
      
      hideToast: () => set({ activeToast: null }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }), // only persist theme
    }
  )
)