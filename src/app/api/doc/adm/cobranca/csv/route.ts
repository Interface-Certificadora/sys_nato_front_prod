import { GetConstrutoraById } from "@/actions/construtora/service/getConstrutoraById";
import ApiCpnjJson from "@/actions/getInfo/api/apicnpj";
import { NextResponse } from "next/server";

type DataBody = {
  solicitacao: any[];
  construtora: number;
  type: string;
  Inicio: string;
  Fim: string;
};

type DataConstrutora = {
  error: boolean;
  message: string;
  data: {
    cnpj: string;
    tel: string;
    email: string;
    fantasia: string;
    razaosocial: string;
    id: number;
    valor_cert: number;
  };
};

export async function POST(req: Request) {
  try {
    const data: DataBody = await req.json();
    const { solicitacao, construtora, Inicio, Fim, type } = data;

    if (solicitacao.length === 0) {
      throw new Error("Nenhum registro selecionado");
    }

    const construtoraInfo: DataConstrutora = await GetConstrutoraById(
      construtora
    );

    const DadosCnpj = await ApiCpnjJson(construtoraInfo.data.cnpj);

    if (DadosCnpj.error) {
      throw new Error(DadosCnpj.message);
    }

    const ValorCert = construtoraInfo?.data.valor_cert
      ? construtoraInfo?.data.valor_cert
      : 0;
    

    // CSV
    const separarPorEmpreendimentoId = () => {
      return solicitacao.reduce(
        (
          acc: Record<number, { nome: string; cidade: string; itens: any }>,
          item: any
        ) => {
          const empreendimentoId = item.empreedimento?.id;
          if (empreendimentoId) {
            if (!acc[empreendimentoId]) {
              acc[empreendimentoId] = {
                nome: item.empreedimento.nome,
                cidade: item.empreedimento.cidade,
                itens: []
              };
            }
            acc[empreendimentoId].itens.push(item);
          }
          return acc;
        },
        {}
      );
    };

    const formataCPF = (cpf: string) => {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    const formataData = (data: string) => {
      return data.split("T")[0].split("-").reverse().join("/");
    };
    const dadosSeparados = separarPorEmpreendimentoId();
    let csvContent = "\uFEFF";
    csvContent += `${construtoraInfo?.data.fantasia}; ${Inicio.split("-")
      .reverse()
      .join("-")} - ${Fim.split("-").reverse().join("-")};;\n;;;\n`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [empreendimento, dados] of Object.entries(
      dadosSeparados
    ) as any) {
      csvContent += `${dados.nome};;;\n;;;\n`;
      csvContent += `x;Id;Nome;CPF;DtAprovacao;CCA;Cidade;Solicitante;Certificado;Validação;qtd;Valor\n`;

      dados.itens.forEach((item: any, index: number) => {
        const valor = ValorCert * item.certificado;
        const ValorCertFormatado = valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL"
        });
        const linha = [
          index + 1,
          item.id,
          item.nome,
          formataCPF(item.cpf),
          formataData(item.dt_aprovacao),
          item.financeiro?.fantasia,
          dados.cidade,
          item.corretor?.nome,
          "A3PF - Nuvem",
          item.type_validacao === "VIDEO CONF" ? "VIDEO" : "PRESENCIAL",
          item.certificado,
          ValorCertFormatado
        ].join(";");
        csvContent += linha + "\n";
      });

      csvContent += `;;;;;\n;;;;;;\n`;
    }

    const csvName = `${type}_${construtoraInfo?.data.fantasia}_${Inicio.split(
      "-"
    )
      .reverse()
      .join("_")}_${Fim.split("-").reverse().join("_")}.csv`;

    return NextResponse.json(
      {
        error: false,
        message: "OK",
        data: { csvContent, csvName }
      },
      {
        status: 200
      }
    );
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json(
      { error: true, message: error.message, data: null },
      { status: 500 }
    );
  }
}
