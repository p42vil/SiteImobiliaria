import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import imoveis from "../data/imoveis.json";

const formatBRL = (v) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

export default function Carrossel() {
  const destaques = imoveis.filter((i) => i.destaque);

  if (destaques.length === 0) return null;

  return (
    <section className="carrossel-container">
      <div className="carrossel-swiper-wrapper">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop={destaques.length > 1}
          speed={800}
          className="carrossel-swiper"
        >
          {destaques.map((imovel) => (
            <SwiperSlide key={imovel.id}>
              <div
                className="slide"
                style={{ backgroundImage: `url(${imovel.imagens[0]})` }}
              >
                <div className="slide-overlay" />

                <div className="slide-card">
                  <span
                    className={`tag ${
                      imovel.finalidade === "Venda" ? "tag-venda" : "tag-aluguel"
                    }`}
                  >
                    {imovel.finalidade}
                  </span>
                  <h2>{imovel.titulo}</h2>
                  <p className="slide-local">
                    📍 {imovel.bairro}, {imovel.cidade}
                  </p>
                  <p className="slide-descricao">{imovel.descricao}</p>

                  <div className="slide-footer">
                    <span className="slide-preco">{formatBRL(imovel.preco)}</span>
                    <Link to={`/imovel/${imovel.id}`} className="btn-primary">
                      Ver detalhes →
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <aside className="introducao">
        <span className="introducao-eyebrow">Bem-vindo à</span>
        <h1>
          <span className="destaque">REVIUNE</span> Imobiliária
        </h1>
        <p className="introducao-texto">
          Compra, venda e locação de imóveis em São Paulo e região.
        </p>

        <ul className="introducao-beneficios">
          <li>✓ Consultoria completa</li>
          <li>✓ Assessoria jurídica</li>
          <li>✓ Melhores financiamentos</li>
        </ul>

        <div className="introducao-acoes">
          <Link to="/imoveis" className="btn-cta">
            Ver imóveis
          </Link>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            💬 Falar com corretor
          </a>
        </div>
      </aside>
    </section>
  );
}