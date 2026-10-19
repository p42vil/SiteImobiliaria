import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Imoveis from "./pages/Imoveis";
import ImovelDetalhe from "./pages/ImovelDetalhe";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/imoveis" element={<Imoveis />} />
          <Route path="/imovel/:id" element={<ImovelDetalhe />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}