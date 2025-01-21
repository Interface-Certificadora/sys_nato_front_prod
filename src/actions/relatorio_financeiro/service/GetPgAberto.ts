"use server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";

const prisma = new PrismaClient();

export async function GetPgEmAberto() {
  try {
    const session = await getServerSession(auth);
    const dados = await prisma.nato_relatorio_financeiro.findMany({
      where: {
        situacao_pg: 1,
        ...(session?.user.hierarquia === "CONST" && {
          construtora: {
            in: session?.user.construtora.map(
              (construtora: any) => construtora.id
            )
          }
        })
      },
    });

    return {
      error: false,
      message: "Success",
      data: await Promise.all(
        dados.map(async (item: any) => ({
          ...item,
          createdAt: item.createdAt.toISOString(),
          ...(item.construtora && {
            construtora: await GetConstrutora(item.construtora)
          })
        }))
      )
    };
  } catch (error: any) {
    // Tratamento genérico de erro
    console.error("Erro ao buscar solicitações:", error.message);
    return {
      error: true,
      message: "Erro interno no servidor. " + error.message,
      data: []
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
