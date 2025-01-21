"use client";

import GetAllConstrutoras from "@/actions/construtora/service/getAllContrutoras";
import useEmpreendimentoContext from "@/hook/useEmpreendimentoContext";
import { Flex, Select, SelectProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface SelectUserConstrutoraProps extends SelectProps {
  setValue: any;
}

export function SelectEmpreendimentoConstrutora({
  setValue,
  ...props
}: SelectUserConstrutoraProps) {
  const [Construtora, setConstrutora] = useState<number | any>();
  const [ConstrutoraData, setConstrutoraData] = useState<
    {
      id: number;
      cnpj: string;
      razaosocial: string;
      tel: string | null;
      email: string | null;
      atividade: string | null;
      fantasia: string | null;
    }[]
  >([]);
  const { setConstrutoraTag } = useEmpreendimentoContext();

  function handleConstrutoraChange(selectedId: number) {
    const selectedConstrutora = ConstrutoraData.find(
      (construtora) => construtora.id === selectedId
    );
    if (selectedConstrutora) {
      setConstrutoraTag(selectedConstrutora.fantasia);
    } else {
      setConstrutoraTag(null);
    }
  }

  useEffect(() => {
    const getConstrutora = async () => {
      const req = await GetAllConstrutoras();
      if (!req.error) {
        const data = req.data;
        if (data) {
          setConstrutoraData(data);
        }
      } else {
        return { status: 500, message: "error", data: null };
      }
    };
    getConstrutora();

    if (setValue) {
      setConstrutora(setValue);
    }
  }, [setValue]);

  return (
    <>
      <Flex gap={2}>
        <Select
          {...props}
          name="empreendimentoConstrutora"
          border="1px solid #b8b8b8cc"
          borderTop={"none"}
          borderRight={"none"}
          borderLeft={"none"}
          borderRadius="0"
          bg={"gray.100"}
          borderColor={"gray.400"}
          onChange={(e: any) => {
            const selectedId = Number(e.target.value);
            setConstrutora(selectedId);
            handleConstrutoraChange(selectedId);
          }}
          value={Construtora}
        >
          <option style={{ backgroundColor: "#EDF2F7" }} value={0}>
            Selecione uma construtora
          </option>
          {ConstrutoraData.length > 0 &&
            ConstrutoraData.map((construtora) => (
              <option
                style={{ backgroundColor: "#EDF2F7" }}
                key={construtora.id}
                value={construtora.id}
              >
                {construtora.fantasia}
              </option>
            ))}
        </Select>
      </Flex>
    </>
  );
}
