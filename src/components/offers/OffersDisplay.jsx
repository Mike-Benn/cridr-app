import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import styles from "./OffersDisplay.module.css"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import { readableDate } from "../../utils/offers/utils"
import DeleteIcon from "@mui/icons-material/Clear"
import IconButton from "@mui/material/IconButton"
import apiClient from "../../api/apiClient"
import Button from "@mui/material/Button"


function OffersDisplay({ uiState, handlers }) {
    
    const handleDeleteOffer = async (offerId) => {
        const originalList = uiState.availableOffersMap[uiState.selectedCardId];
        const creditCardId = uiState.selectedCardId;
        const filtered = availableOffersList.filter(offer => offer.offers_id !== offerId);
        if (filtered.length === 0) {
            handlers.setUiState(prev => {
                const newMap = {...prev.availableOffersMap}
                delete newMap[creditCardId];
                return {
                    ...prev,
                    selectedCardId: "",
                    availableOffersMap: newMap,
                }
            })
        } else {
            handlers.setUiState(prev => ({
                ...prev,
                availableOffersMap: {
                    ...prev.availableOffersMap,
                    [creditCardId]: filtered,
                }
            }))
        }
        
        try {
            await apiClient.delete(`/offers/${offerId}`);

        } catch (error) {
            console.log(error.response?.data?.message);
            handlers.setUiState(prev => ({
                ...prev,
                availableOffersMap: {
                    ...prev.availableOffersMap,
                    [creditCardId]: originalList
                }
            }))
        }
    }

    const getAvailableOffersList = () => {
        if (!uiState.selectedCardId) return [];
        if (uiState.selectedCardId === "all") {
            return uiState.availableOffersList;
        }
        return uiState.availableOffersMap[uiState.selectedCardId]
    }
    
    const availableOffersList = getAvailableOffersList();
    const creditCardList = uiState.creditCardList.filter(card => 
        uiState.availableOffersMap.hasOwnProperty(card.credit_card_id) && uiState.availableOffersMap[card.credit_card_id].length > 0
    )
    return (
        <div className={styles.displayMain}>
            <Typography variant="h6">Card Offers</Typography>
            <FormControl fullWidth>
                <InputLabel id="select-card-account-label">Card Account</InputLabel>
                <Select
                    labelId="select-card-account-label"
                    id="select-card-account"
                    value={uiState.selectedCardId}
                    label="Card Account"
                    onChange={handlers.handleChange}
                    name="selectedCardId"
                >
                    <MenuItem key="all" value="all">
                        All offers
                    </MenuItem>
                    {creditCardList.map(card => (
                        <MenuItem key={card.credit_card_id} value={card.credit_card_id}>{card.credit_card_name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {availableOffersList.length > 0 && 
                <List>
                    {availableOffersList.map(offer => (
                        <ListItem divider key={offer.offers_id}>
                            <ListItemText primary={`${offer.business_name} | ${offer.offer_description}`} secondary={`Expiration: ${readableDate(offer.expiration_date)}`} />
                            <IconButton onClick={() => handleDeleteOffer(offer.offers_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            }
            <Button variant="contained" onClick={handlers.toggleViewMode} sx={{ alignSelf: "flex-start" }}>Add offer</Button>

        </div>
        
        
    )
    
}

export default OffersDisplay