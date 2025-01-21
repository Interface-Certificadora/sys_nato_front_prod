import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {

    try {
        const { id } = params;
        
        const data = await prisma.nato_empreendimento.findUnique({
            where: {
                id: Number(id),
            },
        });
        return NextResponse.json(data, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}