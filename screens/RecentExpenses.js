import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
const RecentExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    const getExpenses = async () => {
      setLoading(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setLoading(false);
    };
    getExpenses();
  }, []);

  //get expenses from seven days ago
  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo;
  });

  return (
    <React.Fragment>
      {loading ? (
        <LoadingOverlay />
      ) : error ? (
        <ErrorOverlay message={error} onConfirm={() => setError('')}/>
      ) : (
        <ExpensesOutput
          expenses={recentExpenses}
          expensesPeriod="Last 7 days"
        />
      )}
    </React.Fragment>
  );
};

export default RecentExpenses;
