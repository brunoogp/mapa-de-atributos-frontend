// components/ui/LoadingOverlay.tsx
"use client";

import { useEffect, useState } from "react";

const frases = [
  "Analisando arquétipos compatíveis...",
  "Gerando diretrizes visuais...",
  "Traduzindo atributos em estratégias...",
  "Processando insights estratégicos...",
  "Finalizando diagnóstico...",
];

export default function LoadingOverlay() {
  const [fraseAtual, setFraseAtual] = useState(frases[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % frases.length);
      setFraseAtual(frases[(index + 1) % frases.length]);
    }, 2000);
    return () => clearInterval(intervalo);
  }, [index]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-gray-800">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 mb-6"></div>
      <p className="text-sm font-medium animate-pulse">{fraseAtual}</p>
    </div>
  );
}
