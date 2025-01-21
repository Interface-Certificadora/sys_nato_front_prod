import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(auth)
        const { searchParams } = new URL(request.url);
        const FinanceiroId = searchParams.get("financeiro")
        const ConstrutoraId = searchParams.get("construtora")

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const reqest = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empreendimento/search?financeiro=${FinanceiroId}&construtora=${ConstrutoraId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.token}`
                }
            }
        );

        if (!reqest.ok) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }
        const data = await reqest.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}