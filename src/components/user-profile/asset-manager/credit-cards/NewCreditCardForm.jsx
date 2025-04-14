import { GeneralInputField, SelectField } from "../../../general/form-fields/InputFields"
import GeneralButton from "../../../general/buttons/GeneralButton"
import { useEffect, useState } from "react"
import apiClient from "../../../../api/apiClient"
import PropTypes from "prop-types"

function NewCreditCardForm({ setCreditCards, setParentUiState }) {
    const defaultBankOption = [<option key="default" value="default">Select Bank</option>]
    const [formData, setFormData] = useState({
        cardName: "",
        existingBankId: "default",
    })

    const [uiState, setUiState] = useState({
        bankList: [],
        isLoading: true,
    })

    useEffect(() => {
        const getBanks = async () => {
            try {
                const response = await apiClient.get("/businesses/?business_type_name=bank");
                if (response.status === 200 && Array.isArray(response.data?.data)) {
                    setUiState((prev) => ({ 
                        ...prev, 
                        bankList: [...response.data.data],
                        isLoading: false 
                    }))
                    
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getBanks();

    }, [])

    const handleNewCardChange = (e) => {
        const { name , value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    

    const resetForm = () => {
        setFormData((prev) => ({
            ...prev,
            cardName: "",
            existingBankId: "default",
        }))
    }

    const handleNewCardSubmit = async (e) => {
        e.preventDefault();
        const submitAction = e.nativeEvent.submitter.value;
        try {
            if (submitAction === "submit") {
                const response = await apiClient.post("/credit-cards", { credit_card_name: formData.cardName, business_id: formData.existingBankId });
                if (Array.isArray(response.data?.data)) {
                    setCreditCards((prev) => [...prev, response.data.data[0]])
                }
                setParentUiState((prev) => ({ ...prev, isAddingCard: false }))
                
            } else if (submitAction === "submitAnother") {
                const response = await apiClient.post("/credit-cards", { credit_card_name: formData.cardName, business_id: formData.existingBankId });
                if (Array.isArray(response.data?.data)) {
                    setCreditCards((prev) => [...prev, response.data.data[0]])
                }
                resetForm();
            }
            
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
    if (uiState.isLoading) return <p>Loading...</p>

    return (
        <form action="" onSubmit={handleNewCardSubmit}>
            <fieldset>
                <legend>New Credit Card</legend>
                <SelectField fieldId="new-credit-card-select-bank" labelText="Select Bank" optionList={uiState.bankList} onChange={handleNewCardChange} value={formData.existingBankId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="existingBankId" defaultOptions={defaultBankOption}/>
                <GeneralInputField inputType="text" labelText="Card Name" onChange={handleNewCardChange} value={formData.cardName} name="cardName" />
                <GeneralButton buttonType="submit" buttonText="Add Card" value="submit"/>
                <GeneralButton buttonType="submit" buttonText="Add Another" value="submitAnother"/>
            </fieldset>
        </form>
    )
}

NewCreditCardForm.propTypes = {
    setCreditCards: PropTypes.func,
    setParentUiState: PropTypes.func,

}

export default NewCreditCardForm