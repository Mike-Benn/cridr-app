import Stack  from "@mui/material/Stack";
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

function RecentTransactionsMobile({ incentiveTransactionList }) { 
    return (
        <Stack alignItems="center" spacing={1.5}>
            {incentiveTransactionList.map(txn => 
                <Card key={txn.transaction_incentive_id} sx={{
                    width: "100%",
                    px: 2,
                    boxSizing: "border-box",
                }}>
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body1">Date</Typography>
                            <Typography variant="body1">{new Date(txn.transaction_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body1" sx={{ flex: 1 }}>Description</Typography>
                            <Typography variant="body1" sx={{ flex: 1, textAlign: "right", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{txn.incentive_description}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body1">Amount</Typography>
                            <Typography variant="body1" sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>${txn.incentive_amount}</Typography>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Stack>
    )
}

export default RecentTransactionsMobile