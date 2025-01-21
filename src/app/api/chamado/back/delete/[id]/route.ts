import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  try {

    const { id } = params;
    const session = await getServerSession(auth);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error("Erro ao deletar chamado");
    }

    return NextResponse.json(
      { message: "Chamado deletado com sucesso",
        data: { response: response }
       },
      { status: 200 }
    );
    
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message,
        data: { response: err }
       },
      { status: 500 }
    )
  }
}
