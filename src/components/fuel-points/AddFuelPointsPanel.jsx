import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitFormButton from "../general/buttons/SubmitFormButton";
import { NumberField , DateField } from "../general/form-fields/InputFields"
import apiClient from "../../api/apiClient"



function AddFuelPointsPanel() {
    const navigate = useNavigate();
    const [fuelPointTransaction, setFuelPointTransaction] = useState({
        fuelPointsRedeemed: "",
        gallonsOfGas: "",
        fuelPointTransactionDate: "",
    })
    useEffect(() => {
        document.title = "Add Fuel Points | Cridr";
        
    }, []);
    
    const handleFuelTransactionChange = (e) => {
        const { name, value } = e.target;
        setFuelPointTransaction((prev) => ({ ...prev, [name]: value }));
    };

    const resetFuelPointsForm = () => {
        setFuelPointTransaction({ 
            fuelPointsRedeemed: "",
            gallonsOfGas: "",
            fuelPointTransactionDate: "",
        })
    }

    const handleFuelPointsSubmit = async (e) => {
        e.preventDefault();
        const newFuelPoints = {
            fuel_points_amount: fuelPointTransaction.fuelPointsRedeemed,
            gallons_filled: fuelPointTransaction.gallonsOfGas,
            fuel_points_transaction_date: fuelPointTransaction.fuelPointTransactionDate,
        }

        try {
            const response = await apiClient.post("/fuel-points-transaction", newFuelPoints)
            if (response.data.success) {
                resetFuelPointsForm();
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
                <NumberField labelText="Points Redeemed" value={fuelPointTransaction.fuelPointsRedeemed} onChange={handleFuelTransactionChange} name="fuelPointsRedeemed" />
                <NumberField labelText="Gallons of Gas" value={fuelPointTransaction.gallonsOfGas} onChange={handleFuelTransactionChange} name="gallonsOfGas" />
                <DateField labelText="Date Redeemed" value={fuelPointTransaction.fuelPointTransactionDate} onChange={handleFuelTransactionChange} name="fuelPointTransactionDate" />
                <SubmitFormButton buttonText='Submit Fuel Points' />
            </fieldset>
        </form>
    )
}

export default AddFuelPointsPanel