import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const session = await getServerSession(auth);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`
        },
        body: JSON.stringify(body)
      }
    );

    if (!user.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    const data = await user.json();

    console.log("🚀 ~ data:", data)

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ error:", error)
    return NextResponse.json(error, { status: 500 });
  }
}
