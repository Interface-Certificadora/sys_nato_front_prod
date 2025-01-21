'use server'
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function pausar(id: number, pause: boolean, reativar?: boolean) {

    const session = await getServerSession(auth);
    
    const createdAt = new Date()
    createdAt.setHours(createdAt.getHours() - 3)

    if (!session) {
        return { error: true, message: "Unauthorized", status: 401 };
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao/pause/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify({
            pause: pause,
            ...(reativar && {createdAt: createdAt })
        })
    })

    const res = await req.json()

    if(!req.ok){
        return { error: true, message: res.message, status: 500 };
    }
    return { error: false, message: res.message, status: 201 }
}