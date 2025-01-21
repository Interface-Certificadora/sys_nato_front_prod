"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { SiGoogleforms } from "react-icons/si";

export default function BotaoNovaSolicita() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/solicitacoes");
  };

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="sm"
      leftIcon={<SiGoogleforms />}
      onClick={handleClick}
    >
      NOVA SOLICITAÇÃO
    </Button>
  );
}
