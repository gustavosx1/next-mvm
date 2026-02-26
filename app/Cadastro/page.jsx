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
    altura: "",
    posicao: "",
    tamanho: "",
  })

  const [foto, setFoto] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      // Validar tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Arquivo muito grande! Máximo 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        setFoto(event.target.result) // Base64 string
      }
      reader.readAsDataURL(file)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("nome", form.nome)
      formData.append("cpf", form.cpf)
      formData.append("email", form.email)
      formData.append("telefone", form.telefone)
      formData.append("nascimento", form.nascimento)
      formData.append("altura", form.altura)
      formData.append("posicao", form.posicao)
      formData.append("tamanho", form.tamanho)
      formData.append("ativo", true)
      if (foto) formData.append("foto", foto) // Enviar como base64 string

      const res = await fetch("/API", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      if (data.error) {
        alert("Erro ao salvar: " + data.error)
        return
      }

      alert("Cadastro salvo com sucesso!")
      // Limpar formulário
      setForm({
        nome: "", rg: "", nascimento: "", cpf: "", email: "",
        telefone: "", altura: "", posicao: "", tamanho: ""
      })
      setFoto(null)
    } catch (error) {
      alert("Erro ao enviar cadastro: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <h2>Faça seu Cadastro</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Seleção Maranhense de Vôlei MASTER</p>
        <h3 style={{ fontSize: '1rem', color: 'var(--danger)', marginBottom: '1.5rem' }}>Os campos marcados com "*" são obrigatórios</h3>
        <hr style={{ marginBottom: '2rem', borderColor: 'var(--border)' }} />
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input type="text" id="nome" name="nome" value={form.nome} placeholder="Digite seu nome completo" onChange={handleChange} required disabled={loading} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="cpf">CPF *</label>
              <input type="text" id="cpf" name="cpf" value={form.cpf} placeholder="000.000.000-00" onChange={handleChange} required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="rg">RG</label>
              <input type="text" id="rg" name="rg" value={form.rg} placeholder="Digite seu RG" onChange={handleChange} disabled={loading} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" name="email" value={form.email} placeholder="seu@email.com" onChange={handleChange} required disabled={loading} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input type="text" id="telefone" name="telefone" value={form.telefone} placeholder="(XX) 9XXXX-XXXX" onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="nascimento">Data de Nascimento *</label>
              <input type="date" id="nascimento" name="nascimento" value={form.nascimento} onChange={handleChange} required disabled={loading} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group">
              <label htmlFor="altura">Altura (em CM)</label>
              <input type="text" id="altura" name="altura" value={form.altura} placeholder="175" onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="posicao">Posição</label>
              <input type="text" id="posicao" name="posicao" value={form.posicao} placeholder="Ex: Levantador" onChange={handleChange} disabled={loading} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tamanho">Tamanho da Camisa</label>
            <select id="tamanho" name="tamanho" value={form.tamanho} onChange={handleChange} disabled={loading}>
              <option value="">Selecione um tamanho</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="foto">Foto de Perfil</label>
            <input type="file" id="foto" name="foto" onChange={handleFileChange} accept="image/*" disabled={loading} />
            {foto && <p style={{ color: 'var(--primary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>✓ Foto selecionada</p>}
          </div>

          <button type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Cadastro'}
          </button>

        </form>
      </div>
    </div>
  )
}
