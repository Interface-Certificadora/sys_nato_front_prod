"use client";

import { Box, Input, InputProps } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";

export interface InputUserProps extends InputProps {
  setValueUser?: string;
}

type InputUserType = {
UserContex: string;
  seUserContex: React.Dispatch<React.SetStateAction<string>>;
};

export const InputUserContext = createContext<InputUserType>({
UserContex: "",
  seUserContex: () => "",
});

export default function InputUser({ setValueUser, ...props }: InputUserProps) {
  const [Usuario, setUsuario] = useState<string>("");

  useEffect(() => {
    if (!setValueUser) return;
    const ValorSemAcentos = setValueUser
    const removeCaracteresEspeciais = ValorSemAcentos;
    const Linite1EspacoEntre = removeCaracteresEspeciais;
    const RemosEspacosExtras = Linite1EspacoEntre;
    const UpCase = RemosEspacosExtras.toUpperCase();
    setUsuario(UpCase);
  }, [setValueUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const ValorSemAcentos = valor
    const removeCaracteresEspeciais = ValorSemAcentos
    const Linite1EspacoEntre = removeCaracteresEspeciais;
    const RemosEspacosExtras = Linite1EspacoEntre;
    const UpCase = RemosEspacosExtras.toUpperCase();
    setUsuario(UpCase);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props.onChange && props.onChange(e); // Mantém o evento original se passado
  };

  return (
    <>
      <InputUserContext.Provider
        value={{UserContex: Usuario, seUserContex: setUsuario }}
      >
        <Box>
          <Input {...props} value={Usuario} type="text" onChange={handleChange} />
        </Box>
      </InputUserContext.Provider>
    </>
  );
}
