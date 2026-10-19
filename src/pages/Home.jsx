import { Link } from "react-router-dom";
import imoveis from "../data/imoveis.json";
import ImovelCard from "../components/ImovelCard";
import Carrossel from "../components/Carrossel";
import BarraPesquisa from "../components/BarraPesquisa";
import Credenciais from "../components/Credenciais";
import CTAAnuncie from "../components/CTAAnuncie";
import FAQ from "../components/FAQ";
import Diferenciais from "../components/Diferenciais";

export default function Home() {
  const destaques = imoveis.filter((i) => i.destaque).slice(0, 3);
  const lista = destaques.length ? destaques : imoveis.slice(0, 3);

  return (
    <>
      <Carrossel />
      <Credenciais />
      <BarraPesquisa />

      <section className="container section">
        <h2 className="section-title">Imóveis em destaque</h2>
        <div className="grid">
          {lista.map((i) => (
            <ImovelCard key={i.id} imovel={i} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link to="/imoveis" className="btn-primary">
            Ver todos os imóveis
          </Link>
        </div>
      </section>
      
      <Diferenciais />
      <CTAAnuncie />
      <FAQ />
    </>
  );
}