import { useState } from "react";

export default function FAQ() {
  const perguntas = [
    {
      q: "Quais regiões vocês atendem?",
      a: "Atuamos em São Paulo capital e região metropolitana, incluindo ABC, Guarulhos e Osasco.",
    },
    {
      q: "Vocês cobram para avaliar meu imóvel?",
      a: "Não. A avaliação é gratuita e sem compromisso. Basta entrar em contato.",
    },
    {
      q: "Ajudam com financiamento bancário?",
      a: "Sim. Trabalhamos com os principais bancos e cuidamos de toda a documentação.",
    },
    {
      q: "Quanto tempo leva para vender um imóvel?",
      a: "Em média 60 a 90 dias, dependendo da região, valor e condições de mercado.",
    },
  ];

  const [aberta, setAberta] = useState(null);

  return (
    <section className="section faq">
      <div className="container">
        <h2 className="section-title">Perguntas frequentes</h2>
        <div className="faq-lista">
          {perguntas.map((p, i) => (
            <div
              key={i}
              className={`faq-item ${aberta === i ? "aberta" : ""}`}
              onClick={() => setAberta(aberta === i ? null : i)}
            >
              <div className="faq-pergunta">
                <span>{p.q}</span>
                <span className="faq-seta">{aberta === i ? "−" : "+"}</span>
              </div>
              {aberta === i && <p className="faq-resposta">{p.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}