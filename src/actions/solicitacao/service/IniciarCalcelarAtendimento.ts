'use server'

import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export async function IniciarCalcelarAtendimento(id: number) {

    const session = await getServerSession(auth);

    if (!session) {
        return { error: true, message: "Unauthorized", status: 401 };
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/atendimento/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        }
        
    })

    const res = await req.json();

    if(!req.ok){
        return { error: true, message: "Erro ao iniciar atendimento", status: 500, data: null };
    }

    if(res){
        return { error: false, message: "Sucesso ao iniciar atendimento", status: 200, data: null };
    }else{
        return { error: false, message: "Atendimento Cancelado com sucesso", status: 200, data: null };
    }
    
}