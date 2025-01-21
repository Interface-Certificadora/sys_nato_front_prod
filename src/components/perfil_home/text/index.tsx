"use client";

import { Flex, Text } from "@chakra-ui/react";

interface TextProps {
  SetValue: any;
  SetName: string;
}

export default function TextHome({ SetValue, SetName }: TextProps) {
  return (
    <Flex alignItems={"center"} w={"full"} gap={'0.6rem'} py={'0.5rem'}>
      <Text textColor={"#00713D"}  fontWeight={"bold"}>
        {SetName}:
      </Text>
      <Text fontSize={"0.9rem"}>{SetValue}</Text>
    </Flex>
  );
}
