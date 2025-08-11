import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import TabPanel from "./TabPanel"
import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient"
import { getYear, format } from "date-fns"
import { getMonthDatesFromYear } from "../../utils/general/utils"
import styles from "./ExpensesSummaryView.module.css"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import ExpensesSummaryTable from "./ExpensesSummaryTable"

export default function ExpensesSummaryView() {
    const currDate = new Date();
    const currYear = getYear(currDate);
    const prevYear = getYear(currDate) - 1;
    const [uiState, setUiState] = useState({
        tabValue: 0,
        selectedMonth: "all",
        selectedYear: getYear(new Date()),
        expensesStats: [],
    })
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getStats = async () => {
            setIsLoading(true);
            try {
                const statsResponse = await apiClient.get("/expenses/stats", { params: { year: uiState.selectedYear, month: uiState.selectedMonth === "all" ? undefined : uiState.selectedMonth, groupByCategory: "true" } })
                setUiState(prev => ({
                    ...prev,
                    expensesStats: statsResponse.data.data,
                }))
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false)
        }
        getStats();
    }, [uiState.selectedYear, uiState.selectedMonth])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUiState(prev => {
            if (prev[name] === value) return prev;
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleTabChange = (e, newValue) => {
        setUiState(prev => {
            if (prev.selectedYear === newValue) return prev;
            return {
                ...prev,
                selectedYear: newValue
            }
        })
    }
    
    const monthList = getMonthDatesFromYear(uiState.selectedYear)
    return (
        <section>
            <div className={styles.tabs}>
                <Tabs value={uiState.selectedYear} onChange={handleTabChange}>
                    <Tab label="Year-to-date" name="selectedYear" value={currYear} sx={{ fontSize: "0.75rem" }}/>
                    <Tab label={`${prevYear} Year-end summary`} name="selectedYear" value={prevYear} sx={{ fontSize: "0.75rem"}} />
                </Tabs>
            </div>
            <FormControl className={styles.selectMonth}>
                <InputLabel id="summary-select-incentive-month-label">Month</InputLabel>
                <Select
                    labelId="summary-select-incentive-month-label"
                    value={uiState.selectedMonth}
                    label="Month"
                    onChange={handleChange}
                    name="selectedMonth"
                >
                    <MenuItem key="all" value="all">All months</MenuItem>
                    {monthList.map(month =>
                        <MenuItem key={month} value={month}>{format(new Date(2000, (month - 1), 1), 'MMMM')}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <TabPanel value={uiState.selectedYear} index={currYear}>
                <ExpensesSummaryTable tableData={uiState.expensesStats} isLoading={isLoading} />
            </TabPanel>
            <TabPanel value={uiState.selectedYear} index={prevYear}>
                <ExpensesSummaryTable tableData={uiState.expensesStats} isLoading={isLoading} />
            </TabPanel>
        </section>
    )

}