import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const session = await getServerSession(auth);

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${session?.token}`,
            },
            body: JSON.stringify(data), 
        });

        const retornoArquivo = await response.json();


        if (!response.ok) {
            throw new Error(retornoArquivo.message || "Erro ao criar chamado");
        }


        return NextResponse.json(
            { data: retornoArquivo, message: "Chamado criado com sucesso" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Erro ao criar chamado:", error);
        return NextResponse.json(
            { message: error.message || "Erro interno do servidor" },
            { status: error.status || 500 }
        );
    }
}
