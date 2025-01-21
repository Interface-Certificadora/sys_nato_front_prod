import { GetConstrutoraById } from "@/actions/construtora/service/getConstrutoraById";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { CardUpdateConstrutora } from "@/components/card_UpdateConstrutora";
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
  const req = await GetConstrutoraById(Number(id));
  const data = req.data;

  return {
    title: `Editar Construtora: ${data.fantasia || "Construtora"}`
  };
}

export default async function ConstrutoraById({ params }: Props) {
  const session = await getServerSession(auth);
  if (session?.user.hierarquia !== "ADM") {
    redirect("/");
  }
  const id = Number(params.id);
  const req = await GetConstrutoraById(id);
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
              <BotaoRetorno rota="/construtoras" />
            </Box>
            <Heading>Construtora</Heading>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardUpdateConstrutora id={id} setConstrutoraCard={data} />
        </Box>
      </Flex>
    </>
  );
}
