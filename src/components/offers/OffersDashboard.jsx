import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import OffersDisplay from "./OffersDisplay"

function OffersDashboard() {

    const [uiState, setUiState] = useState({
        viewMode: "loading",
        creditCardList: [],
        selectedCardId: "",
        availableOffersMap: {},
        isDeleting: false,
    })
    useEffect(() => {
        document.title = "Offers | Cridr";
        const getData = async () => {
            try {
                const [creditCardResponse, offersResponse] = await Promise.all([
                    apiClient.get("/credit-cards"),
                    apiClient.get("/offers", { params: { includeMap: "true" } })
                ])
                setUiState((prev) => ({
                    ...prev,
                    creditCardList: creditCardResponse.data.data,
                    availableOffersMap: offersResponse.data.data.availableOffersMap,
                    viewMode: "viewing"
                }))
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        }
        getData();
    }, [])

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
        </>
    )
    
}

export default OffersDashboard