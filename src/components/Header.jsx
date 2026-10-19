import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <img src="/logo.png" alt=" " className="logo-img" />
          <span><strong>REVIUNE</strong> Imobiliária</span>      
        </Link>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/imoveis">Imóveis</Link>
          <a href="#contato">Contato</a>
        </nav>
      </div>
    </header>
  );
}