"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function AtualizarStatus(id: number) {
  try {
    const relatorioFinanceiro = await prisma.nato_relatorio_financeiro.update({
      where: {
        id: id,
      },
      data: {
        situacao_pg: 2
      }
    })
    return {
      error: false,
      message: "Pagamento registrado com sucesso.",
      data: relatorioFinanceiro
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      message: "Erro ao registrar pagamento.",
      data: null
    }
  }finally{
    await prisma.$disconnect();
  }
}
