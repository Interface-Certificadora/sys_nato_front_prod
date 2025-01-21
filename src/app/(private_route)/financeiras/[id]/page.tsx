import { GetFinanceiraById } from "@/actions/financeira/service/getFinanceiraById";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { CardUpdateFinanceira } from "@/components/card_EditarFinanceira";
import { auth } from "@/lib/auth_confg";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const req = await GetFinanceiraById(Number(id));
  const data = req.data;

  return {
    title: `Editar Financeira: ${data.fantasia || "Usuário"}`
  };
}

export default async function EditarUsuario({ params }: Props) {
    const session = await getServerSession(auth);
    if (session?.user.hierarquia !== "ADM") {
      redirect("/");
    }
  const id = Number(params.id);

  const req = await GetFinanceiraById(id);
  const data = req.data;

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
              <BotaoRetorno rota="/usuarios" />
            </Box>
            <Heading>Editar Financeira</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardUpdateFinanceira id={id} setFinanceiraCard={data} />
        </Box>
      </Flex>
    </>
  );
}
