import React from "react";
import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpenseItems = ({ item }) => {

  return <ExpenseItem {...item}/>;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={ExpenseItems}
    />
  );
};

export default ExpensesList;
