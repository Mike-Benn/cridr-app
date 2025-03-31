import { GeneralInputField, SelectField } from "../../../general/form-fields/InputFields"
import GeneralButton from "../../../general/buttons/GeneralButton"
import { useEffect, useState } from "react"
import apiClient from "../../../../api/apiClient"

function NewCreditCardForm() {
    const defaultBankOption = [<option key="default" value="default">Select Bank</option>]
    const [formData, setFormData] = useState({
        cardName: "",
        newBank: "",
        existingBankId: "default",
    })

    const [uiState, setUiState] = useState({
        bankList: [],
        addingNewBank: false,
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

    const toggleAddNewBank = () => {
        if (!uiState.addingNewBank) {
            setFormData((prev) => ({ ...prev, existingBankId: "default" }));
        } else {
            setFormData((prev) => ({ ...prev, newBank: "" }));
        }
        setUiState((prev) => ({ ...prev, addingNewBank: !prev.addingNewBank }))
    }

    const resetForm = () => {
        setUiState((prev) => ({ ...prev, addingNewBank: false, }))
        setFormData((prev) => ({
            ...prev,
            cardName: "",
            newBank: "",
            existingBankId: "default",
        }))
    }

    const handleNewCardSubmit = async (e) => {
        e.preventDefault();
        try {
            if (uiState.addingNewBank) {
                const newBankResponse = await apiClient.post("/businesses", { business_name: formData.newBank });
                uiState.bankList.push({ business_id: newBankResponse.data.data.business_id, business_name:  formData.newBank })
                await apiClient.post("/credit-cards", { credit_card_name: formData.cardName, business_id: newBankResponse.data.data.business_id });
            } else {
                await apiClient.post("/credit-cards", { credit_card_name: formData.cardName, business_id: formData.existingBankId })
            }
            resetForm();
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
    if (uiState.isLoading) return <p>Loading...</p>
    let bankContent;

    if (!uiState.addingNewBank) {
        bankContent = <>
            <SelectField fieldId="new-credit-card-select-bank" labelText="Select Bank" optionList={uiState.bankList} onChange={handleNewCardChange} value={formData.existingBankId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="existingBankId" defaultOptions={defaultBankOption}/>
            <GeneralButton buttonType="button" buttonText="Add new bank" onClick={toggleAddNewBank} />
        </>
    } else {
        bankContent = <>
            <GeneralInputField inputType="text" labelText="Enter New Bank" onChange={handleNewCardChange} value={formData.newBank} name="newBank" />
            <GeneralButton buttonType="button" buttonText="Choose existing bank" onClick={toggleAddNewBank} />
        </>
    }

    return (
        <form action="" onSubmit={handleNewCardSubmit}>
            <fieldset>
                <legend>New Credit Card</legend>
                {bankContent}
                <GeneralInputField inputType="text" labelText="Card Name" onChange={handleNewCardChange} value={formData.cardName} name="cardName" />
                <GeneralButton buttonType="submit" buttonText="Add card" />
            </fieldset>
        </form>
    )
}

export default NewCreditCardForm