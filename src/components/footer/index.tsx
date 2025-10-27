"use client";

import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { FaPhoneVolume } from "react-icons/fa";
import { memo } from "react";

const FOOTER_BG = "#00713D";
const PHONE_NUMBER = "(16) 3325-4134";
const COPYRIGHT_TEXT = "Copyright © 2024 Rede BrasilRP";

export default memo(function FooterComponent() {
  return (
    <Flex
      w="100%"
      h="5vh"
      p="20px"
      bg={FOOTER_BG}
      justifyContent={{ base: "center", md: "space-evenly" }}
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      gap="5px"
      textAlign="center"
    >
      <Flex
        w={{ base: "100%", md: "33%" }}
        h="100%"
        gap="1rem"
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-start" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Text color="white">Precisa de Ajuda?</Text>
        <Button
          variant="link"
          color="white"
          leftIcon={<FaPhoneVolume />}
          size="sm"
        >
          {PHONE_NUMBER}
        </Button>
      </Flex>

      <Button variant="link" color="white" size="sm">
        <Link href="/suportefaq" isExternal>
          FAQ
        </Link>
      </Button>

      <Flex
        gap="1rem"
        justifyContent="center"
        mt={{ base: "10px", md: "0" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Button variant="link" color="white" size="sm">
          <Link href="/termos/uso">Termos de Uso</Link>
        </Button>
        <Button variant="link" color="white" size="sm">
          <Link href="/termos/privacidade">Politica de Privacidade</Link>
        </Button>
      </Flex>

      <Flex
        w={{ base: "100%", md: "33%" }}
        h="100%"
        gap="1rem"
        alignItems="center"
        justifyContent={{ base: "center", md: "flex-end" }}
        flexDirection={{ base: "column", md: "row" }}
        mt={{ base: "10px", md: "0" }}
      >
        <Text color="white">{COPYRIGHT_TEXT}</Text>
      </Flex>
    </Flex>
  );
});
