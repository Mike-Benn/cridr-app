import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { readableDate } from "../../utils/general/utils"

function RecentExpensesMobile({ uiState }) { 
    const listHead = uiState.expenseTransactionList.slice(0, 5);
    return (
        <>
            {listHead.length > 0 && 
                <div>
                    <List>
                        {listHead.map(exp =>
                            <ListItem divider key={exp.transaction_expense_id}>
                                <ListItemText primary={`${uiState.businessMap[exp.business_id].business_name}`} secondary={`Date: ${readableDate(exp.expense_transaction_date)}`}/>
                            </ListItem>
                        )}
                    </List>
                </div>
            }
        </>
    )
}

export default RecentExpensesMobile