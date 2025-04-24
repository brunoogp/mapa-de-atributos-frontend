// @ts-nocheck
"use client";

import { Radar, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
  LinearScaleOptions,
  CategoryScaleOptions,
} from "chart.js";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RelatorioPDFExport from "@/components/ui/RelatorioPDFExport";
import AdditionalReport from "@/components/AdditionalReport";

// ────────────────────────────────────────────────────────────────────
// Registro dos componentes Chart.js
// ────────────────────────────────────────────────────────────────────
ChartJS.register(
  RadialLinearScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend
);

export default function ReportPage() {
  const [brandSummary, setBrandSummary] = useState("");
  const [archetype, setArchetype] = useState<any>(null);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [guidelines, setGuidelines] = useState<any>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [archetypesChart, setArchetypesChart] = useState<any[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [showAdditionalReport, setShowAdditionalReport] = useState(false);

  const pdfRef = useRef<HTMLDivElement>(null);

  // ── Override de estilos problemáticos (exportação PDF)
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      .export-pdf-mode * {
        color: #000000 !important;
        background-color: #ffffff !important;
        border-color: #dddddd !important;
      }
      .export-pdf-mode .text-muted-foreground { color: #666666 !important; }
      .export-pdf-mode .bg-muted            { background-color: #f5f5f5 !important; }
    `;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  // ── Busca de dados do diagnóstico (localStorage → API)
  useEffect(() => {
    const rawBriefing = localStorage.getItem("briefing");
    const rawAtributos = localStorage.getItem("atributosSelecionados");
    if (!rawBriefing || !rawAtributos) return;

    const briefingData = JSON.parse(rawBriefing);
    const atributosSelecionados = JSON.parse(rawAtributos);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/diagnostico/briefing-direto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...briefingData,
        atributos_selecionados: atributosSelecionados,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBrandSummary(data.resumo);
        setAttributes(data.atributos);
        setArchetype(data.arquetipo);
        setArchetypesChart(data.grafico_arquetipos);
        setGuidelines(data.diretrizes);
        setInsights(data.insights);
        localStorage.setItem("diagnostico", JSON.stringify(data));
      })
      .catch((err) => console.error("Erro ao gerar diagnóstico:", err));
  }, []);

  // ── Exportação PDF
  const exportarPDF = async () => {
    if (!pdfRef.current || isExporting) return;
    setIsExporting(true);
    try {
      document.documentElement.classList.add("export-pdf-mode");
      const [{ default: jsPDF }, { default: html2Canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const element = pdfRef.current;
      const clone = element.cloneNode(true) as HTMLElement;

      // Limpa cores em oklch
      const cleanNode = (node: HTMLElement) => {
        ["backgroundColor", "color", "borderColor"].forEach((prop) => {
          // @ts-ignore
          if (node.style[prop]?.includes("oklch")) node.style[prop] = "";
        });
        Array.from(node.children).forEach((n) => cleanNode(n as HTMLElement));
      };
      cleanNode(clone);

      clone.style.position = "absolute";
      clone.style.top = "-9999px";
      document.body.appendChild(clone);

      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2Canvas(clone, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      document.body.removeChild(clone);

      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("relatorio-marca.pdf");
    } catch (e) {
      console.error("Erro ao exportar PDF:", e);
      alert("Houve um erro ao exportar o PDF. Tente novamente.");
    } finally {
      document.documentElement.classList.remove("export-pdf-mode");
      setIsExporting(false);
    }
  };

  // ── Dados para gráficos
  const archetypeData = {
    labels: archetypesChart?.map((a: any) => a.nome) ?? [],
    datasets: [
      {
        label: "% de Compatibilidade",
        data: archetypesChart?.map((a: any) => a.valor) ?? [],
        backgroundColor:
          archetypesChart?.map((a: any) =>
            a.nome === archetype?.nome
              ? "rgba(34,197,94,0.8)"
              : "rgba(203,213,225,0.6)"
          ) ?? [],
        borderRadius: 6,
      },
    ],
  };

 // ─────────────────────────────────────────────
//  Opções do gráfico de barras (corrigido)
// ─────────────────────────────────────────────
const archetypeOptions = {
  indexAxis: "y",            // eixo dos rótulos
  scales: {
    x: {
      type: "linear",
      min: 0,
      max: 100,
      ticks: { color: "#334155" },
      grid:  { color: "#e2e8f0" },
    },
    y: {
      ticks: { color: "#334155" },
      grid:  { color: "#f1f5f9" },
    },
  },
  plugins: { legend: { display: false } },
  responsive: true,
  maintainAspectRatio: false,
} as any;                     //  ← força o TypeScript a aceitar


  const radarData = {
    labels: attributes?.map((a: any) => a.atributo) ?? [],
    datasets: [
      {
        label: "Intensidade do Atributo",
        data: attributes?.map((a: any) => a.valor) ?? [],
        backgroundColor: "rgba(34,197,94,0.2)",
        borderColor: "rgba(34,197,94,1)",
        pointBackgroundColor: "rgba(34,197,94,1)",
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: { stepSize: 2, color: "#64748b" },
        pointLabels: { color: "#334155", font: { size: 12 } },
        grid: { color: "#cbd5e1" },
      },
    },
    plugins: { legend: { labels: { color: "#334155" } } },
    responsive: true,
    maintainAspectRatio: false,
  };

  // ── Mensagens de loading
  const frasesLoading = [
    "Preparando sua análise estratégica...",
    "Interpretando arquétipos e atributos...",
    "Refinando as diretrizes da sua marca...",
    "Entendendo o cenário atual da sua empresa...",
    "Finalizando o diagnóstico completo...",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % frasesLoading.length),
      2500
    );
    return () => clearInterval(id);
  }, []);

  if (!brandSummary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 py-10">
        <div className="text-center space-y-4 animate-pulse">
          <div className="text-xl md:text-2xl font-semibold tracking-tight">
            {frasesLoading[index]}
          </div>
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-primary animate-pulse rounded-full w-2/3" />
          </div>
          <p className="text-sm text-muted-foreground">
            Isso pode levar alguns segundos...
          </p>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────
  // JSX de retorno (sem alterações estruturais)
  // ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <header className="flex items-center justify-center mb-8">
        <h1 className="text-4xl font-bold">A.R.Q</h1>
      </header>

      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Painel Estratégico de Marca</h1>
            <p className="text-muted-foreground text-sm">
              Diagnóstico interativo com base no briefing da sua marca
            </p>
          </div>
          <Button variant="outline" onClick={exportarPDF} disabled={isExporting}>
            {isExporting ? "Gerando PDF..." : "📄 Exportar PDF"}
          </Button>
        </header>

        {/* Elemento invisível para captura PDF */}
        <div
          ref={pdfRef}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "2rem",
            position: "absolute",
            top: "-9999px",
            left: "0",
            width: "800px",
          }}
        >
          <RelatorioPDFExport
            brandSummary={brandSummary}
            archetype={archetype}
            archetypesChart={archetypesChart}
            attributes={attributes}
            insights={insights}
            guidelines={guidelines}
          />
        </div>

        {/* Resumo + Arquétipo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Resumo da Marca</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {brandSummary}
              </p>
            </CardContent>
          </Card>

          {/* Card do Arquétipo com modal detalhado */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:bg-muted transition">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">Arquétipo Compatível</h2>
                  <Badge variant="default" className="text-sm px-3 py-1 rounded-full">
                    {archetype?.nome}
                  </Badge>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {archetype?.descricao}
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{archetype?.nome}</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground mb-2">
                {archetype?.descricao}
              </p>
              {archetype?.exemplos && (
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Marcas:</span>{" "}
                  {archetype.exemplos.join(", ")}
                </p>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Gráfico de Arquétipos */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Compatibilidade entre Arquétipos
            </h2>
            <div className="h-[280px]">
             <Bar data={archetypeData as any} options={archetypeOptions as any} />
            </div>
          </CardContent>
        </Card>

        {/* Radar + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Radar de Atributos
              </h2>
              <div className="h-[360px]">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-3">
              <h2 className="text-xl font-semibold">Insights Estratégicos</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {insights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Diretrizes */}
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="verbal">Verbal</TabsTrigger>
            <TabsTrigger value="simbolico">Simbólico</TabsTrigger>
          </TabsList>
          <TabsContent value="visual">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-2">
                  Diretrizes Visuais
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {guidelines?.visual}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="verbal">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-2">
                  Diretrizes Verbais
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {guidelines?.verbal}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="simbolico">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-2">
                  Referência Simbólica
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {guidelines?.simbolico}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
