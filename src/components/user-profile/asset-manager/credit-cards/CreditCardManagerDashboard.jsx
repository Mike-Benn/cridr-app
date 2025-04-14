import { useEffect, useState } from "react";
import NewCreditCardForm from "./NewCreditCardForm";
import GeneralButton from "../../../general/buttons/GeneralButton";
import apiClient from "../../../../api/apiClient";

function CreditCardManagerDashboard() {

    const [creditCards, setCreditCards] = useState([]);
    const [uiState, setUiState] = useState({
        isAddingCard: false,
        isLoading: true,
    })
    const toggleAddCard = () => {
        setUiState((prev) => ({ ...prev, isAddingCard: !prev.isAddingCard }))
    }
    
    useEffect(() => {
        const getCreditCards = async () => {
            try {
                const response = await apiClient.get("/credit-cards");
                if (response.data?.data && Array.isArray(response.data.data)) {
                    setCreditCards(response.data.data);
                    setUiState((prev) => ({ ...prev, isLoading: false} ))
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getCreditCards();
    }, [])
    if (uiState.isLoading) return <p>Loading...</p>
    const creditCardList = <ul>{creditCards.map(card =>  <li key={card.credit_card_id}>{card.credit_card_name}</li>)}</ul>
    return (
        <>
            {!uiState.isAddingCard && creditCardList}
            {uiState.isAddingCard && <NewCreditCardForm setParentUiState={setUiState} setCreditCards={setCreditCards}/>}
            {uiState.isAddingCard && <GeneralButton buttonType="button" buttonText="Cancel" onClick={toggleAddCard} />}
            {!uiState.isAddingCard && <GeneralButton buttonType="button" buttonText="Add New Card" onClick={toggleAddCard} />}
        </>
    )
}

export default CreditCardManagerDashboard