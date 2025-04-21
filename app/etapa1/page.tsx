"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { atributos } from "@/app/data/atributos";
import {
  BadgeCheck,
  Info,
  Lightbulb,
  Palette,
  Quote,
  Tag,
} from "lucide-react";

// Categorias que aparecem nas abas
const categorias = [
  "Funcionais",
  "Emocionais",
  "Personalidade",
  "Diferenciadores",
  "Sensoriais",
  "Associativos",
  "Promessa",
];

// Mapeamento correto para fazer a correspondência entre a aba e a propriedade "categoria"
const nomeCategoriaParaChave = {
  Funcionais: "Funcional",
  Emocionais: "Emocional",
  Personalidade: "Personalidade",
  Diferenciadores: "Diferenciador",
  Sensoriais: "Sensorial",
  Associativos: "Associativo",
  Promessa: "Promessa",
};

// Agrupando atributos reais por categoria
const atributosReais: Record<string, any[]> = categorias.reduce((acc, cat) => {
  const chave = nomeCategoriaParaChave[cat as keyof typeof nomeCategoriaParaChave];
  acc[cat] = atributos.filter((a) => a.categoria === chave);
  return acc;
}, {} as Record<string, any[]>);

export default function Home() {
  const router = useRouter();
  const [categoriaAtual, setCategoriaAtual] = useState("Funcionais");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [detalhe, setDetalhe] = useState<any | null>(null);

    // Limpa os atributos salvos quando a Etapa 1 é carregada
    useEffect(() => {
      localStorage.removeItem("atributosSelecionados");
    }, []);
  

  // Carrega os atributos salvos no localStorage
  useEffect(() => {
    const salvos = localStorage.getItem("atributosSelecionados");
    if (salvos) {
      setSelecionados(JSON.parse(salvos));
    }
  }, []);

  // Salva os selecionados
  useEffect(() => {
    localStorage.setItem("atributosSelecionados", JSON.stringify(selecionados));
  }, [selecionados]);

  const toggleAtributo = (nome: string) => {
    if (selecionados.includes(nome)) {
      setSelecionados(selecionados.filter((a) => a !== nome));
    } else if (selecionados.length < 15) {
      setSelecionados([...selecionados, nome]);
    }
    setDetalhe(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Mapa de Atributos</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Selecione de 10 a 15 atributos que representam sua marca
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Selecionados: <span className="font-semibold">{selecionados.length}/15</span>
          </div>
        </div>

        <Tabs defaultValue="Funcionais" onValueChange={setCategoriaAtual}>
          <TabsList className="grid grid-cols-7 gap-2 w-full">
            {categorias.map((cat) => (
              <TabsTrigger key={cat} value={cat} className="text-xs">
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {atributosReais[categoriaAtual]?.map((atributo) => (
            <Card
              key={atributo.nome}
              className={`cursor-pointer transition border ${
                selecionados.includes(atributo.nome)
                  ? "border-violet-500 bg-muted"
                  : "hover:border-violet-300"
              }`}
              onClick={() => setDetalhe(atributo)}
            >
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-sm">{atributo.nome}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {atributo.descricao}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selecionados.length >= 3 && (
          <div className="text-center pt-10">
            <Button onClick={() => router.push("/etapa2")}>
              Avançar para Briefing
            </Button>
          </div>
        )}

        <Dialog open={!!detalhe} onOpenChange={() => setDetalhe(null)}>
          <DialogContent className="max-w-xl space-y-4">
            {detalhe && (
              <div className="space-y-3 text-sm">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">{detalhe.nome}</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 mt-1 text-muted-foreground" />
                    <p className="leading-snug text-muted-foreground">{detalhe.descricao}</p>
                  </div>

                  {detalhe.aplicacoesEstrategicas && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-medium">
                        <Lightbulb className="w-4 h-4" />
                        Aplicações Estratégicas
                      </div>
                      <ul className="list-disc list-inside pl-2 text-muted-foreground">
                        {detalhe.aplicacoesEstrategicas.map((item: string, i: number) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {detalhe.arquetiposConectados && (
                    <div>
                      <div className="flex items-center gap-2 font-medium">
                        <BadgeCheck className="w-4 h-4" />
                        Arquétipos
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {detalhe.arquetiposConectados.map((a: string) => (
                          <Badge key={a} className="bg-gray-100 text-gray-800">{a}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {detalhe.palavrasChave && (
                    <div>
                      <div className="flex items-center gap-2 font-medium">
                        <Tag className="w-4 h-4" />
                        Palavras-chave
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {detalhe.palavrasChave.map((p: string) => (
                          <Badge key={p} className="bg-gray-200 text-gray-900">{p}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {detalhe.expressaoVisual && (
                    <div className="flex items-start gap-2">
                      <Palette className="w-4 h-4 mt-1" />
                      <p className="text-muted-foreground">{detalhe.expressaoVisual}</p>
                    </div>
                  )}

                  {detalhe.estiloVerbal && (
                    <div className="flex items-start gap-2">
                      <Quote className="w-4 h-4 mt-1" />
                      <p className="text-muted-foreground">{detalhe.estiloVerbal}</p>
                    </div>
                  )}

                  {detalhe.simbolosPossiveis && (
                    <div>
                      <div className="flex items-center gap-2 font-medium">
                        <Tag className="w-4 h-4" />
                        Símbolos Associados
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {detalhe.simbolosPossiveis.map((s: string) => (
                          <Badge key={s} className="bg-gray-200 text-gray-900">{s}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-right pt-4">
                  {selecionados.includes(detalhe.nome) ? (
                    <Button variant="destructive" onClick={() => toggleAtributo(detalhe.nome)}>
                      Remover Atributo
                    </Button>
                  ) : (
                    <Button onClick={() => toggleAtributo(detalhe.nome)}>
                      Selecionar Atributo
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
