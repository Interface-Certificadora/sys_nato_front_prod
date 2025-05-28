import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export async function GetFinanceiraById(id: number){

    const session = await getServerSession(auth);

    if(!session){
        return { error: true, message: "Unauthorized", status: 401 };
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/financeiro/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        next: {
            revalidate: 10
        }
    })

    const res = await req.json();

    if(!req.ok){
        return { error: true, message: "Erro ao buscar financeira", status: 500, data: null };
    }

    return { error: false, message: "success", status: 200, data: res };

}