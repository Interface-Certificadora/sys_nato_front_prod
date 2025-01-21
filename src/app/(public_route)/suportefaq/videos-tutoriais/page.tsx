"use client";

import {
  Flex,
  VStack,
  Box,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";

export default function SuporteFaqPerguntasFrequentes() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const baseUrl = "https://redebrasilrp.com.br/_assets/videos/sis_nato/"

  const videos = [
    { src: `${baseUrl}AssinandocomBirdIDTutorial.mp4`, title: `Assinando com Bird ID` },
    { src: `${baseUrl}atualizandocreditoscombirdid.mp4`, title: `Atualizando Créditos com Bird ID` },
    { src: `${baseUrl}Coletabiometricatutorial.mp4`, title: `Coleta Biométrica Tutorial` },
    { src: `${baseUrl}Comobaixaroseucertificado.mp4`, title: `Como Baixar seu Certificado` },
    { src: `${baseUrl}RECUPERANDOASENHADOPORTAL.mp4`, title: `Recuperando a Senha do Portal` },
    { src: `${baseUrl}SincronizandooBIRDID.mp4`, title: `Sincronizando o Bird ID` },
    { src: `${baseUrl}Videoconferenciatutorial.mp4`, title: `Vídeo Conferência Tutorial` },
    { src: `${baseUrl}VTINTERFACE2.mp4`, title: `Interface Certificado Digital` },
  ];

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    onOpen();
  };

  return (
    <Flex justify="center" align="center" flexDirection="column" p={4} mt={5}>
      <VStack spacing={8} align="center">
        <Box>
          <Text fontSize="5xl" fontWeight="bold" textAlign="center">
            Videos e Tutoriais
          </Text>
        </Box>
      </VStack>

      <Flex
        wrap="wrap"
        justify="center"
        align="center"
        gap={6}
        mt={8}
        width="100%"
        maxWidth="1200px"
      >
        {videos.map((video, index) => (
          <Box
            key={index}
            as="div"
            overflow="hidden"
            width={{ base: "150px", md: "200px", lg: "250px" }}
            height={{ base: "180px", md: "220px", lg: "270px" }}
            position="relative"
            cursor="pointer"
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.1)" }}
            onClick={() => handleVideoClick(video.src)}
          >
            <video
              src={video.src}
              style={{ width: "100%", height: "70%", objectFit: "cover", borderRadius: "8px" }}
            />
            <Text
              mt={2}
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="semibold"
              textAlign="center"
              color="gray.600"
            >
              {video.title}
            </Text>
          </Box>
        ))}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg="black" color="white" borderRadius="md" overflow="hidden">
          <ModalBody p={0} position="relative">
            {selectedVideo && (
              <>
                <video
                  src={selectedVideo}
                  style={{ width: "100%" }}
                  controls
                  autoPlay
                />
              </>
            )}
            <IconButton
              icon={<CloseIcon />}
              position="absolute"
              top={2}
              right={2}
              colorScheme="red"
              onClick={onClose}
              aria-label="Close"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
