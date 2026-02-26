import Link from "next/link"
import "./globals.css"

export const metadata = {
  title: "Cadastro Atletas MVM",
  description: "Sistema de gerenciamento de atletas da seleção maranhense de vôlei master",
}

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <h1>Cadastro Atletas MVM</h1>
          <nav>
            <Link href="/Usuarios">Atletas</Link>
            <Link href="/Cadastro">Cadastro</Link>
          </nav>
        </header>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}
