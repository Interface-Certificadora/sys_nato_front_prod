import { Box, BoxProps, FormLabel, Text } from "@chakra-ui/react";
import DropFinanceiro from "../dropdow/dropFinanceiro";
import SelectFinanceiro from "../dropdow/selectfinanceiro";
import { SessionUserType } from "@/types/next-auth";

interface CardGridFinanceiraProps extends BoxProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
  user: SessionUserType.User;
}

export default function CardGridFinanceiraCliente({
  DataSolicitacao,
  user,
  ...props
}: CardGridFinanceiraProps): JSX.Element {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Financeira
        </FormLabel>
        {DataSolicitacao.financeiro?.fantasia && (
          <Text>{DataSolicitacao.financeiro.fantasia}</Text>
        )}
        {DataSolicitacao.financeiro?.id && (
          <DropFinanceiro
            user={user}
            value={DataSolicitacao.financeiro.id}
            Id={DataSolicitacao.id}
          />
        )}
        {!DataSolicitacao.financeiro && <SelectFinanceiro />}
      </Box>
    </>
  );
}
