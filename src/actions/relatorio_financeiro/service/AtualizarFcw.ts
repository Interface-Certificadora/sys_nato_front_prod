"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function AtualizarFcw(data: any) {
  await Promise.all(
    data.map(async (e: any) => {
      const consulta = await prisma.fcweb.findMany({
        where: {
          cpf: e.cpf,
          tipocd: "A3PF Bird5000",
          estatos_pgto: {
            not: "Pago"
          }
        },
        select: {
          id: true
        }
      });
      await prisma.$disconnect();
      return consulta.map(async (e: any) => {
        await prisma.fcweb.update({
          where: {
            id: e.id
          },
          data: {
            estatos_pgto: "Pago"
          },
          select: {
            id: true
          }
        });
        await prisma.$disconnect();
      });
    })
  );
}
