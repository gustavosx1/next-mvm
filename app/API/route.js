let cadastros = []

export async function POST(req) {
  const data = await req.formData()

  const novoUser = {
    id: cadastros.length + 1,
    nome: data.get("nome"),
    cpf: data.get("cpf"),
    telefone: data.get("telefone"),
    email: data.get("email"),
    idade: data.get("idade"),
    ativo: data.get("ativo"),
  }
  cadastros.push(novoUser)
  return Response.json(novoUser, { status: 201 })
}

export async function GET() {
  return Response.json(cadastros)
}
