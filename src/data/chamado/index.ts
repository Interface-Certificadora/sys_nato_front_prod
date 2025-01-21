export type Chamado = {
    id: number;
    Label: string;
};


export const ChamadoOptions: Chamado[] = [
    {
        id : 0,
        Label: 'ABERTO',
    },
    {
        id: 1,
        Label: 'EM ANDAMENTO',
    },
    {
        id: 2,
        Label: 'ENVIADO PARA NIVEL 2',
    },
    {
        id: 3,
        Label: 'CONCLUIDO',

    },
]