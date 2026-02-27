//Rotas de DELETE, PUT, GET com ID para o SUPABASE
import { createClient } from "@supabase/supabase-js"

const supaBaseURL = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supaBaseURL, supabaseKey)

export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const { data, error } = await supabase.from('usuarios').delete().eq('id', id)
    if (error) throw error

    console.log("Usuário deletado com sucesso!")
    return Response.json({ sucesso: true }, { status: 200 })
  } catch (error) {
    console.error("Erro ao deletar usuário:", error.message)
    return Response.json({ sucesso: false, error: error.message }, { status: 400 })
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const form = await req.formData()
    const usuarioAtualizado = Object.fromEntries(form)

    const { data, error } = await supabase.from('usuarios').update(usuarioAtualizado).eq('id', id)
    if (error) throw error

    console.log("Usuário atualizado com sucesso!")
    return Response.json({ sucesso: true }, { status: 200 })
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.message)
    return Response.json({ sucesso: false, error: error.message }, { status: 400 })
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { ativo } = body

    const { data, error } = await supabase
      .from('usuarios')
      .update({ ativo })
      .eq('id', id)

    if (error) throw error

    console.log("Status do usuário atualizado!")
    return Response.json({ sucesso: true, data }, { status: 200 })
  } catch (error) {
    console.error("Erro ao atualizar status:", error.message)
    return Response.json({ sucesso: false, error: error.message }, { status: 400 })
  }
}