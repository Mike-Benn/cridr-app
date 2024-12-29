import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberField from "../general/form-fields/NumberField";
import DateField from "../general/form-fields/DateField";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import axios from "axios";


function AddFuelPointsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [userId , setUserId] = useState(1);
    const [fuelPointsRedeemed, setFuelPointsRedeemed] = useState("");
    const [gallons, setGallons] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    
    useEffect(() => {
        document.title = "Add Fuel Points | Cridr";
        
    }, []);
    
    const clearForm = () => {
        setFuelPointsRedeemed("");
        setGallons("");
        setTransactionDate("");
    }

    const handleFuelPointsRedeemedChange = (e) => {
        setFuelPointsRedeemed(e.target.value);
    }

    const handleGallonsChange = (e) => {
        setGallons(Number(e.target.value));
    }

    const handleTransactionDateChange = (e) => {
        setTransactionDate(e.target.value);
    }

    const handleFuelPointsSubmit = async (e) => {
        e.preventDefault();
        const roundedGallons = Number(gallons.toFixed(3));
        const newFuelPoints = {
            user_id: userId,
            fuel_points_amount: Number(fuelPointsRedeemed),
            gallons_filled: roundedGallons,
            fuel_points_transaction_date: transactionDate,
        }

        try {
            const response = await axios.post(`${apiUrl}/fuel-points/submit-fuel-points`, newFuelPoints)

            if (response.status === 200) {
                clearForm();
                navigate('/fuel-points');
            }
        } catch (error) {
            console.error("Error while adding fuel points", error);
        }
    }

    return (
        <form action='' onSubmit={handleFuelPointsSubmit}>
            <fieldset>
                <legend>Add Fuel Points</legend>
                <NumberField fieldName='Points Redeemed' value={fuelPointsRedeemed} onChange={handleFuelPointsRedeemedChange} name='points_redeemed' />
                <NumberField fieldName='Gallons' value={gallons} onChange={handleGallonsChange} name='gallons' />
                <DateField fieldName='Date Redeemed' value={transactionDate} onChange={handleTransactionDateChange} name='date_redeemed' />
                <SubmitFormButton buttonText='Submit Fuel Points' />
            </fieldset>
        </form>
    )
}

export default AddFuelPointsPanel