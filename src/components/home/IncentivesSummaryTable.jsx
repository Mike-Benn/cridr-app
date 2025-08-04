import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

export default function IncentivesSummaryTable({ tableData }) {

    return (
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
                    {tableData.map(row => (
                        <TableRow
                            key={row.business_name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.business_name}</TableCell>
                            <TableCell align="right">{row.percent}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>

        </TableContainer>
    )
}