import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function GetCorretorByConstrutora(id: number) {

    const session = await getServerSession(auth);

    if(!session){
        return { error: true, message: "Unauthorized" };
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/construtora/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        }
    })
    
    if(!req.ok){
        return { error: true, message: "ERRO Ao buscar construtoras" };
    }

    const res = await req.json();

    return { error: false, message: 'Sucesso', data: res }
    
}