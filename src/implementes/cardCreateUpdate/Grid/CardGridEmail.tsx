import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import InputEmail from "../imputs/inpuEmail";

interface CardGridEmailProps extends BoxProps {
  DataSolicitacao?: solictacao.SolicitacaoGetType;
  type?: string;
  readonly?: boolean;
}

/**
 * Card component for registering a new email or confirming an existing one.
 * @prop {solictacao.SolicitacaoGetType} DataSolicitacao - The data of the
 *   solicitacao.
 * @prop {string} type - The type of the card, either "register" or "confirm".
 * @prop {BoxProps} props - The props of the Box component.
 * @returns {JSX.Element} The JSX element for the card.
 */
export default function CardGridRegisterEmail({
  DataSolicitacao,
  type,
  readonly,
  ...props
}: CardGridEmailProps): JSX.Element {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          {type === "confirm" ? "Confirmar Email" : "Email"}
        </FormLabel>
        <InputEmail
          setValueEmail={DataSolicitacao?.email}
          name={type === "confirm" ? "confirmEmail" : "email"}
          variant="flushed"
          px={1}
          bg={"gray.100"}
          borderColor={"gray.400"}
          readonly={readonly}
        />
      </Box>
    </>
  );
}
