import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";

export async function GET() {
  try {
    const session = await getServerSession(auth)
   
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const reqest = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empreendimento`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`
        },
        next: { 
          revalidate: 60 * 30,
          tags: ["empreendimento-all"]
         },
      }
    );

    const data = await reqest.json();
    
    if (!reqest.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    return NextResponse.json(data, { status: 200 });    
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}