import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { readableDate } from "../../utils/general/utils";
import DeleteIcon from "@mui/icons-material/Clear"
import IconButton from "@mui/material/IconButton"

function ActiveOffersList({ uiState, onClick }) {
    const offersList = uiState.availableOffersList;
    return (
        <>
            <div>
                <List>
                    {offersList.map(offer =>
                        <ListItem divider key={offer.offers_id}>
                            <ListItemText primary={`${offer.business_name} | ${offer.offer_description}`} secondary={`Expiration: ${readableDate(offer.expiration_date)}`} />
                            <IconButton onClick={() => onClick(offer.offers_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )}
                </List>
            </div>
        </>
    )
}

export default ActiveOffersList