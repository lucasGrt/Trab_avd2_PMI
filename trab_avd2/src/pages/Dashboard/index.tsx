import { useState } from 'react'
import { Alert } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { InputAmount } from '../../components/InputAmount'
import { Container } from './styles'
import { spendingCreate } from '../../spending/spendingCreate'
import { spendingGetAll } from '../../spending/spendingGetAll';
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO';

export function Dashboard() {

  const [invoice, setInvoice] = useState('')
  const [codTax, setCodTax] = useState('')
  const [state, setState] = useState('')
  const [value, setValue] = useState('')
  const [supplier, setSupplier] = useState('')
  
  async function StorageClear() {
     await AsyncStorage.clear()
    Alert.alert('Operaçao concluida', 'Armazenamento limpo')
    return
  }

  async function handleAddNewSpending() {{

    const allowdstates = ["RJ", "SP", "MG"]
    const allowdcods = ["1234","6789","1708","5952"]
    const allowdfornecedores = ["MICROSOFT", "TOTVS"]

    if (invoice.trim() === '')return Alert.alert('Usuário', 'Favor preencha os campos corretamente')
      if (codTax.trim() === '')return Alert.alert('Usuário', 'Favor preencha corretamente o código')
      if (state.trim() === '')return Alert.alert('Usuário', 'Favor preencha com os estados validos')
      if (value.trim() === '')return Alert.alert('Usuário', 'Favor preencha os campos corretamente')
      if (supplier.trim() === '')return Alert.alert('Usuário', 'Entre com fornecedor correto')

      if (!allowdstates.includes(state.toUpperCase().trim())){
        Alert.alert(`estado ${state} nao permitido`)
        return
      }
      if (!allowdcods.includes(codTax.trim())){
        Alert.alert(`${codTax} nao permitido`)
        return
      }
      if (!allowdfornecedores.includes(supplier.toUpperCase().trim())){
        Alert.alert(`forncedor ${supplier} nao permitido`)
        return
      }

    }

    let feeValue = 0
    if (codTax === "1234"||codTax === "6789"){
      if (state.toUpperCase() === "RJ")feeValue = 0.01
      if (state.toUpperCase() === "SP")feeValue = 0.02
      if (state.toUpperCase() === "MG")feeValue = 0.03
    }

    const data:SpendingStorageDTO = {
      id: String(new Date().getTime()),
      invoice,
      codTax,
      state,
      supplier,
      value:Number(value),
      tax:feeValue
    }

      setInvoice('')
      setCodTax('')
      setState('')
      setSupplier('')
      setValue('')

    await spendingCreate(data)
    const result = await spendingGetAll()
    console.log(result)
  }

  return (
    <Container
    >
      <Header title='Cadastro de nota fiscal' />

      <Input
       placeholder="Número da nota"
       placeholderTextColor='#363F5F'
       keyboardType="numeric"
       value={invoice}
       onChangeText={value => setInvoice(value)}
      />

      <Input
        placeholder="Valor da nota"
        placeholderTextColor='#363F5F'
        autoCapitalize="words"
        keyboardType="numeric"
        value={value}
        onChangeText={value => setValue(value)}
      />

      <Input
        placeholder="Estado do Cadastro"
        placeholderTextColor='#363F5F'
        autoCapitalize='characters'
        value={state}
        onChangeText={value => setState(value)}
      />

      <Input
        placeholder="Código do Imposto"
        placeholderTextColor='#363F5F'
        autoCapitalize="none"
        keyboardType="numeric"
        value={codTax}
        onChangeText={value => setCodTax(value)}
      />

      <Input
        placeholder="fornecedor da nota"
        placeholderTextColor='#363F5F'
        autoCapitalize='characters'
        value={supplier}
        onChangeText={value => setSupplier(value)}
      />

      <Button
        title='Adicionar'
        onPress={handleAddNewSpending}
      />

      <Button
        title='Limpar'
        onPress={StorageClear}
      />

    </Container>
  )
}