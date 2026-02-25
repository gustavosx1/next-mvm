let cadastros = []

export async function POST(req) {
  const data = await req.form()

  const novoUser = {
    id: cadastros.length + 1,
    nome: data.get("nome"),
    cpf: data.get("cpf"),
    telefone: data.get("telefone"),
    email: data.get("email"),
    idade: data.get("idade"),
  }
  cadastros.push(novoUser)
  return response.json(novoUser, { status: 201 })
}

export async function GET() {
  return Response.json(cadastros)
}
