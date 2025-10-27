import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export default async function GetEmpreendimentoById(id: number) {
  const session = await getServerSession(auth);

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empreendimento/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      next: {
        revalidate: 10
      }
    }
  );

  if (!req.ok) {
    return {
      error: true,
      message: "Erro ao buscar empreendimento",
      data: null
    };
  }

  const res = await req.json();
  revalidateTag("empreendimento-all");
  return { error: false, message: "success", data: res };
}
