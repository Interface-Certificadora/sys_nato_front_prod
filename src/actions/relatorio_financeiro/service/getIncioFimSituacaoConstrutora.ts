"use server";
import { PrismaClient } from "@prisma/client";
import { DetIncioFimSituacaoConstrutoraDto } from "../dto/getIncioFimSituacaoConstrutora.dto";

const prisma = new PrismaClient();

type dataType = {
  id: number;
  nome: string;
  cpf: string;
  empreedimento: number;
  createdAt: Date;
  dt_aprovacao: Date | null;
  estatos_pgto: string | null;
  valorcd: number | null;
};

type RetornoType = {
solicitacao?: dataType[];
totalFcw: number;
ValorTotal: number;
};
let total = 0;
/**
 * Busca as solicitações no banco de dados, considerando o construtora,
 * data de início e fim, e situação de pagamento.
 *
 * @param {string} inicio - Data de início no formato "yyyy-mm-dd".
 * @param {string} fim - Data de fim no formato "yyyy-mm-dd".
 * @param {number} situacao - Id da situação de pagamento.
 * @param {number} empreedimento - Id do empreendimento.
 * @param {number} construtora - Id da construtora.
 * @type {dataType[]} - { id: number, nome: string, cpf: string, empreedimento: number | null, createdAt: Date, dt_aprovacao: Date | null, estatos_pgto: string | null, valorcd: number | null }
 *
 * @returns {Promise<{ error: boolean, message: string, data: dataType[] | null }>}
 */
export async function GetIncioFimSituacaoConstrutora(
  construtora: number,
  empreedimento: number,
  inicio: string,
  fim: string,
  situacao: number,
): Promise<{ error: boolean; message: string; data: RetornoType | null }> {
  const dto = new DetIncioFimSituacaoConstrutoraDto(
    construtora,
    empreedimento,
    inicio,
    fim,
    situacao
  );

  // Validação usando o DTO
  const erroValidacao = dto.validar();
  if (erroValidacao) {
    return {
      error: true,
      message: erroValidacao,
      data: null
    };
  }

  try {
    const valorConst = await getConstrutoraValor(dto.construtora)
    // Busca as solicitações no banco de dados
    const dados = await prisma.nato_solicitacoes_certificado.findMany({
      where: {
        construtora: dto.construtora,
        createdAt: {
          gte: new Date(dto.inicio),
          lte: new Date(dto.fim)
        },
        Andamento: {
          in: ["APROVADO", "EMITIDO", "REVOGADO"]
        },
        dt_aprovacao:{
          not: null
        },
        situacao_pg: {
          equals: dto.situacao
        },
        ...(dto.empreedimento > 0 && {empreedimento: dto.empreedimento} )
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        id_fcw: true,
        estatos_pgto: true,
        valorcd: true,
        dt_aprovacao: true,
        createdAt: true,
        empreedimento: true,
        financeiro: true,
        corretor: true,
        type_validacao: true
      }
    });

    
    return {
      error: false,
      message: "Success",
      data: {
        ...(dados.length > 0 && {
          solicitacao: await Promise.all(dados.map(async(item: any) => ({
            ...item,
            empreedimento: await getEmpreedimento(item.empreedimento),
            financeiro: await getFinaceiro(item.financeiro),
            corretor: await getCorretor(item.corretor),
            createdAt: new Date(item.createdAt).toISOString(),
            dt_aprovacao: item.dt_aprovacao
              ? new Date(item.dt_aprovacao).toISOString()
              : null,
            certificado: await getCertificado(item.cpf,dto.inicio,dto.fim)
          })))
        }),
        totalFcw: total,
        ValorTotal: total> 0 ? total * valorConst : 0
      }
      
      //consertar retorno
    };
  } catch (error: any) {
    // Tratamento genérico de erro
    console.error("Erro ao buscar solicitações:", error.message);
    return {
      error: true,
      message: "Erro interno no servidor. " + error.message,
      data: null
    };
  } finally {
    await prisma.$disconnect();
  }
}


const getEmpreedimento = async (id: number) => {
  if (id === 0) {
    return {
      id: 0,
      nome: "Não informado"
    }
  }
  if(typeof id !== "number") {
    return {
      id: 0,
      nome: id
    }
  }
  if(!id) {
    return {
      id: 0,
      nome: "Não informado"
    }
  }
  const empreedimento = await prisma.nato_empreendimento.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      nome: true,
      cidade: true
    }
  })
  await prisma.$disconnect();
  return empreedimento
}

const getFinaceiro = async (id: number) => {
  const financeiro = await prisma.nato_financeiro.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      fantasia: true
    }
  })
  await prisma.$disconnect();
  return financeiro
}

const getCorretor = async (id: number) => {
  try {
    if (id === 0) {
      return {
        id: 0,
        nome: "Não informado"
      }
    }
    if(typeof id !== "number") {
      return {
        id: 0,
        nome: id
      }
    }
    if(!id) {
      return {
        id: 0,
        nome: "Não informado"
      }
    }
    const corretor = await prisma.nato_user.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        nome: true
      }
    })
    return corretor
  } catch (error) {
    console.log("🚀 ~ getCorretor ~ error:", error)
    return {
      id: 0,
      nome: id
    }
  }finally{
    await prisma.$disconnect();
  }
}

const getCertificado = async (cpf: string, inicio: string, fim: string) => {
  const  gepFim = new Date(fim)
  gepFim.setMonth(gepFim.getMonth() + 3)
  const certificado = await prisma.fcweb.count({
    where: {
      cpf: cpf,
      andamento:{
        in: ["APROVADO", "EMITIDO", "REVOGADO"]
      },
      dt_aprovacao:{
        not: null
      },
      estatos_pgto: {
        not: 'Pago'
      },
      createdAt: {
        gte: new Date(inicio),
        lte: gepFim 
      },
      tipocd:{
        equals: "A3PF Bird5000"
      }
    },
  })
  await prisma.$disconnect();
  total += certificado
  return certificado
}

const getConstrutoraValor = async (id: number) => {
  const construtora = await prisma.nato_empresas.findUnique({
    where: {
      id
    },
    select: {
      valor_cert: true
    }
      
  })
  await prisma.$disconnect();
  return !construtora?.valor_cert ? 100 : construtora?.valor_cert
}