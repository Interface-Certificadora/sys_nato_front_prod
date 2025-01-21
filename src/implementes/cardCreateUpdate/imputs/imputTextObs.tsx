"use client";
import { Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface imputTextObsProps {
  DataSolicitacao?: solictacao.SolicitacaoGetType;
}

export function InputTextObs({ DataSolicitacao }: imputTextObsProps) {
    const [Obs, setObs] = useState<string>("");
    useEffect(() => {
        if (DataSolicitacao?.obs){
            setObs(DataSolicitacao?.obs)
        }
    }, [DataSolicitacao])
  return (
    <>
      <Textarea
        value={Obs}
        w={"100%"}
        h={"10rem"}
        resize={"none"}
        name="Obs"
        ps={3}
        bg={"gray.100"}
        boxShadow="lg"
        onChange={(e) => setObs(e.target.value)}
      />
    </>
  );
}
