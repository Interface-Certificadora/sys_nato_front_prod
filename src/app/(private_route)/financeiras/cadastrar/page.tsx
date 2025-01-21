import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Metadata } from "next";
import FinanceiraProvider from "@/provider/FinanceiraProvider";
import FinanceiraCreate from "@/actions/financeira/service/createFinanceira";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import BotaoCancelar from "@/components/botoes/btn_cancelar";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CADASTRO DE FINANCEIRA"
};

export default async function CadastrarFinanceira() {
    const session = await getServerSession(auth);
    if (session?.user.hierarquia !== "ADM") {
      redirect("/");
    }
  return (
    <>
      <Flex
        w={"100%"}
        minH={"90.9dvh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          w={"70%"}
          bg={"gray.50"}
          borderRadius={"1rem"}
          boxShadow={"lg"}
          p={8}
        >
          <Flex justifyContent={"space-between"}>
            <Box>
              <BotaoRetorno rota="/financeiras" />
            </Box>
            <Heading>Criar Financeira</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardCreateUpdate.Form action={FinanceiraCreate} method="POST">
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
              <FinanceiraProvider>
                <CardCreateUpdate.GridCnpj w={"15rem"} />
                <CardCreateUpdate.GridRazaoSocial w={"35rem"} />
                <CardCreateUpdate.GridRazaoSocialTel w={"10rem"} />
                <CardCreateUpdate.GridRazaoSocialEmail w={"30rem"} />
                <CardCreateUpdate.GridResponsavel w={"25rem"} />
                <CardCreateUpdate.GridFantasia w={"15rem"} />
              </FinanceiraProvider>
              <Spacer />
              <Button
                type="submit"
                mt={2}
                alignSelf={"center"}
                colorScheme="green"
                size="lg"
              >
                Salvar
              </Button>
              <BotaoCancelar
                mt={2}
                alignSelf={"center"}
                colorScheme="red"
                variant="outline"
                size="lg"
              />
            </Flex>
            <Divider my={4} borderColor="gray.300" />
            <Flex w={"full"} justifyContent={"end"}></Flex>
          </CardCreateUpdate.Form>
        </Box>
      </Flex>
    </>
  );
}
