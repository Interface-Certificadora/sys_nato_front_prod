declare namespace solictacao {
  /**
   * SolicitacaoGetType
   * @param {number} id
   * @param {string} nome
   * @param {string} cpf
   * @param {string} email
   * @param {Date | string | any} dt_solicitacao
   * @param {object} corretor { id: number, nome: string }
   * @param {object} construtora { id: number, fantasia: string }
   * @param {string} telefone
   * @param {Date | string | any} dt_nascimento
   * @param {boolean} ass_doc
   * @param {string} link_doc
   * @param {number} id_fcw
   * @param {object} fcweb { id: number, andamento: string, dt_agenda: Date | string, hr_agenda: Date | string, valorcd: string, estatos_pgto: string }
   * @param {string} obs
   * @param {object} Financeira { id: number, fantasia: string }
   * @param {string} alert
   * @param {number} empreedimento { id: number, fantasia: string }
   * @param {string} cnh
   * @param {boolean} ativo
   * @param {string} uploadCnh
   * @param {string[]} relacionamento
   * @param {Date | string | any} createdAt
   * @param {Date | string | any} updatedAt
   * @param {string} telefone2
   * @param {string} uploadRg
   *
   */
  interface SolicitacaoGetType {
    filter(): unknown;
    nato_user: any;
    id: number;
    nome: string;
    cpf: string;
    email: string;
    dt_solicitacao: Date | string | any;
    Andamento: string;
    dt_aprovacao: string; 
    dt_agendamento: string;
    distrato_dt: string;
    distrato_id: number;
    hr_agendamento: string;
    type_validacao: string;
    corretor: {
      id: number;
      nome: string;
    };
    construtora: {
      length: number;
      id: number;
      fantasia: string;
    } | any;
    financeiro: {
      id: number;
      fantasia: string;
    } | any;
    telefone: string;
    dt_nascimento: Date | string | any;
    ass_doc?: string | any;
    link_doc: string | any;
    id_fcw: number;
    fcweb?: {
      id: number;
      andamento: string;
      dt_agenda: string | any;
      hr_agenda: string | any;
      valorcd: string;
      estatos_pgto: string;
      validacao: string;
      dt_aprovacao: string | any;
      vouchersoluti: string | any;
    };
    obs: string;
    alert: AlertProps[];
    empreedimento: {
      id: number;
      nome: string;
      cidade: string;
      uf: string;
      tag: string;
    } | any;
    cnh: string;
    ativo: boolean;
    distrato: boolean;
    uploadCnh: string;
    relacionamento: string[];
    createdAt: Date | string | any;
    updatedAt: Date | string | any;
    telefone2: string;
    uploadRg: string;
    distrato_id: number;
    logDelete: string;
    user: number;
    distrato_dt: Date | string | any;
    status_aprovacao: boolean;
    distrato_id: number;
    mult_link: string[];
    mult_ass_doc: string[];
    hr_aprovacao: string;
    tag: {
      id: number;
      descricao: string;
    }[],
    docSuspenso: string;
    alertanow: boolean;
    statusAtendimento: boolean
    pause: boolean
  }

  /**
   * SolicitacaoPutType
   * @param {string} nome
   * @param {string} cpf
   * @param {string} email
   * @param {number} corretor
   * @param {number} construtora
   * @param {string} telefone
   * @param {Date | string | any} dt_nascimento
   * @param {boolean} ass_doc
   * @param {string} link_doc
   * @param {number | null} id_fcw
   * @param {string} obs
   * @param {string} alert
   * @param {number} empreedimento
   * @param {number} Financeira
   * @param {string} cnh
   * @param {string} uploadCnh
   * @param {string[]} relacionamento
   * @param {string} telefone2
   * @param {string} uploadRg
   *
   */
  interface SolicitacaoPutType {
    nome?: string;
    cpf?: string;
    email?: string;
    corretor?: number;
    construtora?: number;
    Financeira?: number;
    telefone?: string;
    dt_nascimento?: Date | string | any;
    ass_doc?: boolean;
    link_doc?: string;
    id_fcw?: number | null;
    obs?: string;
    empreedimento?: number;
    cnh?: string;
    uploadCnh?: string;
    relacionamento?: string[];
    telefone2?: string;
    uploadRg?: string;
    mult_link?: string[];
    mult_ass_doc?: string[];
    rela_quest?: boolean;
  }
  /**
   * AlertProps
   * @param {number} id
   * @param {string} titulo
   * @param {string} texto
   * @param {number} solicitacao_id
   * @param {number} corretor
   * @param {string} tipo
   * @param {string} tag
   * @param {number} empreendimento
   */
  interface AlertProps {
    status: boolean | null | undefined;
    id: number;
    titulo: string;
    texto: string;
    solicitacao_id: number;
    corretor: number;
    tipo: string;
    tag: string;
    empreendimento: number;
    rela_quest: boolean;
    createdAt: Date | string | any;
  }

  interface SolicitacaoPost {
    nome: string;
    telefone: string;
    cpf: string;
    telefone2: string;
    dt_nascimento: Date | string | any;
    email: string;
    uploadRg?: string;
    uploadCnh?: string;
    empreedimento: number;
    construtora: number;
    financeiro: number;
    corretor: number;
    relacionamento: string[];
    cpfdois?: string;
    rela_quest?: boolean;
    voucher?: string;
    vendedorName?: string;
    obs?: string;
  }
}
