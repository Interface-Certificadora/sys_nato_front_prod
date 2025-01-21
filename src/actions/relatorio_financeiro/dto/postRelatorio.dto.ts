export class PostRelatorioDto {
  situacao_pg: number;
  nota_fiscal?: string;  // Opcional
  solicitacao: number[];
  construtora: number;
  Inicio: string;
  Fim: string;

  constructor(situacao_pg: number, nota_fiscal: string | undefined, solicitacao: number[], construtora: number, Inicio: string, Fim: string) {
    this.situacao_pg = situacao_pg;
    this.nota_fiscal = nota_fiscal;
    this.solicitacao = solicitacao;
    this.construtora = construtora;
    this.Inicio = Inicio;
    this.Fim = Fim;

  }

  // Validação
  validar(): string | null {
    // Validação da construtora
    if (!Number.isInteger(this.construtora) || this.construtora <= 0) {
      return "A construtora deve ser informada.";
    }
    // Validação da situação de pagamento
    if (!Number.isInteger(this.situacao_pg) || this.situacao_pg < 0 || this.situacao_pg > 2) {
      return "A situação de pagamento deve ser 0, 1 ou 2.";
    }

    // Validação da nota fiscal (se enviada, deve ser uma string)
    if (this.nota_fiscal !== undefined && typeof this.nota_fiscal !== 'string') {
      return "A nota fiscal deve ser uma string.";
    }

    // Validação da solicitação (deve ser um array de números)
    if (!Array.isArray(this.solicitacao) || this.solicitacao.length === 0) {
      return "A solicitação deve ser um array de números e não pode estar vazio.";
    }

    // Validação do Inicio tem que ser uma string que possa ser convertida em uma data
    if (typeof this.Inicio !== 'string') {
      const dataInicio = new Date(this.Inicio);
      if (isNaN(dataInicio.getTime())) {
        return "A data de início deve ser uma string que possa ser convertida em uma data.";
      }
    }

    // Validação do Fim tem que ser uma string que possa ser convertida em uma data
    if (typeof this.Fim !== 'string') {
      const dataFim = new Date(this.Fim);
      if (isNaN(dataFim.getTime())) {
        return "A data de fim deve ser uma string que possa ser convertida em uma data.";
      }
    }

    //validar se Fim eh maior que Inicio
    const dataInicio = new Date(this.Inicio);
    const dataFim = new Date(this.Fim);
    if (dataInicio > dataFim) {
      return "A data de início nao pode ser maior que a data de fim.";
    }

    for (const item of this.solicitacao) {
      if (typeof item !== 'number') {
        return "Cada item da solicitação deve ser um número.";
      }
    }

    return null;
  }
}
