import { GetConstrutoraById } from "@/actions/construtora/service/getConstrutoraById";
import ApiCpnjJson from "@/actions/getInfo/api/apicnpj";
import { PostRelatorio } from "@/actions/relatorio_financeiro/service/postRelatorio";
import { createForm } from "@/lib/pdf";
import { NextResponse } from "next/server";

type DataBody = {
  solicitacao: any[];
  nota_fiscal: string;
  situacao_pg: number;
  construtora: number;
  protocolo: string;
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
    const {
      solicitacao,
      situacao_pg,
      construtora,
      protocolo,
      nota_fiscal,
      Inicio,
      Fim
    } = data;

    if (solicitacao.length === 0) {
      throw new Error("Nenhum registro selecionado");
    }

    let GetProtocolo = "";
    if (!protocolo) {
      const solicitacaoIds = solicitacao.map((s) => s.id);
      const postData = await PostRelatorio({
        situacao_pg,
        nota_fiscal,
        solicitacaoIds,
        construtora,
        Inicio,
        Fim
      });
      GetProtocolo = postData.data.protocolo;
    }
    const NumberProtocolo = protocolo ? protocolo : GetProtocolo;

    const construtoraInfo: DataConstrutora = await GetConstrutoraById(
      construtora
    );

    const DadosCnpj = await ApiCpnjJson(construtoraInfo.data.cnpj);

    if (DadosCnpj.error) {
      throw new Error(DadosCnpj.message);
    }

    const DadosConst = {
      nome: DadosCnpj?.data.razao_social,
      telefone: construtoraInfo?.data.tel
        ?.replace(/[^0-9]/g, "")
        .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4"),
      email: construtoraInfo?.data.email,
      cnpj: construtoraInfo?.data.cnpj.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      ),
      end: `${DadosCnpj?.data.descricao_tipo_de_logradouro} ${
        DadosCnpj?.data.logradouro
      }, ${DadosCnpj?.data.numero}, ${DadosCnpj?.data.complemento}, ${
        DadosCnpj?.data.bairro
      }, ${DadosCnpj?.data.municipio} - ${
        DadosCnpj?.data.uf
      }, ${DadosCnpj?.data.cep?.replace(/(\d{5})(\d{3})/, "$1-$2")}`
    };
    
    const ValorCert = construtoraInfo?.data.valor_cert
    ? construtoraInfo?.data.valor_cert
    : 0;
    
        const ValorTotal = solicitacao.reduce(
          (acc: number, item: any) => acc + (ValorCert * item.certificado), 0
        );


    // const ValorTotal = ValorCert ? solicitacao.length * ValorCert : 0;
    const ValorCertFormatado = ValorCert.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const ValorTotalFormatado = ValorTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    const msg = `Certificados emitidos pelo "AR Interface certificador" no período de ${Inicio.split(
      "-"
    )
      .reverse()
      .join("/")} a ${Fim.split("-")
      .reverse()
      .join(
        "/"
      )}, com o valor total de ${ValorCertFormatado} cada certificado, com validade de 1 ano.`;

    const pdfName = `relatorio_cobranca_${
      construtoraInfo?.data.fantasia
    }_${Inicio.split("-").reverse().join("_")}_${Fim.split("-")
      .reverse()
      .join("_")}.pdf`;

      const calculo = solicitacao.reduce((acc: number, item: any) => acc + item.certificado, 0)


    const pdf = await createForm(
      DadosConst,
      ValorTotalFormatado,
      calculo,
      msg,
      NumberProtocolo
    );

    return NextResponse.json(
      {
        error: false,
        message: "OK",
        data: {
          pdf,
          pdfName
        }
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
