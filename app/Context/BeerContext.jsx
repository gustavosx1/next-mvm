"use client"
import { useContext, createContext, useState } from "react";

const BeerContext = createContext([])

export default function BeerProvider({ children, data }) {
  const [beers] = useState(data || []);

  return (
    <BeerContext.Provider value={beers}>{children}</BeerContext.Provider>
  )
}

export function useBeer() {
  return useContext(BeerContext)
}
