"use server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { cpf: string } }
) {
  try {
    const { cpf } = params;
    console.log("🚀 ~ cpf:", cpf);
    const data = await prisma.nato_solicitacoes_certificado.count({
      where: {
        cpf: {
          equals: cpf
        }
      }
    });

    const solicitacao = await prisma.nato_solicitacoes_certificado.findMany({
      where: {
        cpf: {
          equals: cpf
        }
      }
    });
    if (data > 0) {
      return NextResponse.json(
        {
          message: "O CPF informado já está registrado.",
          cpf: true,
          solicitacoes: solicitacao
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Você pode prosseguir com o cadastro.",
        cpf: false,
        solicitacoes: []
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
