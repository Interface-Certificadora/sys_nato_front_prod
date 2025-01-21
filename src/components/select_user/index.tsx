"use client";

import { Select } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface SelectProps {
  idcorretor: any;
  setCorretor?: number | null;
  Vendedor?: string | any;
}

export const SelectCorretor = ({
  idcorretor,
  setCorretor,
  Vendedor,
}: SelectProps) => {
  const [Data, setData] = useState([]);
  const [id, setId] = useState(0);
  const {data: session} = useSession();
  const user = session?.user;

  useEffect(() => {
    if (setCorretor) {
      setId(setCorretor);
    }
    (async () => {
      const resq = await fetch(`/api/usuario/getall`);
      const data = await resq.json();
      const Result = user?.hierarquia === "GRT" ? data.filter((item: any) => {
        const ConstruraGRT = user.construtora.map((construtora: any) => construtora.id);
        for (let i = 0; i < item.construtora.length; i++) {
          if (ConstruraGRT.includes(item.construtora[i].id)) {
            return item;
          }
        }
      }) : data;
      setData(Result);
    })();
  }, [setCorretor, user?.construtora, user?.hierarquia]);

  return (
    <>
      <Select
        onChange={(e) => {
          idcorretor(Number(e.target.value));
          setId(Number(e.target.value));
          Vendedor(
            Data.filter((item: any) => item.id === Number(e.target.value)).map(
              (item: any) => item.nome
            )[0]
          );
        }}
        placeholder="Selecione um corretor"
        value={id}
      >
        {Data &&
          Data.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
      </Select>
    </>
  );
};
