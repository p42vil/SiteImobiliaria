import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import imoveis from "../data/imoveis.json";
import ImovelCard from "../components/ImovelCard";
import { 
  MapPin, Bed, Bath, Car, Maximize, 
  ChevronLeft, ChevronRight, X, Check,
  Waves, Dumbbell, Flame, Utensils, PartyPopper, 
  Baby, Trees, Leaf, Dog, Armchair, Snowflake, 
  ArrowUpCircle, Shield, Fence, DoorClosed, Wine, 
  Bot, ArrowUpToLine, Ruler, Building2, TrainFront, 
  Hammer, Sun, Tv, Lock, LayoutPanelTop, Zap, Wind
} from "lucide-react";

const formatBRL = (v) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

const IconeComodidade = ({ nome, size = 18 }) => {
  const props = { size, strokeWidth: 2 };
  switch (nome) {
    case "Piscina": case "Piscina Privativa": return <Waves {...props} />;
    case "Academia": return <Dumbbell {...props} />;
    case "Churrasqueira": return <Flame {...props} />;
    case "Espaço Gourmet": case "Varanda Gourmet": return <Utensils {...props} />;
    case "Salão de Festas": return <PartyPopper {...props} />;
    case "Playground": case "Espaço Kids": return <Baby {...props} />;
    case "Jardim": case "Jardim Privativo": return <Trees {...props} />;
    case "Área Verde": case "Vista para o Parque": return <Leaf {...props} />;
    case "Pet Friendly": return <Dog {...props} />;
    case "Mobiliado": return <Armchair {...props} />;
    case "Ar Condicionado": return <Snowflake {...props} />;
    case "Elevador": return <ArrowUpCircle {...props} />;
    case "Portaria 24h": case "Segurança 24h": return <Shield {...props} />;
    case "Condomínio Fechado": return <Fence {...props} />;
    case "Suíte": return <DoorClosed {...props} />;
    case "Lareira": return <Flame {...props} />;
    case "Home Theater": return <Tv {...props} />;
    case "Adega Climatizada": return <Wine {...props} />;
    case "Automação": return <Bot {...props} />;
    case "Mezanino": return <ArrowUpToLine {...props} />;
    case "Pé-direito duplo": return <Maximize {...props} />;
    case "Vista Panorâmica": case "Vista 360°": case "Vista para o Vale": case "Vista para o Mar": return <Sun {...props} />;
    case "Próximo ao metrô": return <TrainFront {...props} />;
    case "Reformado": return <Hammer {...props} />;
    case "Varanda": case "Varanda Integrada": return <Wind {...props} />;
    case "Terraço Gourmet": return <Utensils {...props} />;
    case "Automação": return <Zap {...props} />;
    default: return <Check {...props} />;
  }
};

const todasComodidades = [
  { nome: "Piscina", icone: "🏊" },
  { nome: "Academia", icone: "🏋️" },
  { nome: "Churrasqueira", icone: "🍖" },
  { nome: "Espaço Gourmet", icone: "🍽️" },
  { nome: "Varanda Gourmet", icone: "🍽️" },
  { nome: "Salão de Festas", icone: "🎉" },
  { nome: "Playground", icone: "🎠" },
  { nome: "Jardim", icone: "🌳" },
  { nome: "Área Verde", icone: "🌿" },
  { nome: "Pet Friendly", icone: "🐶" },
  { nome: "Mobiliado", icone: "🛋️" },
  { nome: "Ar Condicionado", icone: "❄️" },
  { nome: "Elevador", icone: "🛗" },
  { nome: "Portaria 24h", icone: "🛡️" },
  { nome: "Segurança 24h", icone: "🛡️" },
  { nome: "Condomínio Fechado", icone: "🏘️" },
  { nome: "Suíte", icone: "🛏️" },
  { nome: "Lareira", icone: "🔥" },
  { nome: "Home Theater", icone: "🎬" },
  { nome: "Adega Climatizada", icone: "🍷" },
  { nome: "Automação", icone: "🤖" },
  { nome: "Mezanino", icone: "🪜" },
  { nome: "Pé-direito duplo", icone: "📐" },
  { nome: "Vista Panorâmica", icone: "🌇" },
  { nome: "Próximo ao metrô", icone: "🚇" },
  { nome: "Reformado", icone: "🔨" },
  { nome: "Varanda", icone: "🌅" },
];

