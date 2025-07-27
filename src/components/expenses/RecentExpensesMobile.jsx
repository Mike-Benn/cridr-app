import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { readableDate, formatCurrency } from "../../utils/general/utils"
import Typography from "@mui/material/Typography";


function RecentExpensesMobile({ uiState }) { 
    const expenseList = uiState.expenseTransactionList;
    return (
        <>
            {expenseList.length > 0 && 
                <div>
                    <List>
                        {expenseList.map(exp =>
                            <ListItem divider key={exp.transaction_expense_id}>
                                <ListItemText primary={`${uiState.businessMap[exp.business_id].business_name}`} secondary={`Date: ${readableDate(exp.expense_transaction_date)}`}/>
                                <Typography variant="subtitle1">{formatCurrency(exp.expense_amount)}</Typography>
                            </ListItem>
                        )}
                    </List>
                </div>
            }
        </>
    )
}

export default RecentExpensesMobile