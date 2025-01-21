"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function GetUser(id: number) {
  
  const session = await getServerSession(auth);

  if (!session) {
    return null;
  }

  const user = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/get/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    },
  })
  const res = await user.json()
  return res
}

export async function UpdateUser(_: any, data: FormData) {
  const id = data.get("id") as string;
  const cpf = data.get("cpf") as string;
  const nome = data.get("nome") as string;
  const username = data.get("usuario") as string;
  const telefone = data.get("telefone") as string;
  const email = data.get("email") as string;
  const construtora = data.get("construtora") as any;
  const empreendimento = data.get("empreendimento") as any;
  const financeira = data.get("financeira") as any;
  const cargo = data.get("cargo") as string;
  const hierarquia = data.get("hierarquia") as string;

  const construtoraArray = construtora
    ? construtora.split(",").map(Number)
    : [];
  const empreendimentoArray = empreendimento
    ? empreendimento.split(",").map(Number)
    : [];
  const FinanceiraArray = financeira 
    ? financeira.split(",").map(Number) 
    : [];

    const session = await getServerSession(auth);

    if (!session) {
      return null;
    }

  await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    },
    body: JSON.stringify({
      cpf: cpf,
      nome: nome,
      username: username,
      ...(telefone && { telefone: telefone.replace(/\D/gm, "") }),
      email: email,
      ...(construtora && { construtora: JSON.stringify(construtoraArray) }),
      ...(empreendimento && {
        empreendimento: JSON.stringify(empreendimentoArray)
      }),
      ...(financeira && { Financeira: JSON.stringify(FinanceiraArray) }),
      hierarquia: hierarquia,
      cargo: cargo
    })
  });
  redirect("/usuarios");
}
