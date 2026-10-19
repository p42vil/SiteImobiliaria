export default function Diferenciais() {
  const itens = [
    {
      icone: "🏆",
      titulo: "Atendimento personalizado",
      texto: "Cada cliente é único. Ouvimos seu perfil e encontramos o imóvel ideal.",
    },
    {
      icone: "📋",
      titulo: "Assessoria completa",
      texto: "Cuidamos da documentação, financiamento e todo o processo burocrático.",
    },
    {
      icone: "🔒",
      titulo: "Negociação segura",
      texto: "Transparência total do início ao fim, com contratos revisados por especialistas.",
    },
  ];

  return (
    <section className="section diferenciais">
      <div className="container">
        <h2 className="section-title">Por que escolher a Reviume</h2>
        <div className="diferenciais-grid">
          {itens.map((i) => (
            <div key={i.titulo} className="diferencial-item">
              <span className="diferencial-icone">{i.icone}</span>
              <h3>{i.titulo}</h3>
              <p>{i.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}