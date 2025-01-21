import GetEmpreendimentoById from "@/actions/empreendimento/service/getEmpreendimentoById";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { CardUpdateEmpreendimento } from "@/components/card_EditarEmpreendimento";
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
  const req = await GetEmpreendimentoById(Number(id));
  const data = req.data as { nome?: string };

  return {
    title: `Editar Empreendimento: ${data.nome || "Empreendimento"}`
  };
}

export default async function EditarEmpreendimento({ params }: Props) {
  const session = await getServerSession(auth);
  if (session?.user.hierarquia !== "ADM") {
    redirect("/");
  }
  const id = Number(params.id);
  const req = await GetEmpreendimentoById(id);
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
              <BotaoRetorno rota="/empreendimentos" />
            </Box>
            <Heading>Criar Empreendimento</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardUpdateEmpreendimento id={id} setEmpreendimentoCard={data} />
        </Box>
      </Flex>
    </>
  );
}
