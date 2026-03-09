import * as XLSX from "xlsx"
import { useState } from "react"
import { calcularIdade } from "../utils/calcularIdade"

export default function ModalExport({ usuariosFiltrados, modalView, setModalView }) {
  const [camposSelecionados, setCamposSelecionados] = useState({
    nome: true,
    idade: true,
    posicao: true,
    camisanr: true,
    tamanho: true,
    altura: true,
    cpf: true,
    rg: true,
    email: true,
    telefone: true,
    status: true,
  })
  const camposLabels = {
    nome: "Nome",
    idade: "Idade",
    posicao: "Posição",
    camisanr: "Camisa Nº",
    tamanho: "Tamanho",
    altura: "Altura",
    cpf: "CPF",
    rg: "RG",
    email: "Email",
    telefone: "Telefone",
    status: "Status",
  }

  function handleExportXLSX() {
    const campos = Object.keys(camposSelecionados).filter(c => camposSelecionados[c])

    const dados = usuariosFiltrados.map(u => {
      const linha = {}
      campos.forEach(campo => {
        if (campo === "idade") linha["Idade"] = calcularIdade(u.nascimento) + " anos"
        else if (campo === "status") linha["Status"] = u.ativo ? "Ativo" : "Inativo"
        else linha[camposLabels[campo]] = u[campo] || "-"
      })
      return linha
    })

    const ws = XLSX.utils.json_to_sheet(dados)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Atletas")

    // Largura automática das colunas
    const cols = campos.map(() => ({ wch: 20 }))
    ws['!cols'] = cols

    XLSX.writeFile(wb, "atletas_mvm.xlsx")
    setModalView(false)

  }
  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="card" style={{ width: '360px', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Escolha os campos para exportar</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <button onClick={() => setCamposSelecionados(Object.fromEntries(Object.keys(camposSelecionados).map(k => [k, true])))}
            style={{ fontSize: '0.75rem', cursor: 'pointer' }}>Selecionar todos</button>
          <button onClick={() => setCamposSelecionados(Object.fromEntries(Object.keys(camposSelecionados).map(k => [k, false])))}
            style={{ fontSize: '0.75rem', cursor: 'pointer' }}>Limpar</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {Object.keys(camposSelecionados).map(campo => (
            <label key={campo} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={camposSelecionados[campo]}
                onChange={() => setCamposSelecionados(prev => ({ ...prev, [campo]: !prev[campo] }))}
              />
              {camposLabels[campo]}
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handleExportXLSX} className="btn-primary" style={{ flex: 1 }}>
            Exportar
          </button>
          <button onClick={() => setModalView(false)} className="btn-danger" style={{ flex: 1 }}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
