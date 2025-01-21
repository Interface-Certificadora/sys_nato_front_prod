import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("🚀 ~ POST ~ body:", body)
    const session = await getServerSession(auth);
    if (!session) {
      return new Response("Unauthorized2", { status: 401 });
    }

    const expiration = session ? session.expiration : 0;
    const expired = Date.now() > expiration * 1000;

    if (expired) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const user = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/relatorio/financeiro`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify(body)
      }
    );

    const data = await user.json();
    console.log("🚀 ~ POST ~ data:", data)

    if (!user.ok) {
      return NextResponse.json(data, { status: 400 });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
