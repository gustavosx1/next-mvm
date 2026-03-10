import { useState, useRef } from "react"

export default function ModalEdit({ usuario, setUsuarios, setUsuariosFiltrados, setEditView }) {
  const [form, setForm] = useState({
    nome: usuario.nome || "",
    rg: usuario.rg || "",
    nascimento: usuario.nascimento || "",
    cpf: usuario.cpf || "",
    email: usuario.email || "",
    telefone: usuario.telefone || "",
    altura: usuario.altura || "",
    posicao: usuario.posicao || "",
    camisanr: usuario.camisanr || "",
    tamanho: usuario.tamanho || "",
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
      formData.append("rg", form.rg)
      formData.append("email", form.email)
      formData.append("telefone", form.telefone)
      formData.append("nascimento", form.nascimento)
      formData.append("altura", form.altura)
      formData.append("posicao", form.posicao)
      formData.append("camisanr", form.camisanr)
      formData.append("tamanho", form.tamanho)
      formData.append("ativo", true)
      if (foto) formData.append("foto", foto) // Enviar como base64 string

      const res = await fetch(`/API/${usuario.id}`, {
        method: "PUT",
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        alert("Erro ao editar usuário: " + (data.error || "Erro desconhecido"))
        return
      }
      setUsuarios(prev => prev.map(u => u.id === usuario.id ? { ...u, ...form } : u))
      setUsuariosFiltrados(prev => prev.map(u => u.id === usuario.id ? { ...u, ...form } : u))
      alert("Edição salva com sucesso!")
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
      setEditView(false)
    }
  }
  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem'
    }}>
      <div className="card" style={{
        width: '100%', maxWidth: '520px', maxHeight: '90vh',
        overflowY: 'auto', padding: '2rem', margin: 0
      }}>
        <h3 style={{ marginBottom: '0.25rem' }}>Editar Atleta</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Editando: <strong>{usuario.nome}</strong>
        </p>
        <hr style={{ marginBottom: '1.5rem', borderColor: 'var(--border)' }} />

        <form onSubmit={handleSubmit} style={{ maxWidth: '100%' }}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo *</label>
            <input type="text" id="nome" name="nome" value={form.nome} placeholder="Digite seu nome completo" onChange={handleChange} required disabled={loading} />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF *</label>
            <input type="text" id="cpf" name="cpf" value={form.cpf} placeholder="000.000.000-00" onChange={handleChange} required disabled={loading} />
          </div>

          <div className="form-group">
            <label htmlFor="rg">RG *</label>
            <input type="text" id="rg" name="rg" value={form.rg} placeholder="Digite seu RG" onChange={handleChange} required disabled={loading} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" name="email" value={form.email} placeholder="seu@email.com" onChange={handleChange} required disabled={loading} />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="text" id="telefone" name="telefone" value={form.telefone} placeholder="(XX) 9XXXX-XXXX" onChange={handleChange} disabled={loading} />
          </div>

          <div className="form-group">
            <label htmlFor="nascimento">Data de Nascimento *</label>
            <input type="date" id="nascimento" name="nascimento" value={form.nascimento} onChange={handleChange} required disabled={loading} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="posicao">Posição</label>
              <input type="text" id="posicao" name="posicao" value={form.posicao} placeholder="Ex: Levantador" onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="altura">Altura (cm)</label>
              <input type="text" id="altura" name="altura" value={form.altura} placeholder="175" onChange={handleChange} disabled={loading} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="camisanr">Camisa Nº</label>
              <input type="text" id="camisanr" name="camisanr" value={form.camisanr} placeholder="Ex: 10" onChange={handleChange} disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="tamanho">Tamanho</label>
              <select id="tamanho" name="tamanho" value={form.tamanho} onChange={handleChange} disabled={loading}>
                <option value="">Selecione</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="foto">Foto de Perfil</label>
            <input type="file" id="foto" name="foto" onChange={handleFileChange} accept="image/*" disabled={loading} />
            {foto && <p style={{ color: 'var(--primary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>✓ Nova foto selecionada</p>}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Edição'}
            </button>
            <button type="button" className="btn-danger" style={{ flex: 1 }} onClick={() => setEditView(false)} disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
