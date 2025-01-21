import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";




export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    console.log("🚀 ~ PUT ~ data:", data)
    const { id } = params;
    console.log("🚀 ~ PUT ~ id:", id)
    const session = await getServerSession(auth);
    console.log("🚀 ~ PUT ~ session:", session)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/reset_password/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      body: JSON.stringify(data),
    });
    const retorno = await response.json();
    return NextResponse.json(retorno, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}