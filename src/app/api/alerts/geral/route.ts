import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";

export async function GET() {
  try {
    const session = await getServerSession(auth);
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/alerts`;
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    });
    const data = await request.json();
    
    if (!request.ok)
      return NextResponse.json(
        { message: "Solicitação não encontrada" },
        { status: 404 }
      );

    const filterData = data.filter((alert: any) => alert.status === true).filter((alert: any) => alert.corretor === session?.user.id || alert.corretor === null);

    return NextResponse.json(filterData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
