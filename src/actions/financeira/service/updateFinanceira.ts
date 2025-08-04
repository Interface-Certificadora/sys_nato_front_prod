"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function UpdateFinanceira(_: any, data: FormData) {
  const id = Number(data.get("id"));
  const razaoSocial = data.get("razaosocial") as string;
  const cnpj = data.get("cnpj") as string;
  const email = data.get("email") as string;
  const telefone = data.get("telefoneSemMask") as string;
  const responsavel = data.get("responsavel") as string;
  const fantasia = data.get("fantasia") as string;

  const session = await getServerSession(auth);

  if (!session) {
    return {
      error: true,
      message: "Unauthorized",
      data: null,
      status: 401
    };
  }

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/financeiro/update/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      body: JSON.stringify({
        cnpj: cnpj,
        razaosocial: razaoSocial,
        tel: telefone,
        email: email,
        responsavel: responsavel,
        fantasia: fantasia
      })
    }
  );

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
  redirect("/financeiras");
}
