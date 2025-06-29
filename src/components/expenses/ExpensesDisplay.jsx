import RecentExpensesMobile from "./RecentExpensesMobile";
import Button from "@mui/material/Button"
import styles from "./ExpensesDisplay.module.css"
import Typography from "@mui/material/Typography"

function ExpensesDisplay({ expenseTransactionList, handlers }) {

    return (
        <div className={styles.displayContainer}>
            <Button variant="contained" onClick={handlers.toggleViewMode} sx={{ alignSelf: "center" }}>Add Expense</Button>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold"}}>Recent Expenses</Typography>
            <RecentExpensesMobile expenseTransactionList={expenseTransactionList} />
        </div>
    )
}

export default ExpensesDisplay