/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Text,
  useDisclosure,
  useToast,
  Box,
  Input,
  Tooltip,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface CreateChamadoProps {
  id: number;
}

export default function CreateChamado({ id }: CreateChamadoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [descricao, setDescricao] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const session = useSession();
  const toast = useToast();

  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [urlFinal, setUrlFinal] = useState<{ urlDownload: string, urlView: string }[]>([]);
  const [fileName, setFileName] = useState<string[]>([]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    setUser(session.data?.user);
  }, [session.data?.user]);
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFiles = async (uploadedFiles: FileList) => {
    const filesArray = Array.from(uploadedFiles);
    
    for (const file of filesArray) {
      if (
          file.type === "application/pdf" ||
          file.type === "image/jpeg" ||
          file.type === "image/webp" ||
          file.type === "image/png"
      ) {
          const formData = new FormData();
          formData.append("file", file);
          
          try {
              const response = await axios.post(`/api/chamado/post`, formData, {
                  headers: {
                      "Content-Type": "multipart/form-data",
                  },
              });
              if (response.status === 200) {
                  const url = response.data.data.url;
                  const ulrView = response.data.data.viewUrl;
                  const urlFileName = response.data.data.filename;
                  const urlObj = { urlDownload: url, urlView: ulrView, urlFileName: urlFileName };
                  
                  const teste = fileName
                  teste.push(urlFileName)
                  setFileName(teste);
                  setUrlFinal((prev) => [...prev, urlObj]);

                  toast({
                      title: "Arquivo salvo",
                      status: "success",
                      duration: 3000,
                      isClosable: true,
                  });
              }
          } catch (error) {
              console.error(error);
              toast({
                  title: "Erro ao salvar arquivo",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
              });
          }
      }
    }

    const newImagePreviews = filesArray
        .filter((file) => file.type.startsWith('image/'))
        .map((file) => URL.createObjectURL(file));

    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newImagePreviews]);
  };

  const handleClick = () => {
    document.getElementById('file-input')?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
        handleFiles(uploadedFiles);
    }
  };

  const handleRemove = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const name = fileName[index];
    const newFilesNames = fileName.filter((_, i) => i !== index);
    setFileName(newFilesNames)
    const newFiles = files.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setImagePreviews(newImagePreviews);
     handleDeleteImage(index ,name, event,)
  };

  const handleDeleteImage = async (index: number, fileName: string ,event: React.MouseEvent) => {
    event.stopPropagation();
    const delImage = await axios(`/api/chamado/delete`,   {
      method: 'DELETE',
      data: {
        image : fileName 
      },
    });
    if (delImage.status === 200) {
      const newUrlFinal = urlFinal.filter((_, i) => i !== index);
      setUrlFinal(newUrlFinal);
      toast({
        title: "Sucesso",
        description: "Imagem deletada com sucesso",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Erro",
        description: "Erro ao deletar imagem",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Handle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    const userId = user?.id;
    if (!userId) {
      toast({
        title: "Erro",
        description: "Erro ao criar chamado, Faça o Login Novamente!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
  
    const data = {
      solicitacao: id,       
      descricao: descricao,   
      status: 0,               
      images: urlFinal,        
      idUser: userId,          
    };
  
    const response = await axios.post("/api/chamado/back/post", data);
  
    if (response.status === 200) {
      setDescricao("");
      setUrlFinal([]);
      setFileName([]);
      setFiles([]);
      setImagePreviews([]);
      onClose();
  
      toast({
        title: "Sucesso",
        description: "Chamado criado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Erro",
        description: "Erro ao criar chamado.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  


  const handleModalClose = () => {
    setDescricao("");
    setImagePreviews([]);
    setFileName([]);
    setUrlFinal([]);
    onClose();
  };



  return (
    <><Tooltip label="Botão para solicitar suporte,solicitação ou alterações referente a este cliente." bg={"orange.700"}>
      <Button
        size={'sm'}
        colorScheme="orange"
        color={"white"}
        cursor={"pointer"}
        onClick={() => {
          onOpen();
        }}
        textColor={'black'}
      >
        CRIAR CHAMADO
      </Button>
    </Tooltip>

      <Modal isOpen={isOpen} size={"xl"} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Abrir Chamado
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap={5}>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  w={"100%"}
                  h={"10rem"}
                  placeholder="Descreva o problema que deseja resolver."
                  resize={"none"}
                  ps={3}
                  bg={"gray.100"}
                  boxShadow="lg"
                  onChange={(e) => setDescricao(e.target.value)}
                  value={descricao}
                />
              </FormControl>
              
              <Text fontSize={"1rem"}>Anexar Arquivo</Text>
              <Box textAlign="center">
                <Box
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleClick}
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius="md"
                  p={5}
                  cursor="pointer"
                  _hover={{ borderColor: 'gray.500' }}
                >
                  <Input
                    id="file-input"
                    type="file"
                    multiple
                    onChange={handleChange}
                    display="none"
                  />
                  <Text fontSize={useBreakpointValue({ base: 'lg', md: 'xl' })}>
                    Arraste arquivos aqui ou clique para selecionar
                  </Text>
                </Box>
                
                <Box display="flex" flexWrap="wrap" justifyContent="center" mt={4}>
                  {imagePreviews.map((preview, index) => (
                    <Box key={index} position="relative" mr={2} mb={2}>
                      <Tooltip label="Excluir" placement="top" hasArrow>
                        <Button
                          size="xs"
                          colorScheme="red"
                          onClick={(event) => handleRemove(index, event)}
                          position="absolute"
                          top={1}
                          right={1}
                          zIndex={1}
                        >
                          x
                        </Button>
                      </Tooltip>
                      <Image
                        src={preview}
                        alt={`Preview ${index}`}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.2)' }}
                        onClick={() => handleDownload(preview)}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter gap={3}>
              <Button colorScheme="green" onClick={Handle}>
                Confirmar
              </Button>
            
            <Button
              colorScheme="red"
              onClick={handleModalClose}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
