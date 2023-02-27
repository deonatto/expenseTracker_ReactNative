import { useLayoutEffect } from "react";
import { Text } from "react-native";

const ManageExpenses = ({route, navigation}) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(()=>{
    //set title
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  return (
    <Text>Manage expenses</Text>
  )
}

export default ManageExpenses;