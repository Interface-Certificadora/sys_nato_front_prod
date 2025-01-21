import { CreateEmpreendimento } from "@/actions/empreendimento/service/createEmpreendimento";
import BotaoCancelar from "@/components/botoes/btn_cancelar";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { CardCreateUpdate } from "@/implementes/cardCreateUpdate";
import EmpreendimentoProvider from "@/provider/EmpreendimentoProvider";
import { Box, Button, Divider, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "CADASTRO DE EMPREENDIMENTO"
};

export default async function CadastrarEmpreendimento() {
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
              <BotaoRetorno rota="/empreendimentos" />
            </Box>
            <Heading>Criar Empreendimento</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardCreateUpdate.Form action={CreateEmpreendimento} method="POST">
            <Flex w={"full"} flexWrap={"wrap"} gap={5}>
              <EmpreendimentoProvider>
                <CardCreateUpdate.GridEmpreendimentoConstrutora w={"13rem"} />
                <CardCreateUpdate.GridEmpreendimentoNome w={"25rem"} />
                <CardCreateUpdate.GridEmpreendimentoCidade w={"15rem"} />
                <CardCreateUpdate.GridEmpreendimentoUf w={"3rem"} />
                <CardCreateUpdate.GridEmpreendimentoFinanceiro w={"20rem"} />
              </EmpreendimentoProvider>
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
