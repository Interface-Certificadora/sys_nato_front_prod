"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";



  function parseArrayString(str: string): string {
    if(str === null) {
      return ''
    }else if (str.trim() === '') {
      return JSON.stringify([]); 
    }
    return JSON.stringify(str.split(',').map(Number));
  }
  

export default async function UserCreate(_: any, data: FormData) {
  const cpf = data.get("cpf") as string;
  const nome = data.get("nome") as string;
  const username = data.get("usuario") as string;
  const telefone = data.get("telefone") as string;
  const telefoneFormat = telefone.replace(/\D/g, '');
  const email = data.get("email") as string;
  const construtora = data.get("construtora") as any;
  const empreendimento = data.get("empreendimento") as any;
  const Financeira = data.get("financeira") as any;
  const Cargo = data.get("cargo") as string;
  const hierarquia = data.get("hierarquia") as string;
  const password = data.get("senha") as string;
  const passwordConfir = data.get("confirsenha") as string;
  const construtoraArray = parseArrayString(construtora);
  const empreendimentoArray = parseArrayString(empreendimento);
  const FinanceiraArray = parseArrayString(Financeira);

  const session = await getServerSession(auth);

  if (!session) {
    return {
      error: true,
      message: "Unauthorized",
      data: null,
      status: 401
    };
  }
  const body = {
    cpf: cpf,
    nome: nome,
    username: username,
    telefone: telefoneFormat,
    email: email,
    construtora: construtoraArray,
    empreendimento: empreendimentoArray,
    Financeira: FinanceiraArray,
    cargo: Cargo,
    hierarquia: hierarquia,
    password: password,
    passwordConfir: passwordConfir
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    },
    body: JSON.stringify(
      body
    )
  });

  const res = await req.json();

  if(!req.ok){
    return {
      error: true,
      message: res.message,
      data: null,
      status: req.status
    };
  }
  return {
    error: false,
    message: res.message,
    data: res.data,
    status: req.status
  };
}

