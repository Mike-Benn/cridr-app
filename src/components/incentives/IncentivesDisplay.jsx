import RecentTransactionsMobile from "./RecentTransactionsMobile"
import Button from "@mui/material/Button"
import styles from "./IncentivesDisplay.module.css"
import Typography from "@mui/material/Typography"
import { formatCurrency } from "../../utils/general/utils"
function IncentivesDisplay({ uiState, handlers }) {

    const calculateIncentiveTotal = () => {
        const incentiveList = uiState.incentiveTransactionList;
        let total = 0
        for (let i = 0; i < incentiveList.length; i++) {
            total += incentiveList[i].incentive_amount;
        }
        total = formatCurrency(total);
        return total;
    }

    const incentiveTotal = calculateIncentiveTotal();
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }}>Incentives</Typography>
                <div className={styles.subheader}>
                    <div className={styles.amountSaved}>
                        <Typography variant="body2" sx={{ fontSize: "1.5rem" }}>{`${incentiveTotal}`}</Typography>
                        <Typography variant="caption">Total amount earned</Typography>
                    </div>
                    <Button variant="contained" size="small" onClick={handlers.toggleViewMode} sx={{ alignSelf: "center" }}>Add incentive</Button>
                </div>
            </header>
            <section className={styles.recentIncentives}>
                <Typography variant="subtitle1" sx={{ paddingLeft: "16px" }}>Recent Incentives</Typography>
                <RecentTransactionsMobile uiState={uiState} />
            </section>
        </main>
        
    )
}

export default IncentivesDisplay