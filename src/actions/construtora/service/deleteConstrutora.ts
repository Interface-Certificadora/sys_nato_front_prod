"use server";

import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function DeleteConstrutora(id: number) {

  const session = await getServerSession(auth);

  if (!session) {
    return { error: true, message: "Unauthorized" };
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/construtoras/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    }
  })

  const res = await req.json();

  if (res.error) {
    return { error: true, message: res.message };
  }else{
    return { error: false, message: 'Construtora deletada com sucesso' };
  }
}
