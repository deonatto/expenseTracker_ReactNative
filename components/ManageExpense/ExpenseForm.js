import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";

const ExpenseForm = () => {
  const [inputsValues, setInputsValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  const inputHandler = (inputIdentifier, enteredValue) => {
    setInputsValues((prevState) => {
      return { ...prevState, [inputIdentifier]: enteredValue };
    });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={{ flex: 1 }}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputHandler('amount', value),
            value: inputsValues.amount
          }}
        />
        <Input
          label="Date"
          style={{ flex: 1 }}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputHandler('date', value),
            value: inputsValues.date
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => inputHandler('description', value),
          value: inputsValues.description
        }}
      />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
