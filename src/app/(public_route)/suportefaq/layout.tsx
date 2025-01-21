import FooterComponent from "@/components/footer";
import PublicHeader from "@/components/public_header";
import Sidebar from "@/components/sideBar";
import { Box, Flex } from "@chakra-ui/react";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <Flex
      minW="100vw"
      minH="100vh"
      direction="column"
    >
      <PublicHeader />
      <Flex h="90vh" overflowY="auto">
        <Sidebar />
        <Box flex="1" overflowY="auto">
          {children}
        </Box>
      </Flex>
      <FooterComponent />
    </Flex>
  );
}
