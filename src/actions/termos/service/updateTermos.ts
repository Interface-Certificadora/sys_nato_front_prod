'use server';
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";


export default async function UpdateTermos(id : number, termo : boolean){ 
    const termoAceito = termo

    const session = await getServerSession(auth);

    if (!session) {
        return { error: true, message: "Unauthorized", data: null };
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/termo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify({
            termo: termoAceito
        })
    })

    const res = await req.json();

    if (!req.ok) {
        return { error: true, message: "ERRO Ao Aceitar Termos" };
    }
    
    if(res.error){
        return { error: true, message: res.message, data: null };
    }else{
        return { error: false, message: res.message, data: res.data };
    }

}