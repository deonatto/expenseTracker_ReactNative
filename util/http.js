import { API_URL } from "@env";
import axios from "axios";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${API_URL}/expenses.json`, expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    const obj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(obj);
  }
  return expenses;
};
