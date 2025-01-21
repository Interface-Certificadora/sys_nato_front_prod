import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
){
    try{
        const id = params.id;
        const session = await getServerSession(auth);

        if(!session){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const user = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/reativar/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.token}`
                }
            }
        );
        if (!user.ok) {
            return new NextResponse("Invalid credentials", { status: 401 });
          }
          const data = await user.json();
      
          return NextResponse.json(data, { status: 200 });
        } catch (error: any) {
          return NextResponse.json({ error: error }, { status: 500 });
        }
}