"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TelaInicial() {
  const router = useRouter();
  const [mensagem, setMensagem] = useState("");
  const texto = "Junte-se à comunidade.";

  useEffect(() => {
    let i = 0;
    const intervalo = setInterval(() => {
      setMensagem((prev) => prev + texto[i]);
      i++;
      if (i >= texto.length) clearInterval(intervalo);
    }, 50);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-black/10">
        <div className="text-xl font-bold tracking-tight">A.R.Q</div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-black/80">
          <a href="#faq" className="hover:text-black transition">FAQ</a>
          <a href="#tutorial" className="hover:text-black transition">Tutorial</a>
          <a href="#footer" className="hover:text-black transition">Contato</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Mapa de Personalidade de Marca
        </h1>
        <p className="text-lg md:text-xl text-black/70 max-w-xl mb-6">
        Bem-vindo ao começo da sua diferenciação. Você vai descobrir o que move sua marca – e como expressar isso com potência.
        </p>
        <div className="flex gap-4 mb-10">
          <Button size="lg" onClick={() => router.push("/etapa1")} className="text-base">
            Começar Diagnóstico <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" className="text-base" onClick={() => {
            const el = document.getElementById("tutorial");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}>
            <PlayCircle className="w-4 h-4 mr-2" /> Ver demonstração
          </Button>
        </div>

        {/* Imagem estática principal */}
        <div className="w-full max-w-6xl aspect-video relative rounded-xl overflow-hidden border border-black/10 shadow-xl mb-8">
          <Image 
            src="/screenshot-arq.png"
            alt="Imagem da ferramenta"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        {/* Título + GIF demonstrativo */}
        <div className="text-left w-full max-w-6xl px-4 md:px-0 mb-6">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Prático e Intuitivo
          </h2>
        </div>
        <div className="w-full max-w-6xl aspect-video relative rounded-xl overflow-hidden border border-black/10 shadow-xl mb-10">
          <Image 
            src="/demo.gif"
            alt="Demonstração da ferramenta"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </section>

      {/* Tutorial em vídeo */}
      <section id="tutorial" className="px-6 py-24 border-t border-black/10">
        <div className="max-w-6xl mx-auto text-left">
          <h2 className="text-5xl font-bold mb-6">Tutorial Rápido</h2>
          <p className="text-black/70 text-base mb-8">
            Aprenda em 1 minuto como preencher o briefing e interpretar o seu diagnóstico estratégico.
          </p>
          <div className="aspect-video rounded-xl overflow-hidden border border-black/10 shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/watch?v=0py4egiTDiE"
              title="Tutorial ARQ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-24 border-t border-black/10 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Perguntas Frequentes</h2>
        <div className="space-y-4">
          <details className="border border-black/10 rounded-lg px-4 py-3">
            <summary className="cursor-pointer font-semibold">O que é um arquétipo de marca?</summary>
            <p className="mt-2 text-sm text-black/70">
              Arquétipos são padrões universais de comportamento usados para dar personalidade à sua marca.
            </p>
          </details>
          <details className="border border-black/10 rounded-lg px-4 py-3">
            <summary className="cursor-pointer font-semibold">Quantos atributos posso selecionar?</summary>
            <p className="mt-2 text-sm text-black/70">
              De 10 a 15 atributos. Eles ajudam o sistema a entender o posicionamento da sua marca.
            </p>
          </details>
          <details className="border border-black/10 rounded-lg px-4 py-3">
            <summary className="cursor-pointer font-semibold">Posso usar esse diagnóstico com clientes?</summary>
            <p className="mt-2 text-sm text-black/70">
              Sim! A ferramenta foi feita tanto para empreendedores quanto para profissionais de branding.
            </p>
          </details>
        </div>
      </section>

      {/* Comunidade WhatsApp */}
      <section className="px-6 py-24 border-t border-black/10 text-center bg-white text-black">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-6 shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Entre para a Comunidade</h2>
          <p className="text-lg text-black/80 mb-2 h-6 min-h-[1.5rem]">
            {mensagem}
          </p>
          <Button size="lg" onClick={() => window.open("https://chat.whatsapp.com/seu-link-aqui", "_blank")}
            className="text-base">
            Acessar Grupo do WhatsApp
          </Button>
        </div>
      </section>

      {/* Rodapé */}
      <footer
        id="footer"
        className="border-t border-black/10 py-6 px-6 flex flex-col md:flex-row justify-between items-center text-xs text-black/50"
      >
        <span>© {new Date().getFullYear()} ARQ – Mapa de Atributos</span>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-black transition">Termos de Uso</a>
          <a href="#" className="hover:text-black transition">Política de Privacidade</a>
          <a href="#" className="hover:text-black transition">Contato</a>
        </div>
      </footer>
    </div>
  );
}