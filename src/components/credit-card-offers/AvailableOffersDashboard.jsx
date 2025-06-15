import { useEffect, useState } from "react"
import NewOfferForm from "./NewOfferForm"
import GeneralButton from "../general/buttons/GeneralButton"
import apiClient from "../../api/apiClient"
import AvailableOffersDisplay from "./AvailableOffersDisplay"


function AvailableOffersDashboard() {
    const [uiState, setUiState] = useState({
        viewMode: "loading", // loading, viewing, editing
        businessList: [],
        creditCardList: [],
        offersList: [],
    })

    const [newOfferFormData, setNewOfferFormData] = useState({
        selectedCreditCardId: "",
        selectedBusinessId: "",
        offerDescription: "",
        expirationDate: "",
    })

    const newOfferFormTemplate = {
        selectedCreditCardId: "",
        selectedBusinessId: "",
        offerDescription: "",
        expirationDate: "",
    }

    useEffect(() => {
        const getData = async () => {
            const businessesParams = new URLSearchParams();
            businessesParams.append("featureNames", "Offers");
            try {
                const [creditCardsResponse, businessesResponse, availableOffersResponse] = await Promise.all([
                    apiClient.get("/credit-cards"),
                    apiClient.get("/businesses", { params: businessesParams }),
                    apiClient.get("/offers"),
                ])
                setUiState((prev) => ({
                    ...prev,
                    businessList: businessesResponse.data.data,
                    creditCardList: creditCardsResponse.data.data,
                    offersList: availableOffersResponse.data.data,
                    viewMode: "viewing",
                }))

            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getData();
    }, [])

    const toggleViewMode = () => {
        setUiState((prev) => ({ ...prev, viewMode: prev.viewMode === "editing" ? "viewing" : "editing" }));
        setNewOfferFormData(newOfferFormTemplate);
    }

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setNewOfferFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const submitAction = e.nativeEvent.submitter.value;
        const newOffer = {
            credit_card_id: Number(newOfferFormData.selectedCreditCardId),
            business_id: Number(newOfferFormData.selectedBusinessId),
            offer_description: newOfferFormData.offerDescription,
            expiration_date: newOfferFormData.expirationDate,
        }
        
        const business = uiState.businessList.find(business => business.business_id === newOffer.business_id);
        const creditCard = uiState.creditCardList.find(creditCard => creditCard.credit_card_id === newOffer.credit_card_id);
        try {
            const response = await apiClient.post("/offers", newOffer);
            newOffer.business_name = business.business_name;
            newOffer.credit_card_name = creditCard.credit_card_name;
            newOffer.offers_id = response.data.data[0].offers_id;
            if (submitAction === "submit") {
                setUiState((prev) => ({
                    ...prev,
                    viewMode: "viewing", 
                    offersList: [...prev.offersList, newOffer],
                }))
            } else {
                setUiState((prev) => ({ ...prev, offersList: [...prev.offersList, newOffer]}));
            }
            setNewOfferFormData(newOfferFormTemplate);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    if (uiState.viewMode === "loading") return <p>Loading...</p>

    const newOfferFormHandlers = {
        handleFormDataChange,
        handleFormSubmit,

    }

    const uiStateHandlers = {
        setUiState,
    }

    return (
        <>
            {uiState.viewMode === "viewing" && <AvailableOffersDisplay offersList={uiState.offersList} handlers={uiStateHandlers} />}
            {uiState.viewMode === "viewing" && <GeneralButton buttonType="button" buttonText="Add new offer" onClick={toggleViewMode} />}
            {uiState.viewMode === "editing" && <GeneralButton buttonType="button" buttonText="Cancel" onClick={toggleViewMode} />}
            {uiState.viewMode === "editing" && <NewOfferForm newOfferFormData={newOfferFormData} uiState={uiState} handlers={newOfferFormHandlers} />}
        </>

    )
}

export default AvailableOffersDashboard

