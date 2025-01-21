import CreateAlertGeral from "@/components/botoes/btn_creat_Alert_geral";
import GerarCobranca from "@/components/relatorio_finaceiro/gerar_cobranca";
import ListCobranca from "@/components/relatorio_finaceiro/list_cobranca";
import { auth } from "@/lib/auth_confg";
import { Divider, Flex, Heading, Link } from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "PAINEL ADMINISTRATIVO"
};

export default async function PainelAdministrativo() {
  const session = await getServerSession(auth);
  if (session?.user.hierarquia !== "ADM") {
    redirect("/");
  }
  return (
    <>
      <Flex w={"100%"} px={{ base: 2, md: "10rem" }} py={5} flexDir={"column"}>
        <Flex w={"100%"} justifyContent={"space-around"}>
          <Heading>Painel Administrativo</Heading>
          <Flex gap={2} alignItems="center">
            <CreateAlertGeral />
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none"}}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/usuarios"}
              fontSize={"0.8rem"}
            >
              Usuario 
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/construtoras"}
              fontSize={"0.8rem"}
            >
              Construtora
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/empreendimentos"}
              fontSize={"0.8rem"}
            >
              Empreendimentos
            </Link>
            <Link
              py={1}
              px={5}
              border="none"
              borderRadius="8px"
              bg={"green.600"}
              color={"white"}
              _hover={{ bg: "green.500", textDecoration: "none" }}
              boxShadow={"lg"}
              cursor={"pointer"}
              href={"/financeiras"}
              fontSize={"0.8rem"}
            >
              Financeiras
            </Link>
          </Flex>
        </Flex>
        <Divider my={5} />
        <Flex h={"80vh"} flexWrap={"wrap"} gap={2}>
          <GerarCobranca />
          <Flex w={{ md: "34%" }} h={"100%"} gap={3} flexDir={"column"}>
            <ListCobranca />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
