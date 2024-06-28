import { SpendingStorageDTO } from "../../spending/SpendingStorageDTO";
import {
  Container,
  Local,
  Category,

} from "./styles";

type Props = {
  data:SpendingStorageDTO
}

export function Resumo({data}:Props) {
  return (
    <Container>

      <Local>{data.state.toUpperCase()}</Local>
      <Category>{data.supplier.toUpperCase()}</Category>

    </Container>
  )
}