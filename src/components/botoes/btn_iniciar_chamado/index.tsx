'use client';
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { SiGoogleforms } from "react-icons/si";

interface BotaoIniciarChamadoProps {
    id: number
}

export default function BotaoIniciarChamado({id}: BotaoIniciarChamadoProps) {
    const data = {
        id: id,
        status: 1
    }
   const handleIniciarAtendimento = async () => {
    try {
        await axios.put('/api/chamado/back/putStatus', data);
        window.location.reload();
      } catch (error) {
        console.error("Erro ao enviar resposta:", error);
      }
   }

    return(
        <Button
            textColor={"white"}
            colorScheme="green"
            size="sm"
            leftIcon={<SiGoogleforms />}
            onClick={handleIniciarAtendimento}
            alignSelf={'flex-end'}
        >
            Iniciar Atendimento
        </Button>
    )
}