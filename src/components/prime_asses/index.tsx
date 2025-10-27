"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { SenhaComponent } from "../Senha";

export const ModalPrimeAsses = memo(() => {
  const [Senha, setSenha] = useState("");
  const [ConfirmeSenha, setConfirmeSenha] = useState("");
  const toast = useToast();
  const { data: session } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const primeiro_asseso = session?.user?.reset_password;
  const ID = session?.user?.id;

  useEffect(() => {
    let isMounted = true;

    if (primeiro_asseso && ID) {
      (async () => {
        try {
          const request = await fetch(`/api/usuario/getId/${ID}`);
          const data = await request.json();
          if (isMounted && data.reset_password) {
            onOpen();
          }
        } catch (error) {
          console.error("Erro ao verificar primeiro acesso:", error);
        }
      })();
    }

    return () => {
      isMounted = false;
    };
  }, [ID, onOpen, primeiro_asseso]);

  const overlayElement = useMemo(
    () => (
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="80%"
      />
    ),
    []
  );

  const handleSubmit = useCallback(
    async (e?: { preventDefault: () => void }) => {
      e?.preventDefault();

      if (Senha !== ConfirmeSenha) {
        toast({
          title: "Erro!",
          description: "As senhas devem ser iguais!",
          status: "error",
          duration: 3000,
          isClosable: true
        });
        return;
      }

      try {
        const request = await fetch(`/api/reset_password/${ID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password: Senha })
        });

        if (request.ok) {
          toast({
            title: "Sucesso!",
            description: "Senha atualizada com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true
          });
          onClose();
        } else {
          toast({
            title: "Erro!",
            description: "Erro ao atualizar senha!",
            status: "error",
            duration: 3000,
            isClosable: true
          });
        }
      } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        toast({
          title: "Erro!",
          description: "Erro ao atualizar senha!",
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
    },
    [Senha, ConfirmeSenha, ID, toast, onClose]
  );

  const handleSenhaChange = useCallback((value: string) => {
    setSenha(value);
  }, []);

  const handleConfirmeSenhaChange = useCallback((value: string) => {
    setConfirmeSenha(value);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        {overlayElement}
        <ModalOverlay />
        <ModalContent bg={"gray.100"}>
          <ModalHeader>Atualização de senha</ModalHeader>
          <FormControl>
            <ModalBody>
              <Box>
                <FormLabel>Nova senha</FormLabel>
                <SenhaComponent
                  onvalue={handleSenhaChange}
                  setvalue={Senha}
                />
              </Box>
              <Box mt={4}>
                <FormLabel>Confirmação de senha</FormLabel>
                <SenhaComponent
                  onvalue={handleConfirmeSenhaChange}
                  setvalue={ConfirmeSenha}
                  envClick={handleSubmit}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} onClick={handleSubmit}>
                Enviar
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
});
