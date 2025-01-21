"use client";

import { AtualizarData } from "@/actions/relatorio_financeiro/service/AtualizarData";
import { AtualizarFcw } from "@/actions/relatorio_financeiro/service/AtualizarFcw";
import { AtualizarStatus } from "@/actions/relatorio_financeiro/service/AtualizarStatus";
import { GetProtocolo } from "@/actions/relatorio_financeiro/service/getProtocolo";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Text,
  useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function ConfirPg() {
  const { data: session } = useSession();
  const toast = useToast();
  const router = useRouter();
  const [ProtocoloNumber, setProtocoloNumber] = useState("");
  const [totalArray, setTotalArray] = useState<any | null>(null);

  async function handlePesquisaProtocolo() {
    const dados = await GetProtocolo(ProtocoloNumber);
    if (dados.error) {
      toast({
        title: "Erro",
        description: dados.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    console.log(dados.data);
    if (!dados.error) setTotalArray(dados.data);
  }

  async function ConfirmePg() {
    await AtualizarFcw(totalArray?.solicitacao);
    await AtualizarData(totalArray?.solicitacao);
    const Atualizar = await AtualizarStatus(totalArray?.id);
    console.log("🚀 ~ ConfirmePg ~ Atualizar:", Atualizar)
    if (Atualizar.error) {
      toast({
        title: "Erro",
        description: Atualizar.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    if (!Atualizar.error) {
      toast({
        title: "Sucesso",
        description: Atualizar.message,
        status: "success",
        duration: 3000,
        isClosable: true
      });
      router.refresh();
    }
  }

  return (
    <>
      {session?.user?.hierarquia === "ADM" ? (
        <>
          <style>
            {` 
        tr:nth-child(even) {
          background-color: #dddddd;
        }
        
        td {
         padding-inline: 5px;
         font-size: 0.8rem;
        }

      `}
          </style>
          <Box  w={"full"} minH={'fit-content'} minW={'fit-content'} p={5} rounded="lg" boxShadow="2xl">
            <Box w={"100%"} textAlign={"center"}>
              <Heading size="md">Registrar Pagamento</Heading>
            </Box>
            <Flex
              w={"100%"}
              flexDir={"column"}
              justifyContent={"space-between"}
            >
              <Flex
                w={"100%"}
                h={"11vh"}
                p={3}
                mt={2}
                gap={2}
                flexDir={"column"}
                borderBottom={"1px solid #000"}
              >
                {totalArray && (
                  <>
                    <Text>Protocolo: {ProtocoloNumber}</Text>
                    <Text>
                      Expedido em:{" "}
                      {totalArray?.createdAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </Text>
                    {totalArray?.construtora?.fantasia && (
                      <>
                        <Text>
                          Construtora: {totalArray?.construtora?.fantasia}
                        </Text>
                      </>
                    )}
                    {totalArray?.solicitacao.length > 0 && (
                      <>
                        <Text>
                          Total de cadastros afetados:{" "}
                          {totalArray?.solicitacao.length}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </Flex>
              <Flex
                w={"100%"}
                p={3}
                gap={2}
                alignItems={"end"}
                justifyContent={"space-between"}
              >
                <Box>
                  <FormLabel m={0}>Protocolo: </FormLabel>
                  <Flex gap={2}>
                    <Input
                      type="text"
                      size={"sm"}
                      w={"9rem"}
                      rounded={"lg"}
                      onChange={(e) => setProtocoloNumber(e.target.value)}
                    />
                    <IconButton
                      aria-label={""}
                      icon={<IoSearch />}
                      colorScheme="blue"
                      size={"sm"}
                      onClick={handlePesquisaProtocolo}
                    />
                  </Flex>
                </Box>
                <Button minW={'fit-content'} onClick={ConfirmePg}>Confirmar Pagamento</Button>
              </Flex>
            </Flex>
          </Box>
        </>
      ) : null}
    </>
  );
}
