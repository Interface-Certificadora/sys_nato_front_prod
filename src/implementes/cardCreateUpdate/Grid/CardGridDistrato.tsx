"use client";

import BtRemoverDistrato from "@/components/botoes/bt_Remover_Distrato";
import { SessionUserType } from "@/types/next-auth";

interface CardGridDistratoProps {
  Id: any;
  User: SessionUserType.User;
}

export default function CardGridDistrato({ Id, User }: CardGridDistratoProps) {
  const Hierarquia = User?.hierarquia;

  return (
    <>
      {Hierarquia === "ADM" && (
        <>
          <BtRemoverDistrato id={Id} />
        </>
      )}
      {Hierarquia === "CCA" && (
        <>
          <BtRemoverDistrato id={Id} />
        </>
      )}
    </>
  );
}
