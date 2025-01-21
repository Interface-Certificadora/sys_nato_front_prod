import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
    
       const data = await prisma.nato_tags.delete({
            where: { id: Number(id) },
        });
console.log(data)

        return NextResponse.json({message: "Tag excluída com sucesso"}, { status: 200 });
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({message: "Erro ao excluir a tag"}, { status: 500 });
    }
}
