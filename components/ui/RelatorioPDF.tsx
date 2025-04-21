// components/RelatorioPDF.tsx
import { Radar, Bar } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";

interface RelatorioPDFProps {
  brandSummary: string;
  archetype: any;
  archetypesChart: any[];
  attributes: any[];
  insights: string[];
  guidelines: any;
}

export default function RelatorioPDF({
  brandSummary,
  archetype,
  archetypesChart,
  attributes,
  insights,
  guidelines,
}: RelatorioPDFProps) {
  const archetypeData = {
    labels: archetypesChart?.map((a) => a.nome) ?? [],
    datasets: [
      {
        label: "% de Compatibilidade",
        data: archetypesChart?.map((a) => a.valor) ?? [],
        backgroundColor: "rgba(34,197,94,0.8)",
        borderRadius: 6,
      },
    ],
  };

  const radarData = {
    labels: attributes?.map((a) => a.atributo) ?? [],
    datasets: [
      {
        label: "Intensidade do Atributo",
        data: attributes?.map((a) => a.valor) ?? [],
        backgroundColor: "rgba(34,197,94,0.2)",
        borderColor: "rgba(34,197,94,1)",
        pointBackgroundColor: "rgba(34,197,94,1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="text-black bg-white p-10 space-y-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-2">Relatório Estratégico de Marca</h1>

      <section>
        <h2 className="text-lg font-semibold">Resumo da Marca</h2>
        <p className="text-sm leading-relaxed">{brandSummary}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Arquétipo Compatível</h2>
        <p className="text-sm font-bold">{archetype?.nome}</p>
        <p className="text-sm text-gray-700">{archetype?.descricao}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Compatibilidade entre Arquétipos</h2>
        <div style={{ height: "260px" }}>
          <Bar data={archetypeData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Radar de Atributos</h2>
        <div style={{ height: "300px" }}>
          <Radar data={radarData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Insights Estratégicos</h2>
        <ul className="list-disc pl-5 text-sm text-gray-800">
          {insights.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Diretrizes Visuais</h2>
        <ul className="text-sm list-disc pl-5">
          {guidelines?.visual?.cores?.map((c: string, i: number) => (
            <li key={i}>Cor sugerida: {c}</li>
          ))}
          {guidelines?.visual?.fontes?.map((f: string, i: number) => (
            <li key={i}>Fonte: {f}</li>
          ))}
          {guidelines?.visual?.ícones?.map((ic: string, i: number) => (
            <li key={i}>Ícone: {ic}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Diretrizes Verbais</h2>
        <p className="text-sm">Tom: {guidelines?.verbal?.tom}</p>
        <ul className="text-sm list-disc pl-5">
          {guidelines?.verbal?.palavras?.map((p: string, i: number) => (
            <li key={i}>Palavra-chave: {p}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Referência Simbólica</h2>
        <p className="text-sm">{guidelines?.simbolico?.referencia}</p>
      </section>
    </div>
  );
}
