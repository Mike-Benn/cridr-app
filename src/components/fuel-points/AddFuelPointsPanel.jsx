import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberField from "../general/form-fields/NumberField";
import DateField from "../general/form-fields/DateField";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import axios from "axios";


function AddFuelPointsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [pointsRedeemed, setPointsRedeemed] = useState("");
    const [gallons, setGallons] = useState("");
    const [dateRedeemed, setDateRedeemed] = useState("");
    

    

    useEffect(() => {
        document.title = "Add Fuel Points | Cridr";
        
    }, []);
    
    const clearForm = () => {
        setPointsRedeemed("");
        setGallons("");
        setDateRedeemed("");
    }

    const handlePointsRedeemedChange = (e) => {
        setPointsRedeemed(e.target.value);
    }

    const handleGallonsChange = (e) => {
        setGallons(Number(e.target.value));
    }

    const handleDateRedeemedChange = (e) => {
        setDateRedeemed(e.target.value);
    }

    const handleFuelPointsSubmit = async (e) => {
        e.preventDefault();
        setGallons(Number(gallons.toFixed(3)));
        const newFuelPoints = {
            points_redeemed: Number(pointsRedeemed),
            gallons,
            date_redeemed: dateRedeemed,
            username: "Mike",
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
                <NumberField fieldName='Points Redeemed' value={pointsRedeemed} onChange={handlePointsRedeemedChange} name='points_redeemed' />
                <NumberField fieldName='Gallons' value={gallons} onChange={handleGallonsChange} name='gallons' />
                <DateField fieldName='Date Redeemed' value={dateRedeemed} onChange={handleDateRedeemedChange} name='date_redeemed' />
                <SubmitFormButton buttonText='Submit Fuel Points' />
            </fieldset>
        </form>
    )


}

export default AddFuelPointsPanel