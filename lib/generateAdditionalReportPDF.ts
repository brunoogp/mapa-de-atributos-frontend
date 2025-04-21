// utils/generateAdditionalReportPDF.ts
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function generateAdditionalReportPDF() {
  const element = document.getElementById("additionalReport");
  if (!element) {
    alert("Elemento do relatório adicional não encontrado.");
    return;
  }

  // Converte o elemento para canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });
  
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;
  
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  // Caso o conteúdo ultrapasse uma página, adicione novas páginas
  if (imgHeight > pageHeight) {
    let heightLeft = imgHeight - pageHeight;
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  }

  pdf.save("proposta-de-valor.pdf");
}
