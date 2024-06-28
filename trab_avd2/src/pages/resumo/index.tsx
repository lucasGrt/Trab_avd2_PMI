import { useEffect,useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import { Header } from '../../components/Header'
import {
  Container,
  Transactions,
  Content,
  TextCard,
  TextCard2,
  
} from './styles'

import { Resumo }from '../../components/listResume'
import { spendingGetAll } from '../../spending/spendingGetAll'
import { Alert, ScrollView } from 'react-native'
import { SpendingStorageDTO } from '../../spending/SpendingStorageDTO'

export function ListResume() {

  const [dataExpenses, setDataExpenses] = useState<SpendingStorageDTO[]>([]);
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  async function loadDataSpending() {
    try{
    const data = await spendingGetAll()
    console.log(data)
  setDataExpenses(data)

    const totalsObject: { [key: string]: number } = {};
    const countsObject: { [key: string]: number } = {};

    data.forEach(item => {

        
        const key = `${item.supplier.toLocaleUpperCase()} - ${item.state.toLocaleUpperCase()}`;
        const invoiceValue = item.value;
        
        if (totalsObject[key] !== undefined) {
          totalsObject[key] += invoiceValue;
          countsObject[key] += 1;
        } else {
          totalsObject[key] = invoiceValue;
          countsObject[key] = 1;
        }

        
      });

      setTotals(totalsObject);
      setCounts(countsObject);

    }catch(error){
      Alert.alert("Erro","dados nao carregados")
    }
  }

  
  useFocusEffect(useCallback(()=>{
    loadDataSpending()
  }, [] ))

  

  return (
    <Container>
      <Header title='Resumo por fornecedor' />
      
      <Transactions>
      <ScrollView>
          {Object.keys(totals).map(key => (
            <Content key={key}>
              <TextCard>{`${key}`}</TextCard>
              <TextCard2>{`R$ ${totals[key].toFixed(2)}`}</TextCard2>
              <TextCard>{`(${counts[key]} ocorrências)`}</TextCard>
            </Content>
          ))}
      </ScrollView>
        
        </Transactions>
     

    </Container>
  )
}