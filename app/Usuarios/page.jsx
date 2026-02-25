"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Usuarios() {
  const [usuariosNovos, setUsuariosNovos] = useState([])
  const [usuariosConfirmados, setUsuariosConfirmados] = useState([])
  const [senha, setSenha] = useState("")
  const [autenticado, setAutenticado] = useState(false)

  useEffect(() => {
    fetch("/API")
      .then(res => res.json())
      .then(data => setUsuariosNovos(data))
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
  } else{
    alert("Senha incorreta!")
  }    
})
}

  function handleConfirm(u) {
    setUsuariosConfirmados([...usuariosConfirmados, u])
    setUsuariosNovos(usuariosNovos.filter(usuario => usuario.id !== u.id))
  }

  function handleCancel(u) {
    setUsuariosNovos(usuariosNovos.filter(usuario => usuario.id !== u.id))
  }

  //Vai mudar quando fazer a implementação com o SUPABASE
  function handleRemove(u) {
    setUsuariosConfirmados(usuariosConfirmados.filter(usuario => usuario.id !== u.id))
  }

  return (
    <div>
      {!autenticado ? (
        <>
          <h2>Insira a senha para acessar os usuários</h2>
          <input 
            type="password" 
            name="Senha" 
            placeholder="Senha.." 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>Entrar</button>
        </>
      ) : (
        <>
          <h2>Usuários para Confirmar</h2>
          {usuariosNovos.length > 0 ? (
            <ul>
              {usuariosNovos.map((u) => (
                <div key={u.id}>
                  <li>{u.nome}</li>
                  <button onClick={() => handleConfirm(u)}>Confirma</button>
                  <button onClick={() => handleCancel(u)}>Cancela</button>
                </div>
              ))}
            </ul>
          ) : (
            <p>Nenhum usuário para confirmar</p>
          )}

          <h2>Usuários Confirmados</h2>
          {usuariosConfirmados.length > 0 ? (
            <ul>
              {usuariosConfirmados.map((u) => (
                <li key={u.id}>{u.nome} - {u.ativo ? "Ativo" : "Inativo"}
                <p>{u.cpf}</p>
                <p>{u.rg}</p>
                <p>{u.email}</p>
                <p>{u.telefone}</p>
                <p>{u.idade}</p>
                <p>{u.tamanho}</p>
                
                <button onClick={() => handleRemove(u)}>Remover {u.nome}</button>
                </li>
                
              ))}
            </ul>
          ) : (
            <p>Nenhum usuário confirmado</p>
          )}

          <Link href="/Cadastro">Fazer novo cadastro</Link>
        </>
      )}
    </div>
  )
}
