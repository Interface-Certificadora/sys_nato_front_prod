'use server'

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetMin(id: number) {


  const req = await prisma.nato_solicitacoes_certificado.findUnique({
    where: {
      id: id
    },
    select: {
      id: true,
      nome: true,
      cpf: true,
      email: true,
      dt_solicitacao: true,
      corretor: true,
      construtora: true,
      telefone: true,
      dt_nascimento: true,
      pause: true,
    } 
  })

  if(!req){
    return { error: true, message: "ERRO Ao buscar suporte", data: null };
  }else{
    return { error: false, message: 'Sucesso', data: req }
  }
}