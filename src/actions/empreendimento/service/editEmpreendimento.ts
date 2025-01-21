"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function EditEmpreendimento(_: any, data: FormData) {
  const id = Number(data.get("id") as string);
  const construtora = Number(data.get("empreendimentoConstrutora") as string);
  const nome = data.get("nomeEmpreendimento") as string;
  const cidade = data.get("nomeCidade") as string;
  const uf = data.get("empreendimentoUf") as string;
  const financeiro = data.get("financeira") as string;
  const financeiroFormatado = `[${financeiro}]`;

  const session = await getServerSession(auth);

  if (!session) {
    return {status: 401, message: "Unauthorized", error: true};
  }

  const body = {
    nome: nome,
    construtora: construtora,
    cidade: cidade,
    uf: uf,
    financeiro: financeiroFormatado
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empreendimento/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    },
    body: JSON.stringify(body)
  });

  if (!req.ok) {
    return {status: req.status, message: "Error", error: true};
  }

  redirect("/empreendimentos");
}
