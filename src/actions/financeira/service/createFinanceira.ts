'use server'
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";


export default async function FinanceiraCreate(_: any, data: FormData) {
    const cnpj = data.get("cnpj") as string;
    const razaosocial = data.get("razaosocial") as string;
    const tel = data.get("telefone") as string;
    const email = data.get("email") as string;
    const responsavel = data.get("responsavel") as string;
    const fantasia = data.get("fantasia") as string;
    const colaboradores = '[]'

    const telefone = tel.replace(/[^0-9]/g, '');

    const session = await getServerSession(auth);

    if (!session) {
        return { error: true, message: "Unauthorized", data: null, status: 401 };
    }
    
    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/financeiro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify({
            cnpj: cnpj,
            razaosocial: razaosocial,
            tel: telefone,
            email: email,
            colaboradores: colaboradores,
            responsavel: responsavel,
            fantasia: fantasia,
        })
    })

    const res = await req.json();
    
    if (!req.ok) {
        return {
            error: true,
            message: res.message,
            data: null,
            status: req.status
        };
    }
    revalidateTag("financeira-all");    
    redirect('/financeiras');

}
