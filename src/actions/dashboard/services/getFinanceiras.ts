import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function GetFinanceiras(){
    
    const session = await getServerSession(auth);
    
    if(!session){
        return null
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/dashboard/financeiras`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        next: {
            revalidate: 10
        }
    })

    if(!req.ok){
        return null
    }

    return await req.json()
}
