import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import OffersDisplay from "./OffersDisplay"
import NewOfferForm from "./NewOfferForm";

function OffersDashboard() {

    const [uiState, setUiState] = useState({
        viewMode: "viewing",
        creditCardList: [],
        businessList: [],
        businessMap: {},
        selectedCardId: "",
        availableOffersList: [],
    })

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

    const handleDeleteOffer = async (offerId) => {
        try {
            await apiClient.delete(`/offers/${offerId}`);
            setUiFlags(prev => ({ ...prev, needsRefreshed: true }))

        } catch (error) {
            console.log(error)
        }
    }

    const summaryHandlers = {
        toggleViewMode,
        handleChange,
        handleDeleteOffer,
    }

    const formHandlers = {
        toggleViewMode,
        setUiFlags,
    }

    const isLoading = uiFlags.loadingCount > 0;
    return (
        <>
            {!isLoading && ! uiFlags.needsRefreshed && uiState.viewMode === "viewing" && <OffersDisplay uiState={uiState} handlers={summaryHandlers} />}
            {!isLoading && uiState.viewMode === "editing" && <NewOfferForm uiState={uiState} handlers={formHandlers}/>}
        </>
    )
    
}

export default OffersDashboard