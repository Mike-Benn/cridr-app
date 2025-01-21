import { NumberField , DateField , SelectField } from "../general/form-fields/InputFields"
import { useNavigate } from "react-router-dom";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { useEffect, useState } from "react"
import { addDefaultOptionToSelect } from "../../utils/general/utils";
import apiClient from "../../api/apiClient";

function AddCardPointsPanel() {
    const navigate = useNavigate();
    const [cardPointTransaction , setCardPointTransaction] = useState({
        creditCardId: "-1",
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
        const getCreditCards = async () => {
            try {
                const response = await apiClient.get("/credit-cards/") 
                if (response.data) {
                    let optionList = [...response.data.data];
                    addDefaultOptionToSelect(optionList , "credit_card_name" , "credit_card_id" , "Select Credit Card");
                    setCardPointTransaction((prev) => ({ ...prev , creditCardOptions: optionList }));
                }
            } catch (error) {
                console.error(error , "Failed to fetch card options.");
            }
        }
        getCreditCards();

    }, []);

    const resetPointsForm = () => {
        setCardPointTransaction({
            creditCardId: "-1",
            creditCardPointsEarned: "",
            pointsTransactionDate: "",
            creditCardOptions: [],
        })

    }

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
                resetPointsForm();
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
                <SelectField fieldId="card-points-select-card" labelText="Select Credit Card" optionList={cardPointTransaction.creditCardOptions} onChange={handleCardPointTransactionChange} value={cardPointTransaction.creditCardId} optionIdAccessor="credit_card_id" optionTextAccessor="credit_card_name" name="creditCardId" />
                <NumberField labelText="Points Earned" onChange={handleCardPointTransactionChange} value={cardPointTransaction.creditCardPointsEarned} name="creditCardPointsEarned" />
                <DateField  labelText="Date Earned" onChange={handleCardPointTransactionChange} value={cardPointTransaction.pointsTransactionDate} name="pointsTransactionDate" />
                <SubmitFormButton buttonText="Submit Card Points" />
            </fieldset>
        </form>
    )
}

export default AddCardPointsPanel