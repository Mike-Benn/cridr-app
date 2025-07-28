import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import styles from "./OffersDisplay.module.css"
import Typography from "@mui/material/Typography"
import apiClient from "../../api/apiClient"
import Button from "@mui/material/Button"
import ActiveOffersList from "./ActiveOffersList"

function OffersDisplay({ uiState, handlers }) {

    // Outdated, availableOffersMap is not being fetched anymore
    const handleDeleteOffer = async (offerId) => {
        try {
            await apiClient.delete(`/offers/${offerId}`);
            const creditCardId = uiState.selectedCardId;
            const filteredMapList = uiState.availableOffersMap[creditCardId].filter(offer => offer.offers_id !== offerId)
            if (filteredMapList.length === 0) {
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
                        [creditCardId]: filteredMapList,

                    }
                }))
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <Typography variant="h6" sx={{ fontWeight: "bold", alignSelf: "center" }}>Card Offers</Typography>
                <div className={styles.subheader}>
                    <div className={styles.totalOffers}>
                        <Typography variant="body2" sx={{ fontSize: "1.5rem" }}>-1</Typography>
                        <Typography variant="caption">Offers</Typography>
                    </div>
                    <Button variant="contained" size="small" onClick={handlers.toggleViewMode} sx={{ alignSelf: "center" }}>Add offer</Button>
                </div>
            </header>
            <section className={styles.activeOffers}>
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
                        {uiState.creditCardList.map(card => (
                            <MenuItem key={card.credit_card_id} value={card.credit_card_id}>{card.credit_card_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className={styles.offerList}>
                    <Typography variant="subtitle1" sx={{ paddingLeft: "16px" }}>Active Offers</Typography>
                    <ActiveOffersList uiState={uiState} />
                </div>
            </section>
        </main>
    )
}

export default OffersDisplay