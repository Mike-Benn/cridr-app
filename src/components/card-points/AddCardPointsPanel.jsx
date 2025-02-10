import { NumberField , DateField , SelectField } from "../general/form-fields/InputFields"
import { useNavigate } from "react-router-dom";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient";

function AddCardPointsPanel() {
    const defaultCreditCardOption = [<option key="default" value="default">Select Credit Card</option>]
    const navigate = useNavigate();
    const [cardPointTransaction , setCardPointTransaction] = useState({
        creditCardId: "default",
        creditCardPointsEarned: "",
        pointsTransactionDate: "",
        creditCardOptions: [],

    })
    const handleCardPointTransactionChange = (e) => {
        const { name , value } = e.target;
        setCardPointTransaction((prev) => ({ ...prev , [name]: value }));

    }
    useEffect(() => {
        document.title = "Add Card Points | Cridr";
        const getCreditCardsById = async () => {
            try {
                const response = await apiClient.get("/credit-cards/") 
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setCardPointTransaction((prev) => ({ ...prev , creditCardOptions: response.data.data }));
                }
            } catch (error) {
                console.error(error , "Failed to fetch card options.");
            }
        }
        getCreditCardsById();

    }, []);

    const handleCardPointsSubmit = async (e) => {
        e.preventDefault();
        const pointTransaction = {
            credit_card_id: cardPointTransaction.creditCardId,
            card_points_amount: cardPointTransaction.creditCardPointsEarned,
            card_points_transaction_date: cardPointTransaction.pointsTransactionDate,
        }

        try {
            const response = await apiClient.post("/card-points/" , pointTransaction);
            if (response.data.success) {
                navigate("/card-points");
            }
        } catch (error) {
            console.error("Error while submitting card points", error);
        }
    }
    return (
        <form action="" onSubmit={handleCardPointsSubmit}>
            <fieldset>
                <legend>Add Card Points</legend>
                <SelectField fieldId="card-points-select-card" labelText="Select Credit Card" optionList={cardPointTransaction.creditCardOptions} onChange={handleCardPointTransactionChange} value={cardPointTransaction.creditCardId} optionIdAccessor="credit_card_id" optionTextAccessor="credit_card_name" name="creditCardId" defaultOptions={defaultCreditCardOption} />
                <NumberField labelText="Points Earned" onChange={handleCardPointTransactionChange} value={cardPointTransaction.creditCardPointsEarned} name="creditCardPointsEarned" />
                <DateField  labelText="Date Earned" onChange={handleCardPointTransactionChange} value={cardPointTransaction.pointsTransactionDate} name="pointsTransactionDate" />
                <SubmitFormButton buttonText="Submit Card Points" />
            </fieldset>
        </form>
    )
}

export default AddCardPointsPanel