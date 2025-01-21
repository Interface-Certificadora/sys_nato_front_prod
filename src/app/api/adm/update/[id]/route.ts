import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await request.json();

    const session = await getServerSession(auth);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const retorno = await prisma.nato_relatorio_financeiro.update({
      where: {
        id: Number(id)
      },
      data: {
        ...data
      }
    });

    await prisma.$disconnect();

    return NextResponse.json(
      {
        error: false,
        message: "Registro criado com sucesso",
        data: { response: retorno }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: true,
        message: "Erro ao criar o registro",
        data: null
      },
      { status: 500 }
    );
  }
}
