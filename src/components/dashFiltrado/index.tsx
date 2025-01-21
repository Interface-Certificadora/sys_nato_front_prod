"use client";
import {
  Box,
  Select,
  Button,
  useToast,
  Flex,
  Text,
  Divider,
  Spinner,
  Input
} from "@chakra-ui/react";
import { useState } from "react";
import PieChart from "../pieChart.tsx";
import DoughnutChart from "../doughnutChart";
import { useSession } from "next-auth/react";

interface DashFiltradoProps {
  construtoras: any;
  empreendimentos: any;
  financeiras: any;
}

export default function DashFiltrado({
  construtoras,
  empreendimentos,
  financeiras
}: DashFiltradoProps) {
  const [dataInicio, setDataInicio] = useState<string | null>(null);
  const [dataFim, setDataFim] = useState<string | null>(null);
  // const [mes, setMes] = useState<string | null>(null);
  // const [ano, setAno] = useState<string | null>(null);
  const [construtora, setConstrutora] = useState<string | null>(null);
  const [empreedimento, setEmpreendimento] = useState<string | null>(null);
  const [financeiro, setFinanceira] = useState<string | null>(null);
  const [dados, setDados] = useState<any | null>(null);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const hierarquia = session?.user?.hierarquia;

  const handleLimpar = async () => {
    nullValues();
    setDados(null);
  };

  const nullValues = () => {
    setDataInicio(null);
    setDataFim(null);
    setConstrutora(null);
    setEmpreendimento(null);
    setFinanceira(null);
  }
  const handleSubmit = async () => {
    setDados(null);
    setLoading(true);
    if (
      !construtora
    ) {
      toast({
        title: "Erro no Filtro",
        description: `Selecione uma Construtora`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
      nullValues();
      setLoading(false);
      return;
    }

    const data = {
      dataInicio,
      dataFim,
      construtora,
      empreedimento,
      financeiro
    };
    try {
      const req = await fetch(
        "https://dashboard.redebrasilrp.com.br/get/infos/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      if (!req.ok) {
        toast({
          title: "Erro no Filtro",
          description: `Não foi possível buscar os dados. Status: ${req.status} - ${req.statusText}`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        });
        nullValues();
        setLoading(false);
        return;
      } else {
        const result = await req.json();

        if(result.error) {
          toast({
            title: "Erro",
            description: result.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right"
          });
          nullValues();
          setDados(null);
          setLoading(false);
        }else{
          setLoading(false);
          setDados(result);
  
          toast({
            title: "Sucesso!",
            description: "Dados filtrados com sucesso.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro no Servidor",
        description:
          "Ocorreu um erro ao tentar buscar os dados. Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
      nullValues();
      setLoading(false);
      console.error("Erro:", error);
    }
  };

  return (
    <>
      {/* filtro apenas para adm */}
      {hierarquia == "ADM" && (
        <>
          <Box display={"flex"} justifyContent={"center"} gap={2} w={"100%"}>
          <Input placeholder='Select Date and Time' width={"10%"} size='md' type='date' onChange={(e) => setDataInicio(e.target.value)}/>
          <Input placeholder='Select Date and Time' w={'10%'} size='md' type='date' onChange={(e) => setDataFim(e.target.value)}/>

            <Select
              w={"200px"}
              value={construtora || ""}
              onChange={(e) => setConstrutora(e.target.value || null)}
            >
              <option value="">Construtora</option>
              {construtoras?.map((construtora: any) => (
                <option key={construtora.id} value={construtora.id}>
                  {construtora.fantasia}
                </option>
              ))}
            </Select>
            <Select
              w={"200px"}
              placeholder="Empreendimento"
              onChange={(e) => setEmpreendimento(e.target.value)}
            >
              {empreendimentos?.map((empreendimento: any) => (
                <option key={empreendimento.id} value={empreendimento.id}>
                  {empreendimento.nome}
                </option>
              ))}
            </Select>
            <Select
              w={"200px"}
              placeholder="Financeira"
              onChange={(e) => setFinanceira(e.target.value)}
            >
              {financeiras?.map((financeira: any) => (
                <option key={financeira.id} value={financeira.id}>
                  {financeira.fantasia}
                </option>
              ))}
            </Select>
            <Button
              shadow={"md"}
              size={"sm"}
              colorScheme={"teal"}
              onClick={handleSubmit}
            >
              Filtrar
            </Button>
            <Button
              shadow={"md"}
              size={"sm"}
              colorScheme={"blue"}
              onClick={handleLimpar}
            >
              Limpar
            </Button>
          </Box>
        </>
      )}

      {/* filtro para todos */}
      {hierarquia !== "ADM" && (
        <>
          <Box display={"flex"} justifyContent={"center"} gap={2} w={"100%"}>
          <Input placeholder='Select Date and Time' width={"10%"} size='md' type='date' onChange={(e) => setDataInicio(e.target.value)}/>
          <Input placeholder='Select Date and Time' w={'10%'} size='md' type='date' onChange={(e) => setDataFim(e.target.value)}/>
            <Select
              w={"200px"}
              value={construtora || ""}
              onChange={(e) => setConstrutora(e.target.value || null)}
            >
              <option value="">Construtora</option>
              {construtoras?.map((construtora: any) => (
                <option key={construtora.id} value={construtora.id}>
                  {construtora.fantasia}
                </option>
              ))}
            </Select>
            <Select
              w={"200px"}
              value={empreedimento || ""}
              onChange={(e) => setEmpreendimento(e.target.value || null)}
            >
              <option value="">Empreendimento</option>
              {empreendimentos?.map((empreendimento: any) => (
                <option key={empreendimento.id} value={empreendimento.id}>
                  {empreendimento.nome}
                </option>
              ))}
            </Select>
            {/* <Select w={"200px"} placeholder="Financeira" onChange={(e) => setFinanceira(e.target.value)}>
          {financeiras?.map((financeira: any) => (
            <option key={financeira.id} value={financeira.id}>
              {financeira.fantasia}
            </option>
          ))}
        </Select> */}
            <Button
              shadow={"md"}
              size={"sm"}
              colorScheme={"teal"}
              onClick={handleSubmit}
            >
              Filtrar
            </Button>
            <Button
              shadow={"md"}
              size={"sm"}
              colorScheme={"blue"}
              onClick={handleLimpar}
            >
              Limpar
            </Button>
          </Box>
        </>
      )}

      <Flex
        alignItems="flex-start"
        w="100%"
        gap={{ base: 4, md: 6 }}
        flexDir={{ base: "column", md: "row" }}
        justify="center"
        flexWrap="wrap"
      >
        {dados ? (
          <>
            <Flex
              w="100%"
              maxW="950px"
              h="auto"
              gap={2}
              bg="white"
              flexDirection={"column"}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-around"}
                p={5}
                bg="white"
                borderRadius="md"
                boxShadow="md"
              >
                <Flex flexDirection={"row"} gap={1}>
                  <Text fontSize="xl" color={"#00713C"}>
                    Quantidade de Certificados:
                  </Text>
                  <Text fontSize="xl" color={"#1D1D1B"}>
                    {dados ? dados.total_solicitacao : null}
                  </Text>
                </Flex>
                <Flex flexDirection={"row"} gap={1}>
                  <Text fontSize="xl" color={"#00713C"}>
                    Media de Horas/Certificado:
                  </Text>
                  <Text fontSize="xl" color={"#1D1D1B"}>
                    {dados ? dados.time : null}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </>
        ) : null}
        <Divider />

        {/* Gráficos de Pizza */}
        {dados ? (
          <Flex
            flexDirection="row"
            maxW={"1000px"}
            flexWrap={"wrap"}
            gap={4}
            justifyContent={"center"}
          >
            <PieChart
              title="Quantidade de RG e CNH"
              colors={["#1D1D1B", "#00713C"]}
              labels={["RG", "CNH"]}
              dataValues={dados ? [dados.rg, dados.cnh] : []}
            />
            {dados.suporte ? (
              <Box w="60%" h="250px">
                <DoughnutChart
                  labels={
                    dados.suporte_tag
                      ? dados.suporte_tag.map(
                          (item: string) => item.split(" = ")[0]
                        )
                      : null
                  }
                  dataValues={
                    dados.suporte_tag
                      ? dados.suporte_tag.map((item: string) =>
                          Number(item.split(" = ")[1])
                        )
                      : null
                  }
                  title={`Total Suporte : ${dados.suporte ? dados.suporte : 0}`}
                />
              </Box>
            ) : null}
            <PieChart
              title="Video Conferencia e Presencial"
              colors={["#00713C", "#1D1D1B"]}
              labels={["Video Conf.", "Presencial"]}
              dataValues={dados ? [dados.total_vc, dados.total_int] : []}
            />
            {dados.erros ? (
              <Box w="60%" h="250px">
                <DoughnutChart
                  labels={
                    dados.erros_tag
                      ? dados.erros_tag.map(
                          (item: string) => item.split(" = ")[0]
                        )
                      : null
                  }
                  dataValues={
                    dados.erros_tag
                      ? dados.erros_tag.map((item: string) =>
                          Number(item.split(" = ")[1])
                        )
                      : null
                  }
                  title={`Total Erros : ${dados.erros ? dados.erros : 0}`}
                />
              </Box>
            ) : null}
          </Flex>
        ) : null}
        {loading ? (
          <Spinner
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.500"
            h={"100px"}
            w={"100px"}
            size="xl"
          />
        ) : null}
      </Flex>
    </>
  );
}
