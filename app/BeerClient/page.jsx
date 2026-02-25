"use client"

import { useBeer } from "../Context/BeerContext.jsx"

export default function BeerClient() {
  const Beers = useBeer() || []

  return (
    <ul>
      {Beers.map((b) => (
        <li key={b.id}>{b.name}</li>
      ))}
    </ul>
  )
}
