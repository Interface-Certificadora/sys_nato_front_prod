"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function AtualizarData(data: any) {
  await Promise.all(
    data.map((e: any) => {
      return prisma.nato_solicitacoes_certificado.update({
        where: {
          id: e.id
        },
        data: {
          estatos_pgto: "Pago",
          situacao_pg: 2
        }
      });
    })
  );
  await prisma.$disconnect();
}
