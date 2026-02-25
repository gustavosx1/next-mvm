export async function POST(req) {
  const { senha } = await req.json()

  if (senha === process.env.ENV_PASSWORD) {
    return Response.json({ sucesso: true }, { status: 200 })
  }

  return Response.json({ sucesso: false }, { status: 401 })
}
