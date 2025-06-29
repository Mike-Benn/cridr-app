import Stack  from "@mui/material/Stack";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

function RecentExpensesMobile({ expenseTransactionList }) { 
    return (
        <Stack alignItems="center" spacing={1.5}>
            {expenseTransactionList.map(txn => 
                <Card key={txn.transaction_expense_id} sx={{
                    width: "100%",
                    px: 2,
                    boxSizing: "border-box",
                }}>
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body1">Date</Typography>
                            <Typography variant="body1">{new Date(txn.expense_transaction_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body1" sx={{ flex: 1 }}>Description</Typography>
                            <Typography variant="body1" sx={{ flex: 1, textAlign: "right", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{txn.business_name}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body1">Amount</Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>${txn.expense_amount}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Stack>
    )
}

export default RecentExpensesMobile