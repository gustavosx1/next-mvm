import Link from "next/link"
export default function RootLayout({ children }) {
  return (
    <div>
      <h1>----Client Side Rocha----</h1>
      <h3><Link href="/Beers">Ir para Beers Server Side</Link></h3>
      {children}
      <p style={{ alignContent: 'center' }}>© 2026 - Todos os direitos reservados</p>
    </div>
  )
}
