import { BugReport } from "@/components/bug";
import { FilterRoute } from "@/components/filter/filtro_route";
import PerfilHome from "@/components/perfil_home";
import { ModalPrimeAsses } from "@/components/prime_asses";
import TermosPage from "@/components/termos";
import { auth } from "@/lib/auth_confg";
import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "HOME",
  description: "sistema de gestão de vendas de imóveis"
};

export default async function HomePage() {
  const session = await getServerSession(auth);
  const token = session?.token;

  if (!session) {
    window.location.href = "/login";
  }

  const req = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      cache: "no-store"
    }
  );
  const data = await req.json();

  return (
    <Flex
      minH="100vh"
      w="100%"
      justifyContent="center"
      alignItems="center"
      bg="#F8F8F8"
      py="2rem"
    >
      <BugReport />
      <ModalPrimeAsses />
      <TermosPage />
      <Box
        w={{ base: "98%", xl: "80%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box justifyContent="center" alignItems="center">
          <PerfilHome />
        </Box>
        <Box>
          <FilterRoute data={data as any} />
        </Box>
      </Box>
    </Flex>
  );
}
