"use client";

import { FiltroComponent } from "../filtro_geral";
import { Box, CircularProgress, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tabela } from "../../tabela";
interface FiltroData {
  id: number | null;
  nome: string;
  andamento: string;
  empreendimento: number;
  construtora: number;
  financeira: number;
}

export const FilterRoute = () => {
  const [DataFilter, setDataFilter] = useState<FiltroData>({} as FiltroData);
  const [Dados, setDados] = useState<solictacao.SolicitacaoGetType[]>(
    [] as any
  );
  const [Total, setTotal] = useState<number | null>(null);
  const [PagAtual, setPagAtual] = useState<number>(0);
  const [Load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const req = await fetch("/api/solicitacao/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        next: {
          tags: ["get_solicitacao_all"]
        }
      });
      const data = await req.json();
      if (req.ok) {
        setDados(data.data);
        setTotal(data.total);
        setPagAtual(data.page);
      }
    })();
  }, []);

  const handleFilter = (filtroData: FiltroData) => {
    setDataFilter(filtroData);
  };

  useEffect(() => {
    (async () => {
      setLoad(true);
      let Filter = "";
      if (DataFilter.nome) {
        Filter += `nome=${DataFilter.nome}&`;
      }
      if (DataFilter.andamento) {
        Filter += `andamento=${DataFilter.andamento}&`;
      }
      if (DataFilter.construtora > 0) {
        Filter += `construtora=${DataFilter.construtora}&`;
      }
      if (DataFilter.empreendimento > 0) {
        Filter += `empreedimento=${DataFilter.empreendimento}&`;
      }
      if (DataFilter.financeira > 0) {
        Filter += `financeiro=${DataFilter.financeira}&`;
      }
      if (DataFilter.id) {
        Filter += `id=${DataFilter.id}&`;
      }
      if (PagAtual > 0) {
        Filter += `pagina=${PagAtual}&`;
      }
      const Url = Filter
        ? `/api/solicitacao/getall?${Filter}`
        : `/api/solicitacao/getall`;

      const req = await fetch(Url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        cache: "no-store"
      });
      const data = await req.json();
      if (req.ok) {
        setDados(data.data);
        setTotal(data.total);
      }
      setLoad(false);
    })();
  }, [DataFilter, PagAtual]);

  const NewPageFunction = (e: any) => {
    setPagAtual(e);
  };

  if (Load) {
    return (
      <Flex
        w={"100%"}
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress
          size="10rem"
          p={10}
          isIndeterminate
          color="green.300"
        />
      </Flex>
    );
  }
  return (
    <>
      <Box w="100%" py={5}>
        <FiltroComponent onData={handleFilter} />
      </Box>
      <Flex justifyContent="center" alignItems="center">
        <Tabela
          ClientData={Dados}
          AtualPage={PagAtual}
          SetVewPage={NewPageFunction}
          total={Total}
        />
      </Flex>
    </>
  );
};
