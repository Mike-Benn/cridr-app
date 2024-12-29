import NumberField from "../general/form-fields/NumberField";
import DateField from "../general/form-fields/DateField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { useEffect, useState } from "react"
import { addDefaultOptionToSelect } from "../../utils/general/utils";
import VariableSelectField from "../general/form-fields/VariableSelectField";

function AddCardPointsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [userId , setUserId] = useState(1);
    const [cardId , setCardId] = useState("-1");
    const [pointsEarned , setPointsEarned] = useState("");
    const [transactionDate , setTransactionDate] = useState("");
    const [cardOptions , setCardOptions] = useState([]);

    useEffect(() => {
        document.title = "Add Card Points | Cridr";

        const fetchCreditCards = async () => {
            
            try {
                const response = await axios.get(`${apiUrl}/utils/get-credit-cards-by-id/${userId}`) 
                if (response.data) {
                    let optionList = [...response.data.data];
                    addDefaultOptionToSelect(optionList , "credit_card_name" , "credit_card_id" , "Select Credit Card");
                    setCardOptions(optionList);
                }
            } catch (error) {
                console.error(error , "Failed to fetch card options.");
            }
        }
        fetchCreditCards();

    }, [apiUrl , userId]);

    const handleCardIdChange = (e) => {
        setCardId(e.target.value);
    }

    const handlePointsEarnedChange = (e) => {
        setPointsEarned(e.target.value);
    }

    const handleTransactionDateChange = (e) => {
        setTransactionDate(e.target.value);
    }

    const handleClearForm = () => {
        setCardId("-1");
        setPointsEarned("");
        setTransactionDate("");
        setCardOptions([]);

    }

    const handleCardPointsFormSubmit = async (e) => {
        e.preventDefault();
        const cardPointTransaction = {
            user_id: userId,
            credit_card_id: cardId,
            card_points_amount: pointsEarned,
            card_points_transaction_date: transactionDate,
        }

        try {
            const response = await axios.post(`${apiUrl}/card-points/submit-card-points` , cardPointTransaction);
            if (response.status === 200) {
                handleClearForm();
                navigate("/card-points");
            }
        } catch (error) {
            console.error("Error while submitting card points", error);
        }
    }
    return (
        <form action="" onSubmit={handleCardPointsFormSubmit}>
            <fieldset>
                <legend>Add Card Points</legend>
                <VariableSelectField fieldId="card-points-select-card" labelText="Select Credit Card" optionList={cardOptions} onChange={handleCardIdChange} value={cardId} optionIdAccessor="credit_card_id" optionTextAccessor="credit_card_name" />
                <NumberField fieldName="Points Earned" onChange={handlePointsEarnedChange} value={pointsEarned} />
                <DateField fieldName="Date Earned" onChange={handleTransactionDateChange} value={transactionDate} />
                <SubmitFormButton buttonText="Submit Card Points" />
            </fieldset>
        </form>
    )
}

export default AddCardPointsPanel