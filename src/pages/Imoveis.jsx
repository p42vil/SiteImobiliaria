import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import imoveis from "../data/imoveis.json";
import ImovelCard from "../components/ImovelCard";
import Filtros from "../components/Filtros";

export default function Imoveis() {
  const [params] = useSearchParams();
  const [filtros, setFiltros] = useState({
    busca: "", finalidade: "", tipo: "", quartos: "",
  });

  useEffect(() => {
    setFiltros({
      busca: params.get("busca") || "",
      finalidade: params.get("finalidade") || "",
      tipo: params.get("tipo") || "",
      quartos: params.get("quartos") || "",
    });
  }, [params]);

  const lista = useMemo(() => {
    return imoveis.filter((i) => {
      const b = filtros.busca.toLowerCase();
      const matchBusca =
        !b ||
        i.titulo.toLowerCase().includes(b) ||
        i.bairro.toLowerCase().includes(b) ||
        i.cidade.toLowerCase().includes(b);
      const matchFin = !filtros.finalidade || i.finalidade === filtros.finalidade;
      const matchTipo = !filtros.tipo || i.tipo === filtros.tipo;
      const matchQ = !filtros.quartos || i.quartos >= Number(filtros.quartos);
      return matchBusca && matchFin && matchTipo && matchQ;
    });
  }, [filtros]);

  return (
    <section className="container section" style={{ paddingTop: "30px" }}>
      <h2 className="section-title">Nossos imóveis</h2>
      <Filtros filtros={filtros} setFiltros={setFiltros} />
      {lista.length === 0 ? (
        <p className="vazio">Nenhum imóvel encontrado com esses filtros.</p>
      ) : (
        <div className="grid">
          {lista.map((i) => (
            <ImovelCard key={i.id} imovel={i} />
          ))}
        </div>
      )}
    </section>
  );
}