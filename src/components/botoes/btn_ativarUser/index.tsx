"use client";
import { ativarUsuario } from "@/actions/user/service/ativarUsuario";
import { IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { VscActivateBreakpoints } from "react-icons/vsc";

interface BtnAtivarUserProps {
  id: number;
}

export function BtnAtivarUser({ id }: BtnAtivarUserProps) {
  const toast = useToast();

  const handleAtivarUsuario = async (id: number) => {
    const response = await ativarUsuario(id);
    if (response.error) {
      toast({
        title: "Erro",
        description: response.message,
        status: "error",
        duration: 2000,
        position: "top-right"
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast({
        title: "Sucesso",
        description: response.message,
        status: "success",
        duration: 2000,
        position: "top-right"
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <Tooltip label="Ativar Login Usuário">
        <IconButton
          colorScheme="green"
          variant="outline"
          icon={<VscActivateBreakpoints />}
          aria-label="Ativar"
          onClick={() => handleAtivarUsuario(id)}
        />
      </Tooltip>
    </>
  );
}
