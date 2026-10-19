export default function Filtros({ filtros, setFiltros }) {
  const upd = (k, v) => setFiltros({ ...filtros, [k]: v });

  return (
    <section className="barra-pesquisa-wrap filtros-custom" style={{ marginTop: '20px', marginBottom: '32px' }}>
      <div className="barra-pesquisa container" style={{ padding: 0 }}>
        
        <div className="campo campo-busca">
          <label>Onde você procura?</label>
          <input
            type="text"
            placeholder="Bairro, cidade ou palavra-chave..."
            value={filtros.busca}
            onChange={(e) => upd("busca", e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Finalidade</label>
          <select value={filtros.finalidade} onChange={(e) => upd("finalidade", e.target.value)}>
            <option value="">Todas</option>
            <option value="Venda">Comprar</option>
            <option value="Aluguel">Alugar</option>
          </select>
        </div>

        <div className="campo">
          <label>Tipo</label>
          <select value={filtros.tipo} onChange={(e) => upd("tipo", e.target.value)}>
            <option value="">Todos</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>

        <div className="campo">
          <label>Quartos</label>
          <select value={filtros.quartos} onChange={(e) => upd("quartos", e.target.value)}>
            <option value="">Qualquer</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <button type="button" className="btn-pesquisar" style={{ visibility: 'hidden' }}>
          Buscar
        </button>

      </div>
    </section>
  );
}