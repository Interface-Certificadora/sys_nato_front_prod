/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { Box, Input, InputProps } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";

export interface InputResponsavelProps extends InputProps {
    setValueResponsavel?: string;
}
export default function InputResponsavel({ setValueResponsavel, ...props }: InputResponsavelProps) {
    
    const [responsavelLocal, setResponsavelLocal] = useState<string>("");


  useEffect(() => {
    if (!setValueResponsavel) return;
    const ValorSemAcentos = setValueResponsavel.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre.trim();
    const UpCase = RemosEspacosExtras.toUpperCase();

    setResponsavelLocal(UpCase);
  }, [setValueResponsavel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const ValorSemAcentos = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre;
    const UpCase = RemosEspacosExtras.toUpperCase();
    setResponsavelLocal(UpCase);
    props.onChange && props.onChange(e);
  };

  return (
    <>
        <Box>
          <Input {...props} value={responsavelLocal} type="text" onChange={handleChange} />
        </Box>
    </>
  );
}
