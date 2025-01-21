"use client";
import {
  Button,
  ButtonProps,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import Link from "next/link";

interface BtmConstrutoraListUserProps extends ButtonProps {
  data: any;
}

export function BtmConstrutoraListUser({
  data,
  ...props
}: BtmConstrutoraListUserProps) {
  console.log("🚀 ~ data:", data)
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} {...props}>
        {data.length}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista de Corretor e CCA</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {data.length > 0 &&
              data.map((item: any) => {
                return (
                  <Link href={`/usuario/${data.id}`} key={item.id}>
                    <Flex
                      key={item.id}
                      gap={2}
                      fontSize={"sm"}
                      px={5}
                      py={"0.3rem"}
                      _hover={{
                        cursor: "pointer",
                        bg: "gray.200",
                        borderRadius: "8px"
                      }}
                    >
                      nome:{" "}
                      <Text fontSize={"sm"} fontWeight={"bold"}>
                        {item.nome}
                      </Text>
                      , tipo: <Text fontWeight={"bold"}>{item.cargo}</Text>
                    </Flex>
                  </Link>
                );
              })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
