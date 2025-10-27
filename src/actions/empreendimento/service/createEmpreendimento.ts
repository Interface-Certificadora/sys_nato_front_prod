"use server";

import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateEmpreendimento(_: any, data: FormData) {
  const session = await getServerSession(auth);

  if (!session) {
    return { status: 401, message: "Unauthorized", error: true };
  }

  const construtora = Number(data.get("empreendimentoConstrutora") as string);
  const nome = data.get("nomeEmpreendimento") as string;
  const cidade = data.get("nomeCidade") as string;
  const uf = data.get("empreendimentoUf") as string;
  const financeiro = data.get("financeira") as string;
  const financeiroFormatado = `[${financeiro}]`;
  const tag = "NATO_";

  const dataAtual = new Date();
  const ativo = true;
  const vendedores = "[]";

  const body = {
    nome: nome,
    construtora: construtora,
    dt_inicio: dataAtual.toISOString(),
    cidade: cidade,
    uf: uf,
    ativo: ativo,
    financeiro: financeiroFormatado,
    vendedores: vendedores,
    tag: tag
  };

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empreendimento`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`
      },
      body: JSON.stringify(body)
    }
  );

  const res = await req.json();

  if (!req.ok) {
    return { error: true, message: res.message, data: null, status: 500 };
  }

  if (res.error) {
    return { error: true, message: res.message, data: null, status: 500 };
  }
  revalidateTag("empreendimento-all");
  redirect("/empreendimentos");
}
