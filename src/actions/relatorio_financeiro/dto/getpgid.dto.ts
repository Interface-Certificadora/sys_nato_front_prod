export class GetPgIdDto {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  // Validação simples diretamente no DTO
  validar(): string | null {
    if (this.id <= 0) {
      return "O id deve ser informado.";
    }
    return null;
  }
}
