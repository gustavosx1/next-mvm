
export default async function Usuarios() {
  const usuarios = await fetch("/API")
  return (
    <ul>
      {
        usuarios.map((u) => (
          <li key={u.id}>u.nome</li>
        )
        )}
    </ul>
  )
}
