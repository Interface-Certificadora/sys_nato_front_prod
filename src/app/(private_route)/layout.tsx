import BotaoJuncao from "@/components/botoes/bt_juncao";
import FooterComponent from "@/components/footer";
import { Box, Flex } from "@chakra-ui/react";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <Flex w="100vw" h="100vh" justifyContent="space-between" flexDir="column">
      <BotaoJuncao />
      <Box h="90vh" overflowY="auto">
        {children}
      </Box>
      <FooterComponent />
    </Flex>
  );
}
