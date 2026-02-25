import Link from "next/link"
export default function RootLayout({ children }) {
  return (
    <div>
      <h1>----Cervejaria Rocha----</h1>
      <h3><Link href="/BeerClient">Ir para Beers Client Side</Link></h3>
      {children}
      <p style={{ alignContent: 'center' }}>© 2026 - Todos os direitos reservados</p>
    </div>
  )
}
