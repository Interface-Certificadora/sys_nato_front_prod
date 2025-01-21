import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const session = await getServerSession(auth)
        
        // if(!session){
        //     return NextResponse.json(
        //         { message: "Unauthorized" },
        //         { status: 401 }
        //     );
        // }   
        
        const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado/count/total`,
            {
                method: 'GET',
                
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session?.token}`
                }
                
            })


        if(!req.ok){
            const dataRetorno: any = 0
            return new NextResponse(dataRetorno, { status: 200 });
        }
        const data = await req.json()

        return NextResponse.json(data, {status: 200})
        
    }catch (err: any){
        return NextResponse.json({error : err}, {status: 500})
    }
}
