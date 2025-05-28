"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function getUserID(id: number) {
  const session = await getServerSession(auth);

  if (!session) {
    return null;
  }
  return await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/termo/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      cache: "force-cache"
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Erro ao buscar usuário:", error);
      return null;
    });
}
