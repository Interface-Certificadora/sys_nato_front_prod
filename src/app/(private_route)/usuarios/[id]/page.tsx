import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Metadata } from "next";
import { GetUser } from "@/actions/user/service";
import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { CardUpdateUsuario } from "@/components/card_update_usuario";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  const data = await GetUser(Number(id));

  return {
    title: `Editar Usuário: ${data?.nome || "Usuário"}`
  };
}

export default async function EditarUsuario({ params }: Props) {
  const session = await getServerSession(auth);
  if (session?.user.hierarquia !== "ADM") {
    redirect("/");
  }
  const id = Number(params.id);

  const data = await GetUser(id);

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
            <Heading>Editar Usuário</Heading>
            <Box> </Box>
          </Flex>
          <Divider my={4} borderColor="gray.300" />
          <CardUpdateUsuario id={id} setUsuarioCard={data} />
        </Box>
      </Flex>
    </>
  );
}
