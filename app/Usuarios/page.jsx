"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([])
  const [senha, setSenha] = useState("")
  const [autenticado, setAutenticado] = useState(false)

  useEffect(() => {
    fetch("/API")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setUsuariosFiltrados(data)
      })
  }, [])

  function handleSubmit() {
    fetch("/API/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ senha })
    })
      .then(res => res.json())
      .then(data => {
        if (data.sucesso) {
          setAutenticado(true)
        } else {
          alert("Senha incorreta!")
        }
      })
  }

  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return "N/A"
    const hoje = new Date()
    const nascimento = new Date(dataNascimento)
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--
    }
    return idade
  }


  function converterFoto(foto) {
    // Se foto é string, retorna direto (já é base64)
    if (foto && typeof foto === 'string') {
      return foto
    }
    return null
  }

  function handleToggleAtivo(u) {
    fetch(`/API/${u.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ativo: !u.ativo })
    }).then(res => res.json())
      .then(data => {
        if (data.sucesso) {
          setUsuarios(usuarios.map(usuario =>
            usuario.id === u.id ? { ...usuario, ativo: !usuario.ativo } : usuario
          ))
        }
      })
  }

  function handleRemove(u) {
    fetch(`/API/${u.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        if (data.sucesso) {
          alert("Usuário removido com sucesso!")
          setUsuarios(usuarios.filter(usuario => usuario.id !== u.id))
        }
      })
  }

  function handlePesquisa(e) {
    const filtro = e.target.value.toLowerCase();
    setUsuariosFiltrados(
      usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(filtro)
      )
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem', marginBottom: '2rem', padding: '0 1rem' }}>
      {!autenticado ? (
        <div className="card" style={{ maxWidth: '400px', margin: '4rem auto' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Acesso Restrito</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Insira a senha para acessar a lista de atletas</p>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              name="Senha"
              placeholder="Digite a senha..."
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
          <button type="submit" onClick={handleSubmit} style={{ width: '100%' }}>Entrar</button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ marginBottom: '0.5rem' }}>Atletas MVM</h2>
              <p style={{ color: 'var(--text-muted)' }}>{usuarios.length} atleta(s) registrado(s)</p>
            </div>
            <Link href="/Cadastro" className="btn-primary" style={{ padding: '0.75rem 1.5rem', textDecoration: 'none', width: '100%', textAlign: 'center' }}>+ Novo Cadastro</Link>
          </div>

          <form style={{ marginBottom: '1rem' }}>
            <div className="form-group">
              <label htmlFor="nome">Pesquise Atleta Pelo Nome</label>
              <input type="text" id="pesquisa" name="pesquisa" placeholder="Pesquise Atletas..." onChange={handlePesquisa} />
            </div>
          </form>

          {usuariosFiltrados.length > 0 ? (
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {usuariosFiltrados.map((u) => {
                const fotoBase64 = converterFoto(u.foto)
                // Se já vem com prefixo data:image, usa direto; senão, adiciona prefixo
                const fotoUrl = fotoBase64 && fotoBase64.startsWith('data:image/')
                  ? fotoBase64
                  : fotoBase64
                    ? `data:image/jpeg;base64,${fotoBase64}`
                    : 'https://via.placeholder.com/120?text=Sem+Foto'
                return (
                  <div key={u.id} className="user-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="user-card-avatar">
                      <img src={fotoUrl} alt={u.nome} className="user-photo" onError={(e) => e.target.src = 'https://via.placeholder.com/120?text=Sem+Foto'} style={{ width: '100%', height: 'auto', maxHeight: '150px' }} />
                    </div>
                    <div className="user-details" style={{ flex: 1 }}>
                      <div>
                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', color: 'var(--primary)' }}>{u.nome}</h3>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span className={`user-tag ${u.ativo ? 'active' : 'inactive'}`}>
                            {u.ativo ? '✓ Ativo' : '✗ Inativo'}
                          </span>
                          <button
                            onClick={() => handleToggleAtivo(u)}
                            style={{
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.75rem',
                              backgroundColor: u.ativo ? 'var(--danger)' : 'var(--primary)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: 500,
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {u.ativo ? 'Desativar' : 'Ativar'}
                          </button>
                        </div>

                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', fontSize: '0.875rem', marginTop: '1rem' }}>


                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Idade</p>
                            <p style={{ fontWeight: 600, color: 'var(--text)' }}>{calcularIdade(u.nascimento)} anos</p>
                          </div>
                          <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Posição</p>
                            <p style={{ fontWeight: 600, color: 'var(--text)' }}>{u.posicao || '-'}</p>
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Camisa Número</p>
                            <p style={{ fontWeight: 600, color: 'var(--text)' }}>{u.camisaNr || '-'}</p>
                          </div>
                          <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Tamanho</p>
                            <p style={{ fontWeight: 600, color: 'var(--text)' }}>{u.tamanho || '-'}</p>
                          </div>
                        </div>
                        <div>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Altura</p>
                          <p style={{ fontWeight: 600, color: 'var(--text)' }}>{u.altura ? `${u.altura}m` : '-'}</p>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', fontSize: '0.875rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <div>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>CPF</p>
                          <p style={{ fontWeight: 600, color: 'var(--text)' }}>{u.cpf}</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>RG</p>
                          <p style={{ fontWeight: 600, color: 'var(--text)' }}>{u.rg || '-'}</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email</p>
                          <p style={{ fontWeight: 500, color: 'var(--text)', wordBreak: 'break-all' }}>{u.email}</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Telefone</p>
                          <p style={{ fontWeight: 600, color: 'var(--text)' }}>{u.telefone || '-'}</p>
                        </div>
                      </div>

                      <button onClick={() => handleRemove(u)} className="btn-danger" style={{ width: '100%', marginTop: '1rem' }}>
                        Remover
                      </button>

                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <p>Nenhum usuário registrado</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
