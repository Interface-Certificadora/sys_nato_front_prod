"use client";
import React from "react";
import { Button } from "@chakra-ui/react";

export const BotaoSisapp = ({ body }: any) => {
  const handleUpdateSolicitacao = async () => {
    try {
      const requestBody = {
        nome: body.nome,
        cpf: body.cpf,
        email: body.email,
        telefone: body.telefone,
        dtNascimento: body.dt_nascimento,
        dtSolicitacao: body.createdAt,
        idFcw: body.id_fcw,
        ativo: body.ativo,
        andamento: body.Andamento,
        statusPgto: body.estatos_pgto,
        valorCd: body.valorcd,
        docSuspenso: null,
        alertaNow: body.alertanow || false,
        dtCriacaoNow: body.dt_criacao_now,
        statusAtendimento: body.statusAtendimento,
        corretor: JSON.stringify({
          id: body.corretor.id,
          nome: body.corretor.nome,
          telefone: body.corretor.telefone
        }),
        construtora: JSON.stringify({
          id: body.construtora.id,
          fantasia: body.construtora.fantasia
        }),
        empreendimento: JSON.stringify({
          id: body.empreedimento.id,
          nome: body.empreedimento.nome,
          cidade: body.empreedimento.cidade,
          uf: body.empreedimento.estado,
          tag: body.empreedimento.tag
        }),
        financeiro: JSON.stringify({
          id: body.financeiro.id,
          fantasia: body.financeiro.fantasia
        })
      };

      const response = await fetch("/api/sisapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Solicitação enviada com sucesso:", data);
        alert("Solicitação enviada com sucesso!");
      } else {
        const data = await response.json();
        console.error("Erro ao enviar solicitação:", response.statusText);
        alert(`Erro ao enviar solicitação: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      alert(`Erro ao processar a requisição: ${error}`);
    }
  };

  return (
    <Button colorScheme="blue" size="sm" onClick={handleUpdateSolicitacao}>
      SISAPP
    </Button>
  );
};

export default BotaoSisapp;
