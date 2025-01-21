"use client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { AiFillProduct } from "react-icons/ai";

export default function BotaoPainelAdm() {
  const router = useRouter();

  return (
    <Button
      textColor={"white"}
      variant="link"
      size="sm"
      leftIcon={<AiFillProduct />}
      onClick={() => router.push("/adm")}
    >
      PAINEL ADM
    </Button>
  );
}
