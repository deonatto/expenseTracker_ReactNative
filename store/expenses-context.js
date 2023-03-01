import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [action.payload, ...state];
    case "Set":
      const inverted = action.payload.reverse();
      return inverted;
    case "Update":
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[index];
      const updatedExpense = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[index] = updatedExpense;
      return updatedExpenses;
    case "Delete":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "Add", payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "Set", payload: expenses });
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
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
