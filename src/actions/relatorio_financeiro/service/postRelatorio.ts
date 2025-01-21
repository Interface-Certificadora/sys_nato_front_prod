"use server";

import { PrismaClient } from "@prisma/client";
import { PostRelatorioDto } from "../dto/postRelatorio.dto";

const prisma = new PrismaClient();

  /**
   * Cria um novo relatório financeiro no banco de dados.
   * @param {object} data - Dados do relatório.
   * @param {number} data.situacao_pg - Situação de pagamento.
   * @param {string} [data.nota_fiscal] - Número da nota fiscal.
   * @param {number[]} data.solicitacao - Array de id's das solicitações.
   * @param {number} data.construtora - Id da construtora.
   * @returns {Promise<{ error: boolean, message: string, data: any }>}
   */
export async function PostRelatorio(data: any): Promise<{ error: boolean; message: string; data: any; }> {
  const dto = new PostRelatorioDto(
    data.situacao_pg,
    data.nota_fiscal,
    data.solicitacao,
    data.construtora,
    data.Inicio,
    data.Fim
  );

  // Validação usando o DTO
  const erroValidacao = dto.validar();
  if (erroValidacao) {
    return {
      error: true,
      message: erroValidacao,
      data: null
    };
  }

  try {
    const request = await prisma.nato_relatorio_financeiro.create({
      data: {
        situacao_pg: dto.situacao_pg,
        nota_fiscal: dto.nota_fiscal,
        solicitacao: JSON.stringify(dto.solicitacao),
        construtora: dto.construtora,
        start: new Date(dto.Inicio).toISOString(),
        end: new Date(dto.Fim).toISOString()
      }
    });

    return {
      error: false,
      message: "Relatório Salvo com sucesso.",
      data: request
    };
  } catch (error: any) {
    // Tratamento genérico de erro
    console.error("Erro ao buscar protocolo:", error.message);
    return {
      error: true,
      message: "Erro interno no servidor. " + error.message,
      data: null
    };
  } finally {
    await prisma.$disconnect();
  }
}
