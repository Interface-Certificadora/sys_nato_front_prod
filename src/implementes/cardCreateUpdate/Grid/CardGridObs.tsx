import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { InputTextObs } from "../imputs/imputTextObs";

interface CardGridUpdateCnhProps extends BoxProps {
  DataSolicitacao?: solictacao.SolicitacaoGetType;
}

export default function CardGridObs({
  DataSolicitacao,
  ...props
}: CardGridUpdateCnhProps) {

  return (
    <Box {...props}>
      <FormLabel fontSize="sm" fontWeight="md">
        Observações
      </FormLabel>
      <InputTextObs
        DataSolicitacao={DataSolicitacao}
      />
    </Box>
  );
}
