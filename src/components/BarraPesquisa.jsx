import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function BarraPesquisa() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    busca: "",
    finalidade: "",
    tipo: "",
    quartos: "",
  });

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([k, v]) => v && params.set(k, v));
    navigate(`/imoveis?${params.toString()}`);
  };

  return (
    <section className="barra-pesquisa-wrap">
      <form className="barra-pesquisa container" onSubmit={handleSubmit}>
        <div className="campo campo-busca">
          <label>Onde você procura?</label>
          <input
            type="text"
            placeholder="Bairro, cidade ou palavra-chave..."
            value={form.busca}
            onChange={(e) => upd("busca", e.target.value)}
          />
        </div>

        <div className="campo">
          <label>Finalidade</label>
          <select value={form.finalidade} onChange={(e) => upd("finalidade", e.target.value)}>
            <option value="">Todas</option>
            <option value="Venda">Comprar</option>
            <option value="Aluguel">Alugar</option>
          </select>
        </div>

        <div className="campo">
          <label>Tipo</label>
          <select value={form.tipo} onChange={(e) => upd("tipo", e.target.value)}>
            <option value="">Todos</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Casa">Casa</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>

        <div className="campo">
          <label>Quartos</label>
          <select value={form.quartos} onChange={(e) => upd("quartos", e.target.value)}>
            <option value="">Qualquer</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <button type="submit" className="btn-pesquisar" aria-label="Pesquisar">
          <Search size={18} strokeWidth={2.5} /> {/* 👈 Usando o componente */}
          Buscar
        </button>
      </form>
    </section>
  );
}