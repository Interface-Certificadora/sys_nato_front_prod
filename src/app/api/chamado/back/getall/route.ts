import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        console.log('to aqui')
        const session = await getServerSession(auth)
        if(!session){
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }   
        
        const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado`,
            {
                method: 'GET',
                
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
                
            })

        if(!req.ok){
            return new NextResponse("Invalid credentials", { status: 401 });
        }
        const data = await req.json()

        return NextResponse.json(data, {status: 200})
        
    }catch (err: any){
        return NextResponse.json({error : err}, {status: 500})

    }
}