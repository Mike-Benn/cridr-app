import Typography from "@mui/material/Typography"
import styles from "./ExpensesView.module.css"
import { formatCurrency } from "../../utils/general/utils"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { readableDate } from "../../utils/general/utils"

export default function ExpensesView({ uiState, handlers }) {
    return (
        <>
            <header>
                <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }}>Expenses</Typography>
                <div className={styles.subheader}>
                    <div className={styles.monthlySpend}>
                        <Typography variant="body2" sx={{ fontSize: "1.5rem" }}>{formatCurrency(uiState.expenseSum)}</Typography>
                        <Typography variant="caption">Current monthly spend</Typography>
                    </div>
                    <Button variant="contained" size="small" onClick={handlers.toggleView} sx={{ alignSelf: "center" }}>Add expense</Button>
                </div>
            </header>
            <section className={styles.recentExpenses}>
                <div className={styles.expensesList}>
                    <Typography variant="subtitle1">Recent Expenses</Typography>
                    <List>
                        {uiState.expenseTransactionList.map(exp =>
                            <ListItem divider key={exp.transaction_expense_id}>
                                <ListItemText primary={`${exp.business_name}`} secondary={`Date: ${readableDate(exp.expense_transaction_date)}`} />
                                <Typography variant="subtitle1">{formatCurrency(exp.expense_amount)}</Typography>
                            </ListItem>
                        )}
                    </List>
                </div>

            </section>
        </>
    )
}