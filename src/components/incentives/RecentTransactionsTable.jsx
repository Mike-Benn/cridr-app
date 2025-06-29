import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper";

function RecentTransactionsTable({ transactionData }) {
    
    return (
        <TableContainer component={Paper}>
            <Table aria-label="Recent Transactions">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionData.map(txn => 
                        <TableRow key={txn.transaction_incentive_id}>
                            <TableCell>{
                                new Date(txn.transaction_date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })
                                }</TableCell>
                            <TableCell>{txn.incentive_description}</TableCell>
                            <TableCell>{txn.incentive_amount}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RecentTransactionsTable