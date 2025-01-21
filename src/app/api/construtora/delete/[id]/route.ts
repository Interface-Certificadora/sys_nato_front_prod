import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const request = await prisma.nato_empresas.update({
      where: { 
        id: Number(id) 
      }, 
      data: {
        status: false
      } 
    });

    if (!request) {
      return NextResponse.json({message: "Construtora inexistente"}, { status: 404 });
    }

    return NextResponse.json({message: "Construtora excluída com sucesso"}, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
