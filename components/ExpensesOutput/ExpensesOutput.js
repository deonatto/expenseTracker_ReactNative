import React from 'react'
import { View, StyleSheet} from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

const data = [
    {
        id: '1',
        description: 'a pair of shoes',
        amount: 59.99,
        date: new Date('2023-01-20')
    },
    {
        id: '2',
        description: 'a pair of shirts',
        amount: 39.99,
        date: new Date('2022-01-20')
    },
    {
        id: '3',
        description: 'a pair of shoes',
        amount: 99.99,
        date: new Date('2022-12-20')
    }
]

const ExpensesOutput = ({expenses, expensesPeriod}) => {
  return (
    <View style={styles.container}>
        <ExpensesSummary expenses={data} periodName={expensesPeriod}/>
        <ExpensesList expenses={data}/>
    </View>
  )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})