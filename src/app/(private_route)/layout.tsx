import BotaoJuncao from "@/components/botoes/bt_juncao";
import FooterComponent from "@/components/footer";
import { Box, Flex } from "@chakra-ui/react";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal para rotas privadas (autenticadas)
 * Server Component - renderizado no servidor
 * Componentes filhos (BotaoJuncao e FooterComponent) são Client Components otimizados com React.memo
 */
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <Flex
      w="100vw"
      h="100vh"
      justifyContent="space-between"
      flexDir="column"
    >
      {/* Header com navegação - Client Component otimizado */}
      <BotaoJuncao />

      {/* Área de conteúdo principal com scroll */}
      <Box h="90vh" overflowY="auto">
        {children}
      </Box>

      {/* Footer - Client Component otimizado */}
      <FooterComponent />
    </Flex>
  );
}
