//Resto das rotas está em API/[id]/route.js

import { createClient } from "@supabase/supabase-js"

const supaBaseURL = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supaBaseURL, supabaseKey)

export async function POST(req) {
  const form = await req.formData()
  const usuario = Object.fromEntries(form)

  try {
    // Foto já vem como base64 string, armazena direto
    const { data, error } = await supabase.from('usuarios').insert([usuario])
    if (error) throw error

    console.log("Usuário criado com sucesso!")
    return Response.json(data, { status: 201 })
  } catch (error) {
    console.error("Erro ao salvar:", error.message)
    return Response.json({ error: error.message }, { status: 400 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from('usuarios').select("*")
    if (error) throw error

    console.log("Usuários importados com sucesso!")
    return Response.json(data, { status: 200 })
  } catch (error) {
    console.error("Erro ao importar usuários:", error.message)
    return Response.json({ error: error.message }, { status: 400 })
  }
}

