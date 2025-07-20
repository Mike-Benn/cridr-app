import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import OffersDisplay from "./OffersDisplay"
import NewOfferForm from "./NewOfferForm";

function OffersDashboard() {

    const [uiState, setUiState] = useState({
        viewMode: "loading",
        creditCardList: [],
        businessList: [],
        businessMap: {},
        selectedCardId: "",
        availableOffersMap: {},
        availableOffersList: [],
    })
    useEffect(() => {
        document.title = "Offers | Cridr";
        const getData = async () => {
            try {
                const [creditCardResponse, businessesResponse, offersResponse] = await Promise.all([
                    apiClient.get("/credit-cards"),
                    apiClient.get("/businesses", { params: { featureNames: "Coupons", includeMap: "true" } }),
                    apiClient.get("/offers", { params: { includeMap: "true" } })
                ])
                setUiState((prev) => ({
                    ...prev,
                    creditCardList: creditCardResponse.data.data,
                    availableOffersMap: offersResponse.data.data.availableOffersMap,
                    availableOffersList: offersResponse.data.data.availableOffersList,
                    businessList: businessesResponse.data.data.businessList,
                    businessMap: businessesResponse.data.data.businessMap,
                    viewMode: "viewing"
                }))
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])

    const toggleViewMode = () => {
        setUiState(prev => ({
            ...prev,
            viewMode: uiState.viewMode === "viewing" ? "editing" : "viewing",
            selectedCardId: "",
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUiState(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handlers = {
        setUiState,
        toggleViewMode,
        handleChange,
    }
    return (
        <>
            {uiState.viewMode === "viewing" &&
                <OffersDisplay uiState={uiState} handlers={handlers} />
            }

            {uiState.viewMode === "editing" &&
                <NewOfferForm uiState={uiState} handlers={handlers}/>
            }
        </>
    )
    
}

export default OffersDashboard