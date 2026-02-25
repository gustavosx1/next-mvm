"use client"
import Link from "next/link"
import { useState } from "react"

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    rg: "",
    nascimento: "",
    cpf: "",
    email: "",
    telefone: "",
    idade: "",
    altura: "",
    posicao: "",
    tamanho: "",
  })

  const [foto, setFoto] = useState(null)

  function handleChange(e) {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("nome", form.nome)
    formData.append("cpf", form.cpf)
    formData.append("email", form.email)
    formData.append("telefone", form.telefone)
    formData.append("idade", form.idade)
    formData.append("nascimento", form.nascimento)
    formData.append("altura", form.altura)
    formData.append("posicao", form.posicao)
    formData.append("tamanho", form.tamanho)
    formData.append("ativo", form.ativo)
    if (foto) formData.append("foto", foto)

    fetch("/API", {
      method: "POST",
      body: formData
    })
    alert("Cadastro Salvo com sucesso!")
  }

  return (
    <div>
      <h2>Faça seu Cadastro na Seleção Maranhense de vôlei MASTER</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" name="nome" value={form.nome} placeholder="Nome Completo" onChange={handleChange} />
      <input type="text" name = "rg" value={form.rg} placeholder="RG" onChange={handleChange} />
      <input type="date" name = "nascimento" value={form.nascimento} placeholder="Data de Nascimento" onChange={handleChange} />
      <input type="text" name="cpf" value={form.cpf} placeholder="CPF" onChange={handleChange} />
      <input type="text" name="telefone" value={form.telefone} placeholder="Telefone" onChange={handleChange} />
      <input type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} />
      <input type="text" name = "posicao" value={form.posicao} placeholder="Posição" onChange={handleChange} />
      <select name="tamanho" value={form.tamanho} onChange={handleChange}>
        <option value="">Tamanho da Camisa</option>
        <option value="P">P</option>
        <option value="M">M</option>
        <option value="G">G</option>
        <option value="GG">GG</option>
      </select>
      <input type="text" name = "altura" value={form.altura} placeholder="Altura" onChange={handleChange} />
      <input type="file" name="foto" onChange={(e) => setFoto(e.target.files[0])} />
      <button type="submit">enviar</button>

    </form>
    <Link href="/Usuarios">Ver Atletas</Link>
</div>
  )

}
