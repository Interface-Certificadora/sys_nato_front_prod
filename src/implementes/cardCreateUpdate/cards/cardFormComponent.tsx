"use client";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { useFormState } from "react-dom";

type HTMLFormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

type CardFormProps = PropsWithChildren<
  Omit<HTMLFormProps, "action"> & {
    action: (prevState: any, formData: FormData) => Promise<any>;
  }
>;

export function CardFormComponent(props: CardFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();
  const route = useRouter();

  const [state, formAction] = useFormState(props.action, { error: null });

  useEffect(() => {
    if (state?.error) {
      setIsError(true);
    } else if (state?.error == null) {
      
    } else if (state?.id) {
      setIsSuccess(true);
    }else {
      setIsSuccess(true);
    }
  }, [state]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Sucesso",
        description: "Informações salvas com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
     route.refresh();
      setIsSuccess(false); // Reset state after showing toast
    }
    if (isError) {
      if (state?.message) {
        toast({
          title: "Erro",
          description: state?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
      toast({
        title: "Erro",
        description: "Erro ao salvar as informações",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      setIsError(false); // Reset state after showing toast
    }
  }, [isSuccess, isError, toast, route, state?.message]);

  return <form {...props} action={formAction} />;
}
