"use client";
import { Flex, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default function BotaoHome() {
  const router = useRouter();

  return (
    <Flex>
      <Box
        h={"100%"}
        borderRadius={"15px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Button
          textColor={"white"}
          variant="link"
          size="sm"
          leftIcon={<FaHome />}
          onClick={() => router.push("/")}
        >
          HOME
        </Button>
      </Box>
    </Flex>
  );
}
