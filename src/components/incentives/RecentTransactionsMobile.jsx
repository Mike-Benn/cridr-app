import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import styles from "./RecentTransactionsMobile.module.css"
import { readableDate } from "../../utils/offers/utils"

function RecentTransactionsMobile({ uiState }) { 
    const listHead = uiState.incentiveTransactionList.slice(0, 5);
    return (
        <>
            {listHead.length > 0 && 
                <div className={styles.recentIncentivesList}>
                    <List>
                        {listHead.map(trx => 
                            <ListItem divider key={trx.transaction_incentive_id}>
                                <ListItemText primary={`${uiState.businessMap[trx.business_id].business_name} | ${trx.incentive_description}`} secondary={`Date: ${readableDate(trx.transaction_date)}`} />
                            </ListItem>
                        )}
                    </List>
                </div>
            }
        </>
    )
}

export default RecentTransactionsMobile