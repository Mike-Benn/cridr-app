import RecentTransactionsMobile from "./RecentTransactionsMobile"
import Button from "@mui/material/Button"
import styles from "./IncentivesDisplay.module.css"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { formatCurrency, readableMonth } from "../../utils/general/utils"

function IncentivesDisplay({ uiState, handlers }) {

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <Typography variant="h6" sx={{ alignSelf: "center", fontWeight: "bold" }}>Incentives</Typography>
                <div className={styles.subheader}>
                    <div className={styles.monthlySave}>
                        <Typography variant="body2" sx={{ fontSize: "1.5rem" }}>{formatCurrency(uiState.incentiveSum)}</Typography>
                        <Typography variant="caption">Total amount earned</Typography>
                    </div>
                    <Button variant="contained" size="small" onClick={handlers.toggleViewMode} sx={{ alignSelf: "center" }}>Add incentive</Button>
                </div>
            </header>
            {uiState.incentiveTransactionList.length > 0 && <section className={styles.recentIncentives}>
                <FormControl fullWidth>
                    <InputLabel id="select-incentive-month-label">Month</InputLabel>
                    <Select
                        labelId="select-incentive-month-label"
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
                <div className={styles.incentivesList}>
                    <Typography variant="subtitle1" sx={{ paddingLeft: "16px" }}>Recent Incentives</Typography>
                    <RecentTransactionsMobile uiState={uiState} />
                </div>
            </section>
            }
        </main>
    )
}

export default IncentivesDisplay