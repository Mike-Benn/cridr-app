import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import styles from "./ExpensesSummaryTable.module.css"
import CircularProgress from "@mui/material/CircularProgress"

export default function IncentivesSummaryTable({ tableData, isLoading }) {
    const isEmpty = tableData.length === 0 && !isLoading;
    return (
        <>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Business</TableCell>
                            <TableCell>% of total</TableCell>
                            <TableCell>Total amount ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isLoading && tableData.map(row => (
                            <TableRow
                                key={row.business_name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.business_name}</TableCell>
                                <TableCell align="right">{row.percent}</TableCell>
                                <TableCell align="right">{row.total}</TableCell>
                            </TableRow>
                        ))}
                        {isEmpty && <TableRow>
                                <TableCell colSpan={3} sx={{ border: 0, textAlign: "center" }}>
                                    No activity to display
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {isLoading &&
                <div className={styles.loadingSpinner}>
                    <CircularProgress />
                </div>
            }
        </>
    )
}