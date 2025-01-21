import { Box, Flex } from "@chakra-ui/react";
import { Metadata } from "next";
import { BugReport } from "@/components/bug";
import { FilterRoute } from "@/components/filter/filtro_route";
import PerfilHome from "@/components/perfil_home";
import { ModalPrimeAsses } from "@/components/prime_asses";

export const metadata: Metadata = {
  title: "HOME",
  description: "sistema de gestão de vendas de imóveis"
};
export default async function HomePage() {
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
      <Box
        w={{ base: "98%", xl: "80%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box justifyContent="center" alignItems="center">
          <PerfilHome />
        </Box>
        <Box>
          <FilterRoute />
        </Box>
      </Box>
    </Flex>
  );
}
