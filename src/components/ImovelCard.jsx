import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Car, Maximize } from "lucide-react";

const formatBRL = (v) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

export default function ImovelCard({ imovel }) {
  return (
    <Link to={`/imovel/${imovel.id}`} className="card">
      <div className="card-img">
        <img src={imovel.imagens[0]} alt={imovel.titulo} loading="lazy" />
        <span className={`tag ${imovel.finalidade === "Venda" ? "tag-venda" : "tag-aluguel"}`}>
          {imovel.finalidade}
        </span>
      </div>
      <div className="card-body">
        <h3>{imovel.titulo}</h3>
        <p className="local"><MapPin size={14} className="icone-inline" /> {imovel.bairro}, {imovel.cidade}</p>
        <div className="carac">
          <span><Bed size={14} className="icone-inline" /> {imovel.quartos}</span>
          <span><Bath size={14} className="icone-inline" /> {imovel.banheiros}</span>
          <span><Car size={14} className="icone-inline" /> {imovel.vagas}</span>
          <span><Maximize size={14} className="icone-inline" /> {imovel.area}m²</span>
        </div>
        <p className="preco">{formatBRL(imovel.preco)}</p>
      </div>
    </Link>
  );
}