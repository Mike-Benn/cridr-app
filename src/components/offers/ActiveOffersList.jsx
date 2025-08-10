import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { readableDate } from "../../utils/general/utils";
import DeleteIcon from "@mui/icons-material/Clear"
import IconButton from "@mui/material/IconButton"


/*
<ListItem divider key={offer.offers_id}>
                                <ListItemText primary={`${offer.business_name} | ${offer.offer_description}`} secondary={`Expiration: ${readableDate(offer.expiration_date)}`} />
                                <IconButton onClick={() => handleDeleteOffer(offer.offers_id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
*/

function ActiveOffersList({ uiState }) {
    const offersList = uiState.availableOffersList;
    return (
        <>
            {offersList.length > 0 && 
                <div>
                    <List>
                        {offersList.map(offer =>
                            <ListItem divider key={offer.offers_id}>
                                <ListItemText primary={`${offer.business_name} | ${offer.offer_description}`} secondary={`Expiration: ${readableDate(offer.expiration_date)}`} />
                            </ListItem>
                        )}
                    </List>
                </div>
            }
        </>
    )
}

export default ActiveOffersList