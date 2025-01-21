import "next-auth";

declare module "next-auth" {
  interface Session {
    token: string;
    expiration: number;
    user: {
      Financeira: Financeira[];
      id: number;
      name: string;
      construtora: construtora[];
      telefone: string;
      empreendimento: empreendimento[];
      hierarquia: string;
      cargo: string;
      reset_password: boolean;
      termos: boolean;
    };
  }

  interface construtora {
    id: number;
    fantasia: string;
  }

  interface empreendimento {
    id: number;
    nome: string;
  }

  interface Financeira {
    id: number;
    fantasia: string;
  }
}

declare namespace SessionUserType {
  interface Geral {
    token: string;
    expiration: number;
    user: User;
  }

  interface User {
    Financeira: Financeira[];
    id: number;
    name: string;
    construtora: construtora[];
    telefone: string;
    empreendimento: empreendimento[];
    hierarquia: string;
    cargo: string;
    reset_password: boolean;
  }

  interface construtora {
    id: number;
    fantasia: string;
  }

  interface empreendimento {
    id: number;
    nome: string;
  }

  interface Financeira {
    id: number;
    fantasia: string;
  }
}
