import { Metadata } from "next";
import { ChamadoOptions } from "@/data/chamado";
import {
  Badge,
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";
import { IoMdDownload } from "react-icons/io";
import ResponderChamado from "@/components/responderChamado";
import BotaoIniciarChamado from "@/components/botoes/btn_iniciar_chamado";
import RespostaChamado from "@/components/resposta";

type Props = {
  params: { id: string };
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  
  return {
    title: `Chamado ID: ${id}`,
  };
}

export default async function EditarChamado({ params }: Props) {
  const session = await getServerSession(auth);
  const userSession = session?.user;
  const UserSessionId = userSession?.id;
  const userHierarquia = userSession?.hierarquia;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/chamado/${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );
  const data = await res.json();

  // variaveis do chamado
  const urls = data.images ? data.images : "[]";
  const url = JSON.parse(urls);
  const urlView = url.map((item: any) => item.urlView);
  const urlDownload = url.map((item: any) => item.urlDownload);

  const color =
    data.status === 0
      ? "blue"
      : data.status === 1
      ? "yellow"
      : data.status === 2
      ? "orange"
      : "green";

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/get/${data.idUser}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    }
  );
  const user = await res2.json();

  return (
    <>
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        p={4}
        borderRadius="15px"
        shadow="lg"
        overflowY={'auto'}
      >
        <Text
          justifySelf={"flex-start"}
          fontSize="2xl"
          color={"#00713D"}
          mb={2}
        >
          Chamado ID: {data.id}
        </Text>
        <Flex flexDirection={"column"} gap={2}>
          <Flex
            gap={4}
            w={"100%"}
            flexWrap={"wrap"}
            alignContent={"space-between"}
          >
            <Flex flexDirection={"column"}>
              <Text>Criado por: {user.nome}</Text>
              <Text>
                Criado em: {new Date(data.createdAt).toLocaleTimeString()},{" "}
                {new Date(data.createdAt).toLocaleDateString()}
              </Text>
            </Flex>
            <Flex flexDirection={"column"}>
              <Text>
                Solicitação ID:{" "}
                <Link href={`/solicitacoes/${data.solicitacao}`}>
                  <Badge variant={"solid"} colorScheme="green">
                    {data.solicitacao}
                  </Badge>
                </Link>
              </Text>
              <Text>
                Status Chamado:
                <Badge marginLeft={2} variant={"outline"} colorScheme={color}>
                  {
                    ChamadoOptions.find((option) => option.id === data.status)
                      ?.Label
                  }
                </Badge>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Divider my={4} borderColor="gray.300" />
        <Box>
          <Flex gap={4}>
            <Flex flexDirection={"column"}>
              <Text p={2}>Descrição:</Text>
              <Textarea
                w={{ base: "90%", md: "70%", lg: "50rem" }}
                h={{ base: "8rem", md: "10rem" }}
                variant="outline"
                value={data.descricao}
                resize="none"
                isReadOnly
                marginBottom={4}
              />

              {urlView.length > 0 && (
                <Flex flexDirection={"column"} gap={2}>
                  <Text marginLeft={2}>Imagens:</Text>
                  <Flex
                    wrap="wrap"
                    gap={8}
                    p={4}
                    justify="center"
                    align="center"
                  >
                    {urlView.map((item: any, index: number) => (
                      <Box
                        key={item}
                        position="relative"
                        boxSize={{ base: "100px", md: "150px", lg: "200px" }}
                        borderRadius="md"
                        shadow="sm"
                        overflow="hidden"
                      >
                        <Image
                          src={item}
                          objectFit="cover"
                          alt={`Imagem ${index + 1}`}
                          w="100%"
                          h="100%"
                          borderRadius="md"
                        />
                        <Box position="absolute" top="8px" right="8px">
                          <a href={urlDownload[index]} download>
                            <IconButton
                              icon={<IoMdDownload />}
                              aria-label="Download"
                              size="sm"
                              colorScheme="blue"
                              variant="solid"
                              shadow="md"
                            />
                          </a>
                        </Box>
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex marginTop={4} justifyContent={'center'}>
            {data.status === 3 ? (<RespostaChamado data={data} session={userHierarquia} />) : <Box hidden></Box>}
            {userHierarquia === "ADM" && data.status === 0 ? (
              <BotaoIniciarChamado id={data.id}/>
            ) : userHierarquia === "ADM" && data.status !== 3 ? (
              <ResponderChamado chamadoId={data.id} status={data.status} userId={UserSessionId as number} />
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
