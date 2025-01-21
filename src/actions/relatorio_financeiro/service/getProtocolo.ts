"use server";
import { PrismaClient } from "@prisma/client";
import { ProtocoloDto } from "../dto/protocolo.dto";

const prisma = new PrismaClient();

export async function GetProtocolo(protocolo: string) {
  const dto = new ProtocoloDto(protocolo);
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
    // Busca o protocolo no banco de dados
    const request = await prisma.nato_relatorio_financeiro.findUnique({
      where: { protocolo: dto.protocolo }
    });
    if (!request) {
      return {
        error: true,
        message: "Protocolo não encontrado.",
        data: null
      };
    }
    let solicitacaoIds = [];

    const start = request.start
    const end = request.end

    // Validação do campo solicitacao como JSON válido
    try {
      solicitacaoIds = JSON.parse(request.solicitacao);
    } catch (parseError) {
      console.error("Erro ao fazer parse do campo solicitacao:", parseError);
      return {
        error: true,
        message: "Erro ao processar a solicitação.",
        data: null
      };
    }
    // Trazer informações da solicitação
    const solicitacao: any =
      await prisma.nato_solicitacoes_certificado.findMany({
        where: {
          id_fcw: {
            in: solicitacaoIds
          }
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
        ...request,
        ...(request.createdAt && {
          createdAt: new Date(request.createdAt).toISOString()
        }),
        ...(request.updatedAt && {
          updatedAt: new Date(request.updatedAt).toISOString()
        }),
        ...(request.construtora && {
          construtora: await GetConstrutora(request.construtora)
        }),
        ...(request.start && { start: new Date(request.start).toISOString() }),
        ...(request.end && { end: new Date(request.end).toISOString() }),
        ...(solicitacao.length > 0
          ? {
              solicitacao: await Promise.all(solicitacao.map(async(s: any) => {
                return {
                  ...s,
                  createdAt: new Date(s.createdAt).toISOString(),
                  dt_aprovacao: new Date(s.dt_aprovacao).toISOString(),
                  empreedimento: await getEmpreedimento(s.empreedimento),
                  financeiro: await getFinaceiro(s.financeiro),
                  corretor: await getCorretor(s.corretor),
                  ...(start && end && {certificado: await getCertificado(s.cpf,start,end)})
                };
              }))
            }
          : {
              solicitacao: []
            })
      }
    };
  } catch (error: any) {
    // Tratamento genérico de erro
    console.error("Erro ao buscar protocolo:", error.message);
    return {
      error: true,
      message: "Erro interno no servidor. " + error.message,
      data: null
    };
  } finally {
    await prisma.$disconnect();
  }
}

async function GetConstrutora(id: number) {
  const reqest = await prisma.nato_empresas.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      fantasia: true
    }
  });
  await prisma.$disconnect();
  return reqest;
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
  await prisma.$disconnect()
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
  await prisma.$disconnect()
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
    await prisma.$disconnect()
  }
}

const getCertificado = async (cpf: string, inicio: Date, fim: Date) => {
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
  return certificado
}
