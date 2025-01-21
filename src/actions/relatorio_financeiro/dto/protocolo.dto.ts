export class ProtocoloDto {
  protocolo: string;

  constructor(protocolo: string) {
    this.protocolo = protocolo;
  }

  // Validação simples diretamente no DTO
  validar(): string | null {
    if (this.protocolo === undefined || typeof this.protocolo !== 'string') {
      return "O protocolo deve ser informado.";
    }
    return null;
  }
}
