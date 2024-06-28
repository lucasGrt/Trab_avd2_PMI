import { SpendingStorageDTO } from "../../spending/SpendingStorageDTO";
import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
  Amounttax,
} from "./styles";

type Props = {
  data:SpendingStorageDTO
}

export function TransactionExpenses({data}:Props) {
  return (
    <Container>
      <Description>Nota fiscal: {data.invoice}</Description>
      <Amount>valor NF: {data.value}</Amount>
      <Amounttax>Valor do imposto: {data.value * data.tax} </Amounttax>
      <Local>estado: {data.state.toLocaleUpperCase()}</Local>
      
      <Footer>
        <Category>{data.supplier.toLocaleUpperCase()}</Category>
        <Date>{data.codTax}</Date>
      </Footer>

    </Container>
  )
}