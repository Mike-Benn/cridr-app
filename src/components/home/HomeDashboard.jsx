import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import { useState } from "react"
import styles from "./HomeDashboard.module.css"
import IncentivesSummaryView from "./IncentivesSummaryView"
import ExpensesSummaryView from "./ExpensesSummaryView"
import Typography from "@mui/material/Typography"

function HomeDashboard() {
    const [uiState, setUiState] = useState({
        summaryView: "expenses",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUiState(prev => ({ ...prev, [name]: value }))
    }

    return (
        <main className={styles.main}>
            <header>
                <Typography variant="h6" sx={{ fontWeight: "bold", alignSelf: "center" }}>Summary</Typography>
                <ToggleButtonGroup
                    value={uiState.summaryView}
                    exclusive
                    onChange={handleChange}
                    name="summaryView"
                    className={styles.buttonGroup}
                >
                    <ToggleButton value="expenses" name="summaryView">Expenses</ToggleButton>
                    <ToggleButton value="incentives" name="summaryView">Incentives</ToggleButton>
                </ToggleButtonGroup>
            </header>
            {uiState.summaryView === "expenses" && <ExpensesSummaryView />}
            {uiState.summaryView === "incentives" && <IncentivesSummaryView />}

        </main>
    )
}

export default HomeDashboard