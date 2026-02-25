"use client"

import { useState } from "react"

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    idade: "",
    foto: null,
  })
  const [foto, setFoto] = useState(null)

  function handleChange(e) {
    setForm({
      ...form, [e.target.name]: [e.target.value]
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    form.append("foto", foto)
    fetch("/API", {
      method: "POST",
      body: form
    })
    alert("Cadastro Salvo com sucesso!")
  }

  return (
    <form>
      <input type="text" name="nome" value={form.nome} placeholder="Nome" onChange={handleChange} />

      <input type="text" name="cpf" value={form.cpf} placeholder="CPF" onChange={handleChange} />
      <input type="text" name="telefone" value={form.telefone} placeholder="Telefone" onChange={handleChange} />
      <input type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} />
      <input type="number" name="idade" value={form.idade} placeholder="Idade" onChange={handleChange} />
      <input type="file" name="foto" value={form.foto} property="" onChange={(e) => setFoto(e.target.files[0])} />
      <button type="submit">enviar</button>

    </form>

  )

}
