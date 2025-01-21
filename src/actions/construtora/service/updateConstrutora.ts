'use server'
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UpdateConstrutora(_: any, data: FormData) {

    const id = data.get("id") as string;
    const razaoSocial = data.get("razaosocial") as string;
    const tel = data.get("telefoneSemMask") as string;
    const email = data.get("email") as string;
    const fantasia = data.get("fantasia") as string;

    const body = {
        razaosocial: razaoSocial,
        tel: tel,
        email: email,
        fantasia: fantasia,
    }

    const session = await getServerSession(auth);

    if (!session) {
        return {
            error: true,
            message: "Unauthorized",
            data: null,
        };
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/construtoras/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify(body),
    })

    const res = await req.json();

    if (!req.ok) {
        return {
            error: true,
            message: "ERRO ao atualizar a construtoras",
            data: null,
        };
    }

    if(res.error){
        return {
            error: true,
            message: res.message,
            data: null,
        };
    }else{
        redirect("/construtoras");
    }
    
}