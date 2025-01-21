import { GetAllFinanceiras } from "@/actions/financeira/service/getAllFinanceiras";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import Financeiras from "@/components/financeirasCard";
import { auth } from "@/lib/auth_confg";
import { Box, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "FINANCEIRAS"
};

export default async function PainelFinanceiro() {
    const session = await getServerSession(auth);
    if (session?.user.hierarquia !== "ADM") {
      redirect("/");
    }
  const dados = await GetAllFinanceiras();
  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        px={{ base: 2, md: "10rem" }}
        py={5}
        flexDir={"column"}
      >
        <Flex w={"100%"} justifyContent={"space-around"}>
          <Flex gap={2}>
            <Box zIndex={1} alignSelf="baseline" position="initial">
              <BotaoRetorno rota="/" />
            </Box>
            <Heading> </Heading>
          </Flex>
          <Flex gap={5}>
            <Link
              href={"/financeiras/cadastrar"}
              _hover={{ textDecoration: "none" }}
            >
              <Box
                py={2}
                px={7}
                border="3px solid green.600"
                borderRadius="8px"
                bg={"green.600"}
                color={"white"}
                _hover={{ bg: "green.500" }}
                boxShadow={"lg"}
                cursor={"pointer"}
              >
                Criar Financeira
              </Box>
            </Link>
          </Flex>
        </Flex>
        <Divider my={5} />
        <Box ml={4}>
          <Text fontSize="25px" fontWeight="bold" color="#333333">
            FINANCEIRAS CADASTRADAS
          </Text>
        </Box>
        <Box w={"100%"}>
          <Flex
            w={"100%"}
            mb={8}
            justifyContent="center"
            alignItems="center"
          ></Flex>
          <Box>
            {dados?.status === 200 ? <Financeiras data={dados?.data} /> : <></>}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
