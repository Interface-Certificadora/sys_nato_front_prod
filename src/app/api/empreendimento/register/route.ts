import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const session = await getServerSession(auth);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empreendimento`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ ...data, vendedores: [] }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao criar o registro");
    }
    const retorno = await response.json();
    revalidateTag("empreendimento-all");
    return NextResponse.json(
      {
        message: "Registro criado com sucesso",
        data: { response: retorno.data },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
