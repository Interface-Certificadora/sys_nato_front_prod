"use client";

import {
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
  Flex,
  CircularProgress
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";
import { SenhaComponent } from "../Senha";

export const FormLogin = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Aguarda sessão ser estabelecida após login para redirecionar
  useEffect(() => {
    if (loading && status === "authenticated" && session) {
      router.replace("/");
    }
  }, [session, status, loading, router]);

  const handlesubmit = useCallback(async () => {
    setLoading(true);
    const res: any = await signIn("credentials", {
      email: username,
      password: password,
      redirect: false
    });
    if (res.status !== 200) {
      setLoading(false);
      toast({
        title: "Erro!",
        description: "Usuario ou senha inválidos",
        status: "error",
        duration: 5000
      });
    }
    // O redirecionamento será feito pelo useEffect quando a sessão for estabelecida
  }, [username, password, toast]);

  const handleUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.toUpperCase());
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const loadingComponent = useMemo(() => (
    <Flex
      w={"100%"}
      h={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress
        size="10rem"
        p={10}
        isIndeterminate
        color="green.300"
      />
    </Flex>
  ), []);

  if (loading) {
    return loadingComponent;
  }
  return (
    <>
      <FormControl>
        <FormLabel>Usuario</FormLabel>
        <Input
          type="text"
          size={"lg"}
          border={"1px solid #b8b8b8cc"}
          textTransform={"uppercase"}
          onChange={handleUsernameChange}
          value={username}
        />
        <FormLabel> Senha</FormLabel>
        <SenhaComponent
          setvalue={password}
          onvalue={handlePasswordChange}
          envClick={handlesubmit}
        />
      </FormControl>
      <Button
        mt={5}
        mb={5}
        variant="outline"
        width="250px"
        height="50px"
        maxWidth="100%"
        border={"1px solid #b8b8b8cc"}
        textColor={"Black"}
        onClick={handlesubmit}
      >
        ACESSAR
      </Button>
    </>
  );
};
