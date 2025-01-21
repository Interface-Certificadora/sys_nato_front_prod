"use client";

import DeleteConstrutora from "@/actions/construtora/service/deleteConstrutora";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BsFillTrashFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

interface BtnExcluirUserProps {
  id?: number;
  status?: boolean;
}
export default function BtmExcluirConstrutora({
  id,
  status
}: BtnExcluirUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const route = useRouter();

  const handleExcluir = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await DeleteConstrutora(Number(id));

    if (response.error === false) {
      toast({
        title: "Sucesso!",
        description: "Construtora excluído com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true
      });

      onClose();
      route.refresh();
    } else {
      toast({
        title: "Erro!",
        description: response.message,
        status: "error",
        duration: 9000,
        isClosable: true
      });

      onClose();
    }
  };

  return (
    <>
      {status ? (
        <>
          <Tooltip label="Excluir Construtora">
            <IconButton
              colorScheme="red"
              variant="outline"
              icon={<BsFillTrashFill />}
              aria-label="Delete"
              onClick={onOpen}
            />
          </Tooltip>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
              <ModalBody p={10}>
                <Text
                  fontWeight={"bold"}
                  fontSize={"20px"}
                  textAlign={"center"}
                >
                  Você tem certeza de que deseja deletar Esta Construtora?
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button leftIcon={<MdOutlineCancel />} onClick={onClose}>
                  Cancelar
                </Button>

                <Button
                  leftIcon={<BsFillTrashFill />}
                  onClick={handleExcluir}
                  colorScheme="red"
                >
                  Confirmar Exclusão
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </>
  );
}
