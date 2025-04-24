import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const session = await getServerSession(auth);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/construtoras/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: "ERRO" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Construtora excluída com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