export default function ImovelDetalhe() {
  const { id } = useParams();
  const imovel = imoveis.find((i) => i.id === Number(id));
  
  const [indiceAtivo, setIndiceAtivo] = useState(null);
  const [indiceCarrosselMobile, setIndiceCarrosselMobile] = useState(0);
  const carrosselRef = useRef(null);

  const scrollParaImagem = (index) => {
    if (carrosselRef.current) {
      const container = carrosselRef.current;
      const item = container.children[index];
      if (item) {
        container.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
        setIndiceCarrosselMobile(index);
      }
    }
  };

  const handleScroll = () => {
    if (carrosselRef.current) {
      const container = carrosselRef.current;
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.children[0]?.clientWidth || 1;
      const newIndex = Math.round(scrollPosition / itemWidth);
      if (newIndex !== indiceCarrosselMobile && newIndex >= 0) {
        setIndiceCarrosselMobile(newIndex);
      }
    }
  };

  if (!imovel) {
    return (
      <div className="container section">
        <p>Imóvel não encontrado. <Link to="/imoveis" style={{ color: "var(--primary)", fontWeight: 600 }}>Voltar</Link></p>
      </div>
    );
  }

  const todasAsImagens = imovel.imagens || [];
  const imagensGaleriaPrincipal = todasAsImagens.slice(0, 5);
  const qtdImagensPrincipal = imagensGaleriaPrincipal.length || 1;
  const imagensExtras = todasAsImagens.slice(5);
  const comodidadesDoImovel = imovel.comodidades || [];

  const semelhantes = imoveis
    .filter((i) => i.id !== imovel.id && i.cidade === imovel.cidade)
    .slice(0, 3);

  const proximaImagem = (e) => {
    e.stopPropagation();
    setIndiceAtivo((prev) => (prev === todasAsImagens.length - 1 ? 0 : prev + 1));
  };

  const imagemAnterior = (e) => {
    e.stopPropagation();
    setIndiceAtivo((prev) => (prev === 0 ? todasAsImagens.length - 1 : prev - 1));
  };

  return (
    <section className="container section detalhe">
      <Link to="/imoveis" className="voltar">← Voltar</Link>

      <div className="detalhe-grid">
        <div className="galeria-wrapper">
          <div 
            className={`galeria-grid galeria-${qtdImagensPrincipal}`}
            ref={carrosselRef}
            onScroll={handleScroll}
          >
            {imagensGaleriaPrincipal.length > 0 ? (
              imagensGaleriaPrincipal.map((img, idx) => (
                <div className="foto-container" key={idx} onClick={() => setIndiceAtivo(idx)}>
                  <img src={img} alt={`${imovel.titulo} - Foto ${idx + 1}`} />
                  <span className="foto-numero">{idx + 1}</span>
                </div>
              ))
            ) : (
              <div className="galeria-sem-foto">Sem imagens disponíveis</div>
            )}
          </div>

          {imagensGaleriaPrincipal.length > 1 && (
            <div className="carrossel-controles">
              <button className="carrossel-btn prev" onClick={() => scrollParaImagem(Math.max(0, indiceCarrosselMobile - 1))} disabled={indiceCarrosselMobile === 0}>
                <ChevronLeft size={20} />
              </button>
              <div className="carrossel-bolinhas">
                {imagensGaleriaPrincipal.map((_, i) => (
                  <button key={i} className={`bolinha ${i === indiceCarrosselMobile ? 'ativa' : ''}`} onClick={() => scrollParaImagem(i)} />
                ))}
              </div>
              <button className="carrossel-btn next" onClick={() => scrollParaImagem(Math.min(imagensGaleriaPrincipal.length - 1, indiceCarrosselMobile + 1))} disabled={indiceCarrosselMobile === imagensGaleriaPrincipal.length - 1}>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="detalhe-info">
          <span className={`tag ${imovel.finalidade === "Venda" ? "tag-venda" : "tag-aluguel"}`}>
            {imovel.finalidade}
          </span>
          <h1>{imovel.titulo}</h1>
          <p className="local"><MapPin size={16} className="icone-inline" /> {imovel.bairro}, {imovel.cidade}</p>
          <p className="preco-grande">{formatBRL(imovel.preco)}</p>

          <div className="carac carac-grande">
            <span><Bed size={18} className="icone-inline" /> {imovel.quartos} quartos</span>
            <span><Bath size={18} className="icone-inline" /> {imovel.banheiros} banheiros</span>
            <span><Car size={18} className="icone-inline" /> {imovel.vagas} vagas</span>
            <span><Maximize size={18} className="icone-inline" /> {imovel.area} m²</span>
          </div>

          <h3>Descrição</h3>
          <p>{imovel.descricao}</p>

          <a
            className="btn-primary"
            href={`https://wa.me/5511999999999?text=${encodeURIComponent(`Olá! Tenho interesse no imóvel: ${imovel.titulo}`)}`}
            target="_blank" rel="noreferrer"
            style={{ marginTop: "10px", textAlign: "center" }}
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {imagensExtras.length > 0 && (
        <div className="detalhe-secao">
          <h2 className="section-title">Mais fotos do imóvel</h2>
          <div className="galeria-extra-grid">
            {imagensExtras.map((img, idx) => (
              <div className="foto-container" key={idx + 5} onClick={() => setIndiceAtivo(idx + 5)}>
                <img src={img} alt={`${imovel.titulo} - Foto ${idx + 6}`} />
                <span className="foto-numero">{idx + 6}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="detalhe-secao">
        <h2 className="section-title">Comodidades</h2>
        <div className="comodidades-grid">
          {todasComodidades.map((item, i) => {
            const possui = comodidadesDoImovel.includes(item.nome);
            return (
              <div key={i} className={`comodidade-item ${possui ? "possui" : "nao-possui"}`}>
                <IconeComodidade nome={item.nome} />
                <p>{item.nome}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="detalhe-secao">
        <h2 className="section-title">Localização</h2>
        <div className="mapa-container">
          <iframe
            className="mapa-iframe"
            title={`Mapa de ${imovel.bairro}, ${imovel.cidade}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(`${imovel.bairro}, ${imovel.cidade}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {semelhantes.length > 0 && (
        <div className="detalhe-secao">
          <h2 className="section-title">Imóveis Semelhantes</h2>
          <div className="grid">
            {semelhantes.map((item) => (
              <ImovelCard key={item.id} imovel={item} />
            ))}
          </div>
        </div>
      )}

      {indiceAtivo !== null && (
        <div className="lightbox-overlay" onClick={() => setIndiceAtivo(null)}>
          <button className="lightbox-close" onClick={() => setIndiceAtivo(null)}>
            <X size={24} />
          </button>
          <div className="lightbox-contador">{indiceAtivo + 1} / {todasAsImagens.length}</div>
          
          {todasAsImagens.length > 1 && (
            <button className="lightbox-btn prev" onClick={imagemAnterior}>
              <ChevronLeft size={28} />
            </button>
          )}
          
          <img 
            src={todasAsImagens[indiceAtivo]} 
            alt={`Visualização ${indiceAtivo + 1}`} 
            className="lightbox-img" 
            onClick={(e) => e.stopPropagation()}
          />
          
          {todasAsImagens.length > 1 && (
            <button className="lightbox-btn next" onClick={proximaImagem}>
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </section>
  );
}