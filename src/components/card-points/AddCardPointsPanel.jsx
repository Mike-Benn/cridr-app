import SelectField from "../general/form-fields/SelectField"
import NumberField from "../general/form-fields/NumberField";
import { CARD_OPTIONS } from "../../utils/cards/cardOptions"
import { CARD_PROVIDER_OPTIONS } from "../../utils/cards/cardProviderOptions";
import DateField from "../general/form-fields/DateField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { useEffect, useState } from "react"

function AddCardPointsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [cardName , setCardName] = useState("default");
    const [cardProvider , setCardProvider] = useState("default");
    const [pointsEarned , setPointsEarned] = useState("");
    const [dateEarned , setDateEarned] = useState("");

    useEffect(() => {
        document.title = "Add Card Points | Cridr";

    }, []);

    const handleCardNameChange = (e) => {
        setCardName(e.target.value);
    }

    const handleCardProviderChange = (e) => {
        setCardProvider(e.target.value);
    }

    const handlePointsEarnedChange = (e) => {
        setPointsEarned(e.target.value);
    }

    const handleDateEarnedChange = (e) => {
        setDateEarned(e.target.value);
    }

    const handleClearForm = () => {
        setCardName("default");
        setCardProvider("default");
        setPointsEarned("");
        setDateEarned("");

    }

    const handleCardPointsFormSubmit = async (e) => {
        e.preventDefault();
        const pointTransaction = {
            username: "Mike",
            card_name: cardName,
            card_provider: cardProvider,
            amount: pointsEarned,
            date_earned: dateEarned,
        }
        try {
            const response = await axios.post(`${apiUrl}/card-points/submit-card-points`, pointTransaction);
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
                <SelectField options={CARD_OPTIONS} onChange={handleCardNameChange} value={cardName} />
                <SelectField options={CARD_PROVIDER_OPTIONS} onChange={handleCardProviderChange} value={cardProvider} />
                <NumberField fieldName="Points Earned" onChange={handlePointsEarnedChange} value={pointsEarned} />
                <DateField fieldName="Date Earned" onChange={handleDateEarnedChange} value={dateEarned} />
                <SubmitFormButton buttonText="Submit Card Points" />
            </fieldset>
        </form>
    )
}

export default AddCardPointsPanel