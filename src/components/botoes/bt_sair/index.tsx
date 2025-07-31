"use client";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";

export default function BotaoSair() {
  const router = useRouter();

  const HandleSair = async (e: any) => {
    e.preventDefault();
    
    // MÉTODO RÁPIDO: Limpa cookies manualmente e redireciona imediatamente
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=");
      const name = eqPos > -1 ? c.substring(0, eqPos).trim() : c.trim();
      if (name.includes("next-auth")) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
    });
    
    // Redireciona imediatamente após limpar cookies
    router.push("/login");
    
    // Executa signOut em background (sem await) para limpeza adicional
    signOut({ redirect: false }).catch(console.error);
  };

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="sm"
      leftIcon={<HiOutlineLogout />}
      onClick={HandleSair}
    >
      SAIR
    </Button>
  );
}
