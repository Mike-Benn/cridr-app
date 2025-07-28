import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { readableDate } from "../../utils/offers/utils"
import Typography from "@mui/material/Typography"
import { formatCurrency } from "../../utils/general/utils"
function RecentTransactionsMobile({ uiState }) { 
    const expenseList = uiState.incentiveTransactionList;
    return (
        <>
            {expenseList.length > 0 && 
                <div>
                    <List>
                        {expenseList.map(trx => 
                            <ListItem divider key={trx.transaction_incentive_id}>
                                <ListItemText primary={`${uiState.businessMap[trx.business_id].business_name} | ${trx.incentive_description}`} secondary={`Date: ${readableDate(trx.transaction_date)}`} />
                                <Typography variant="subtitle1">{formatCurrency(trx.incentive_amount)}</Typography>
                            </ListItem>
                        )}
                    </List>
                </div>
            }
        </>
    )
}

export default RecentTransactionsMobile