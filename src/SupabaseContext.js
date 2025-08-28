import { createContext, useContext } from 'react'

export const SupabaseContext = createContext(null)

export function useSupabase() {
  return useContext(SupabaseContext)
}
