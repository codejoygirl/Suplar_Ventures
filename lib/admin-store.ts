'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
    role: string;
  } | null;
}

interface AdminStore extends AdminState {
  login: () => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      
      login: () => {
        set({
          isAuthenticated: true,
          user: {
            id: 'admin-1',
            username: 'admin@suplar.com',
            role: 'super_admin'
          }
        });
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          user: null
        });
      }
    }),
    {
      name: 'admin-auth-storage',
    }
  )
);