import { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import RedeemedOffersDisplay from "./RedeemedOffersDisplay"

function RedeemedOffersDashboard() {
    const [uiState, setUiState] = useState({
        viewMode: "loading",
        businessList: [],
        creditCardList: [],
        offersList: [],
    })

    useEffect(() => {
        const getRedeemedOffers = async () => {
            try {
                const redeemedOffersResponse = await apiClient.get("/offers/redeemed");
                setUiState((prev) => ({
                    ...prev,
                    viewMode: "viewing",
                    offersList: redeemedOffersResponse.data.data,
                }))
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        }
        getRedeemedOffers();
    }, [])

    if (uiState.viewMode === "loading") return <p>Loading...</p>

    

    return (
        <>
            <RedeemedOffersDisplay offersList={uiState.offersList} />
        </>
    )
}

export default RedeemedOffersDashboard