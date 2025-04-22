// app/etapa2/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import LoadingOverlay from "@/components/ui/LoadingOverlay";

export default function FormularioEtapa2() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const frases = [
    "Analisando os atributos da sua marca...",
    "Ajustando o radar estratégico...",
    "Buscando referências nos arquétipos...",
    "Gerando seu diagnóstico personalizado..."
  ];
  const [fraseIndex, setFraseIndex] = useState(0);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    empresa: "",
    site: "",
    localizacao: "",
    segmento: "",
    tempoExistencia: "",
    temIdentidade: false,
    canais: "",
    descricaoMarca: "",
    mensagemMarca: "",
    valores: "",
    percepcao: "",
    publicoIdeal: "",
    transformacao: "",
    concorrentes: "",
    diferencial: "",
    objetivo: "",
    receberResumo: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const totalSteps = 3;
  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsLoading(true);

    // Roda as frases a cada 2.5s
    const interval = setInterval(() => {
      setFraseIndex((prev) => (prev + 1) % frases.length);
    }, 2500);

    try {
      const payload = {
        nome: form.nome,
        email: form.email,
        nome_marca: form.empresa || "Marca sem nome",
        site: form.site,
        localizacao: form.localizacao,
        segmento: form.segmento,
        tempoExistencia: form.tempoExistencia,
        temIdentidade: form.temIdentidade,
        canais: form.canais,
        descricao_marca: form.descricaoMarca || "Sem descrição fornecida.",
        mensagemMarca: form.mensagemMarca,
        valores: form.valores,
        percepcao: form.percepcao,
        publicoIdeal: form.publicoIdeal,
        transformacao: form.transformacao,
        concorrentes: form.concorrentes,
        diferencial: form.diferencial,
        objetivo: form.objetivo,
        atributos_selecionados: ["Afetiva", "Natural", "Acolhedora"],
        receberResumo: form.receberResumo,
      };

      const res = await fetch("http://localhost:8000/diagnostico/briefing-direto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data) {
        localStorage.setItem("briefing", JSON.stringify(payload));
        router.push("/etapa3");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      clearInterval(interval);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      {isLoading && (
        <LoadingOverlay />
      )}

      <div className="max-w-2xl mx-auto space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight leading-tight">Formulário Estratégico</h1>
          <p className="text-muted-foreground text-sm">
            Etapa {step} de {totalSteps} — Vamos entender melhor sua marca para gerar um diagnóstico completo.
          </p>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Identificação da Marca</h2>
            <Input placeholder="Seu nome" name="nome" value={form.nome} onChange={handleChange} />
            <Input placeholder="Email para contato" name="email" value={form.email} onChange={handleChange} />
            <Input placeholder="Nome da empresa" name="empresa" value={form.empresa} onChange={handleChange} />
            <Input placeholder="Site ou Instagram" name="site" value={form.site} onChange={handleChange} />
            <Input placeholder="Localização (Cidade/País)" name="localizacao" value={form.localizacao} onChange={handleChange} />
            <Input placeholder="Segmento de atuação" name="segmento" value={form.segmento} onChange={handleChange} />
            <Input placeholder="Tempo de existência da marca" name="tempoExistencia" value={form.tempoExistencia} onChange={handleChange} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Presença e Identidade</h2>
            <div className="flex items-center justify-between">
              <label className="text-sm">Possui identidade visual ou verbal?</label>
              <Switch checked={form.temIdentidade} onCheckedChange={(v) => setForm({ ...form, temIdentidade: v })} />
            </div>
            <Input placeholder="Canais onde a marca está presente (ex: Instagram, loja física...)" name="canais" value={form.canais} onChange={handleChange} />
            <Textarea placeholder="Descreva sua marca: o que faz, para quem e como faz." name="descricaoMarca" value={form.descricaoMarca} onChange={handleChange} />
            <Textarea placeholder="O que sua marca deseja transmitir ao público?" name="mensagemMarca" value={form.mensagemMarca} onChange={handleChange} />
            <Textarea placeholder="Quais valores são mais importantes para sua marca?" name="valores" value={form.valores} onChange={handleChange} />
            <Textarea placeholder="Como deseja ser percebida nos próximos 12 meses?" name="percepcao" value={form.percepcao} onChange={handleChange} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-semibold text-xl">Público, Posicionamento e Objetivos</h2>
            <Textarea placeholder="Quem é o cliente ideal? Idade, interesses, problemas..." name="publicoIdeal" value={form.publicoIdeal} onChange={handleChange} />
            <Textarea placeholder="Qual a transformação ou benefício principal que sua marca entrega?" name="transformacao" value={form.transformacao} onChange={handleChange} />
            <Textarea placeholder="Cite 1 a 3 concorrentes diretos" name="concorrentes" value={form.concorrentes} onChange={handleChange} />
            <Textarea placeholder="O que diferencia sua marca dos concorrentes?" name="diferencial" value={form.diferencial} onChange={handleChange} />
            <Textarea placeholder="O que você espera melhorar com esse diagnóstico?" name="objetivo" value={form.objetivo} onChange={handleChange} />
            <div className="flex items-center justify-between">
              <label className="text-sm">Deseja receber o resumo por e-mail?</label>
              <Switch checked={form.receberResumo} onCheckedChange={(v) => setForm({ ...form, receberResumo: v })} />
            </div>
          </div>
        )}

        <div className="flex justify-between gap-4">
          <Button variant="ghost" onClick={step === 1 ? () => router.push("/") : prevStep}>Voltar</Button>
          {step === totalSteps ? (
            <Button onClick={handleSubmit}>Avançar para Resultado</Button>
          ) : (
            <Button onClick={nextStep}>Próximo</Button>
          )}
        </div>
      </div>
    </div>
  );
}
