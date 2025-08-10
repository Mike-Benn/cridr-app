import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import OffersDisplay from "./OffersDisplay"
import NewOfferForm from "./NewOfferForm";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function OffersDashboard() {

    const [uiState, setUiState] = useState({
        viewMode: "viewing",
        creditCardList: [],
        businessList: [],
        businessMap: {},
        selectedCardId: "",
        availableOffersList: [],
        idToDelete: "",
    })

    const [alertStatus, setAlertStatus] = useState(false);

    const [uiFlags, setUiFlags] = useState({
        loadingCount: 1,
        needsRefreshed: false,
    })

    const startLoad = () => setUiFlags(prev => ({
        ...prev,
        loadingCount: prev.loadingCount + 1
    }))

    const endLoad = () => setUiFlags(prev => ({
        ...prev, loadingCount: prev.loadingCount - 1
    }))

    const getOffers = async () => {
        startLoad();
        try {
            const [offersResponse] = await Promise.all([
                apiClient.get("/offers", { params: { cardId: uiState.selectedCardId, order: "ASC" } }),
            ])
            setUiState(prev => ({
                ...prev,
                availableOffersList: offersResponse.data.data
            }))
        } catch (error) {
            console.log(error)
        }
        endLoad();
    }

    useEffect(() => {
        document.title = "Offers | Cridr";
        const getData = async () => {
            try {
                const [creditCardResponse, businessesResponse] = await Promise.all([
                    apiClient.get("/credit-cards"),
                    apiClient.get("/businesses", { params: { featureNames: "Coupons", includeMap: "true" } }),
                ])
                const firstCard = creditCardResponse.data.data[0].credit_card_id;
                setUiState((prev) => ({
                    ...prev,
                    creditCardList: creditCardResponse.data.data,
                    businessList: businessesResponse.data.data.businessList,
                    businessMap: businessesResponse.data.data.businessMap,
                    selectedCardId: firstCard,
                }))
            } catch (error) {
                console.log(error)
            }
            endLoad();
        }
        getData();
    }, [])

    useEffect(() => {
        if (uiState.selectedCardId === "") return;
        getOffers();
    }, [uiState.selectedCardId])

    useEffect(() => {
        if (!uiFlags.needsRefreshed || uiState.viewMode !== "viewing") return;
        getOffers();
        setUiFlags(prev => ({ ...prev, needsRefreshed: false }))
    }, [uiFlags.needsRefreshed, uiState.viewMode])

    const toggleViewMode = () => {
        setUiState(prev => ({
            ...prev,
            viewMode: uiState.viewMode === "viewing" ? "editing" : "viewing",
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUiState(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleConfirmDelete = async () => {
        try {
            await apiClient.delete(`/offers/${uiState.idToDelete}`);
            setUiState(prev => ({ ...prev, idToDelete: "" }))
            setUiFlags(prev => ({ ...prev, needsRefreshed: true }))
            setAlertStatus(false);

        } catch (error) {
            console.log(error)
        }
    }

    const toggleAlertOn = (offerId) => {
        setUiState(prev => ({ ...prev, idToDelete: offerId }))
        setAlertStatus(true);

    }

    const toggleAlertOff = () => {
        setUiState(prev => ({ ...prev, idToDelete: "" }))
        setAlertStatus(false)
    }
    

    const summaryHandlers = {
        toggleViewMode,
        handleChange,
        toggleAlertOn,
    }

    const formHandlers = {
        toggleViewMode,
        setUiFlags,
    }

    const isLoading = uiFlags.loadingCount > 0;
    return (
        <>
            <Dialog
                open={alertStatus}
                onClose={toggleAlertOff}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete offer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this offer?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleAlertOff}>Disagree</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
            {!isLoading && ! uiFlags.needsRefreshed && uiState.viewMode === "viewing" && <OffersDisplay uiState={uiState} handlers={summaryHandlers} />}
            {!isLoading && uiState.viewMode === "editing" && <NewOfferForm uiState={uiState} handlers={formHandlers}/>}
        </>
    )
    
}

export default OffersDashboard