import React from "react";

interface AdditionalReportProps {
  diagnosisData?: any;
}

const AdditionalReport: React.FC<AdditionalReportProps> = ({ diagnosisData }) => {
  // Extraia os dados do diagnóstico – adapte os nomes de propriedades conforme seu JSON
  const brandName = diagnosisData?.nome_marca || "Sua Marca";
  const summary = diagnosisData?.resumo || "";
  const archetype = diagnosisData?.arquetipo?.nome || "Desconhecido";
  const archetypeDescription = diagnosisData?.arquetipo?.descricao || "";
  const keyInsights = diagnosisData?.insights
    ? diagnosisData.insights.join(" ")
    : "";

  // Componha uma proposta de valor dinâmica
  const valueProposition = `A marca ${brandName} se destaca pelo arquétipo "${archetype}", que representa ${archetypeDescription}. Com base no diagnóstico, observa-se que: ${summary} ${keyInsights}. Essa combinação evidencia os diferenciais que a tornam única no mercado.`;
  
  // Componha um mini manifesto dinâmico (exemplo – ajuste conforme sua lógica de negócio)
  const miniManifesto = `Em um mundo onde cada detalhe importa, ${brandName} transforma seus desafios em oportunidades. Sua essência é refletida na combinação única de valores, insights e personalidade, criando uma identidade que inspira e define seu posicionamento no mercado.`;

  return (
    <div
      id="additionalReport"
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        color: "#000",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Proposta de Valor</h2>
      <p>{valueProposition}</p>
      <ul>
        <li>
          <strong>Slogan:</strong> Signifique. Diferencie.
        </li>
      </ul>
      <h3 style={{ marginTop: "1.5rem" }}>Mini Manifesto</h3>
      <p>{miniManifesto}</p>
    </div>
  );
};

export default AdditionalReport;
