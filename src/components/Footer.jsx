import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contato" className="footer">
      <div className="container footer-grid">
        <div>
          <h4>REVIUNE Imobiliária</h4>
          <p>CRECI: 000000-SP</p>
          <p>Atendimento de seg. a sex., 9h às 18h</p>
        </div>
        <div>
          <h4>Contato</h4>
          <p className="footer-info">
            <Phone size={18} className="icone" /> (11) 99999-9999
          </p>
          <p className="footer-info">
            <Mail size={18} className="icone" /> contato@reviuneimoveis.com.br
          </p>
        </div>
        <div>
          <h4>Endereço</h4>
          <p className="footer-info">
            <MapPin size={18} className="icone" /> Rua Exemplo, 123 — São Paulo/SP
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} REVIUNE Imobiliária. Todos os direitos reservados.
      </div>
    </footer>
  );
}