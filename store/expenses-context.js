import { createContext, useReducer } from "react";
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

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      const id = new Date().toString() + Math.random().toString;
      return [{ ...action.payload, id }, ...state];
    case "Update":
        const index = state.findIndex((expense) => expense.id === action.payload.id);
        const updatableExpense = state[index];
        const updatedExpense = {...updatableExpense, ...action.payload.data};
        const updatedExpenses = [...state];
        updatedExpenses[index] = updatedExpense;
        return updatedExpenses;
    case "Delete":
        return state.filter((expense) => expense.id !== action.payload)
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, data);

  const addExpense = (expenseData) => {
    dispatch({ type: "Add", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "Delete", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "Update", payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

export default ExpensesContextProvider;
