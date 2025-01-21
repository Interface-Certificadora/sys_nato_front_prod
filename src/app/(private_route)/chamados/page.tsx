import { TabelaChamados } from "@/components/tabelaChamados";
import { auth } from "@/lib/auth_confg";
import { Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";

export const metadata: Metadata = {
  title: "CHAMADOS",
  description: "sistema de suporte",
};

export default async function ChamadosPage() {
  const session = await getServerSession(auth);
  const userHierarquia = session?.user.hierarquia;

  const idUser = session?.user.id;

  async function isAdm(id: any) {
    if (userHierarquia === "ADM") {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado`, {
        method: "GET",
          headers: {
             Authorization: `Bearer ${session?.token}`
        }
      });
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.statusText}`);
      }

      const data = await res.json();
      return data; 
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado/pesquisar?idUser=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
      if(!res.ok){
        throw new Error(`Erro na requisição: ${res.statusText}`);
      }
      const data = await res.json();
      return data; 
    }
  }

  const chamados = await isAdm(idUser);

  return (
    <Flex
      minH="100vh"
      w="100%"
      justifyContent="center"
      alignItems="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <TabelaChamados chamados={chamados} registrosPorPagina={10} />
    </Flex>
  );
}
