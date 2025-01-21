"use client";
import useUserCompraContext from "@/hook/useUserCompraContext";
import { Select, SelectProps } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

type SelectEmpreedimentoProps = SelectProps

export default function SelectEmpreedimento({
  ...props
}: SelectEmpreedimentoProps) {
  const [Data, setData] = useState<any>([]);
  const [Loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const user = session?.user;
  const hierarquia = user?.hierarquia;

  const { ContrutoraCX, setEmpreedimentoCX } = useUserCompraContext();

   useEffect(() => {
     if (hierarquia === "ADM") {
       setLoading(true);
       if (ContrutoraCX > 0) {
         (async () => {
           const req = await fetch(
             `/api/empreendimento/getall/filter/${ContrutoraCX}`
           );
           const res = await req.json();
           setData(res);

           setLoading(false);
         })();
       }
     }
   }, [ContrutoraCX, hierarquia]);

  useEffect(() => {
    if (hierarquia === "ADM") {
        (async () => {
          const req = await fetch(
            `/api/empreendimento/getall`
          );
          const res = await req.json();
          setData(res);
        })();
    } else {
      const empreedimento = user?.empreendimento;
      setData(empreedimento);
    }
  }, [hierarquia, user?.empreendimento]);

  return (
    <>
      {Loading && <BeatLoader color="#36d7b7" />}
      {!Loading && (
        <Select
          {...props}
          name="empreendimento"
          placeholder="Selecione uma empreendimento"
          onChange={(e) => setEmpreedimentoCX(Number(e.target.value))}
        >
          {Data.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </Select>
      )}
    </>
  );
}
