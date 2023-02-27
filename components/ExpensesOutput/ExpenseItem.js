import React from "react";
import { Pressable, Text, View, StyleSheet, Platform } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

const ExpenseItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();
  const expensePressHandler = ({}) => {
    navigation.navigate("ManageExpenses", {
      expenseId: id
    });
  };

  return (
    <View style={styles.expenseContainer}>
      <Pressable
        android_ripple={{ color: GlobalStyles.colors.primary200 }}
        onPress={expensePressHandler}
        style={({ pressed }) => [
          styles.expenseInnerContainer,
          pressed ? styles.pressed : null,
        ]}
      >
        <View>
          <Text style={[styles.text, styles.description]}>{description}</Text>
          <Text style={styles.text}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount.toFixed(2)}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseContainer: {
    marginVertical: 8,
    borderRadius: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    //box shadow for Android
    elevation: 4,
    //box shadow for IOS
    backgroundColor: GlobalStyles.colors.primary500,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  expenseInnerContainer: {
    padding: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
