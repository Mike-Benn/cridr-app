import Typography from "@mui/material/Typography";
import styles from "./IncentivesView.module.css"
import { formatCurrency } from "../../utils/general/utils";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { readableDate } from "../../utils/offers/utils";

export default function IncentivesView({ uiState, handlers }) {
    return (
        <>
            <header>
                <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }}>Incentives</Typography>
                <div className={styles.subheader}>
                    <div className={styles.lifetimeSave}>
                        <Typography variant="body2" sx={{ fontSize: "1.5rem" }}>{formatCurrency(uiState.incentiveSum)}</Typography>
                        <Typography variant="caption">Lifetime amount saved</Typography>
                    </div>
                    <Button variant="contained" size="small" onClick={handlers.toggleView} sx={{ alignSelf: "center" }}>Add incentive</Button>
                </div>
            </header>
            <section className={styles.recentIncentives}>
                <div className={styles.incentivesList}>
                    <Typography variant="subtitle1">Recent Incentives</Typography>
                    <List>
                        {uiState.incentiveTransactionList.map(trx =>
                            <ListItem divider key={trx.transaction_incentive_id}>
                                <ListItemText primary={`${trx.business_name} | ${trx.incentive_description}`} secondary={`Date: ${readableDate(trx.transaction_date)}`}></ListItemText>
                                <Typography variant="subtitle1">{formatCurrency(trx.incentive_amount)}</Typography>
                            </ListItem>
                        )}
                    </List>
                </div>
            </section>
        </>
    )
}