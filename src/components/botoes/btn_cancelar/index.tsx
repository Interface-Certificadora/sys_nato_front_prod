"use client";

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface BotaoCancelarProps {
  mt?: number | string;
  alignSelf?: string;
  colorScheme?: string;
  variant?: string;
  size?: string;
}

export default function BotaoCancelar({
  mt,
  alignSelf,
  colorScheme,
  variant,
  size
}: BotaoCancelarProps) {
  const router = useRouter();

  return (
    <Button 
      onClick={() => router.back()}
      mt={mt}
      alignSelf={alignSelf}
      colorScheme={colorScheme}
      variant={variant}
      size={size}
    >
      Cancelar
    </Button>
  );
}
