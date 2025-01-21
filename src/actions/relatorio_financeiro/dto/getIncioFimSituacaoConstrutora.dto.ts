export class DetIncioFimSituacaoConstrutoraDto {
  construtora: number;
  inicio: string;
  fim: string;
  situacao: number;
  empreedimento: number;

  /**
   * Cria um novo objeto DetIncioFimSituacaoConstrutoraDto.
   * @param {number} construtora - Id da construtora.
   * @param {number} empreedimento - Id do empreendimento.
   * @param {string} inicio - Data de início no formato "yyyy-mm-dd".
   * @param {string} fim - Data de fim no formato "yyyy-mm-dd".
   * @param {number} situacao - Id da situação de pagamento.
   */
  constructor(
    construtora: number,
    empreedimento: number,
    inicio: string,
    fim: string,
    situacao: number,
  ) {
    this.construtora = construtora;
    this.empreedimento = empreedimento;
    this.inicio = inicio;
    this.fim = fim;
    this.situacao = situacao;
  }

  // Validação simples
  validar(): string | null {
    // Valida se construtora e situacao são números
    if (!Number.isInteger(this.construtora) || this.construtora <= 0) {
      return "A construtora deve ser definido.";
    }
    if (!Number.isInteger(this.empreedimento)) {
      return "Defina um empreendimento.";
    }
    if (!Number.isInteger(this.situacao) || this.situacao < 0) {
      return "A situação deve ser definido.";
    }

    // Valida se as datas inicio e fim são válidas
    const dataInicio = new Date(this.inicio);
    const dataFim = new Date(this.fim);

    if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
      return "As datas de início e fim devem ser válidas.";
    }

    if (dataInicio > dataFim) {
      return "A data de início não pode ser maior que a data de fim.";
    }

    return null;
  }
}
