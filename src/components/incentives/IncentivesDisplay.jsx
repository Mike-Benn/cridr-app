import RecentTransactionsMobile from "./RecentTransactionsMobile"
import Button from "@mui/material/Button"
import styles from "./IncentivesDisplay.module.css"
import Typography from "@mui/material/Typography"
function IncentivesDisplay({ incentiveTransactionList, handlers }) {

    return (
        <div className={styles.displayContainer}>
            <Button variant="contained" onClick={handlers.toggleViewMode} sx={{ alignSelf: "center" }}>Add Incentive</Button>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Recent Transactions</Typography>
            <RecentTransactionsMobile incentiveTransactionList={incentiveTransactionList} />
        </div>
        
    )
}

export default IncentivesDisplay