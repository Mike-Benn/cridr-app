import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper";

function RecentTransactionsTable({ transactionData }) {

    transactionData = [
        {
            id: 1,
            date: "2025-06-18",
            description: "Arby's coupon",
            amount: 3.25
        },
        {
            id: 2,
            date: "2025-06-19",
            description: "Wendy's coupon",
            amount: 5.55
        },
        {
            id: 3,
            date: "2025-06-21",
            description: "Mcdonald's coupon",
            amount: 7.23
        }
    ]
        
    

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
                        <TableRow key={txn.id}>
                            <TableCell>{txn.date}</TableCell>
                            <TableCell>{txn.description}</TableCell>
                            <TableCell>{txn.amount}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RecentTransactionsTable