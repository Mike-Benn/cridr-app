import RecentExpensesMobile from "./RecentExpensesMobile";
import Button from "@mui/material/Button"
import styles from "./ExpensesDisplay.module.css"
import Typography from "@mui/material/Typography"
import { formatCurrency, readableMonth } from "../../utils/general/utils";
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

function ExpensesDisplay({ uiState, handlers }) {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold"}}>Expenses</Typography>
                <div className={styles.subheader}>
                    <div className={styles.monthlySpend}>
                        <Typography variant="body2" sx={{ fontSize: "1.5rem" }}>{`${formatCurrency(uiState.expenseSum)}`}</Typography>
                        <Typography variant="caption">Monthly spend</Typography>
                    </div>
                    <Button variant="contained" size="small" onClick={handlers.toggleViewMode} sx={{ alignSelf: "center" }}>Add Expense</Button>
                </div>
            </header>
            {uiState.expenseTransactionList.length > 0 && <section className={styles.recentExpenses}>
                <FormControl fullWidth>
                    <InputLabel id="select-expense-month-label">Month</InputLabel>
                    <Select
                        labelId="select-expense-month-label"
                        value={uiState.selectedMonth}
                        label="Month"
                        onChange={handlers.handleChange}
                        name="selectedMonth"
                    >
                        {uiState.uniqueMonthList.map(month => 
                            <MenuItem key={month.month} value={month.month}>{readableMonth(month.month)}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <div className={styles.expenseList}>
                    <Typography variant="subtitle1" sx={{ paddingLeft: "16px" }}>Recent Expenses</Typography>
                    <RecentExpensesMobile uiState={uiState} />
                </div>
                
            </section>}
        </main>
    )
}

export default ExpensesDisplay