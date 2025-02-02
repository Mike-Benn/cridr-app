import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../../api/apiClient";
import { CategorySelect, NumberField, DateField } from "../../general/form-fields/InputFields";
import SubmitFormButton from "../../general/buttons/SubmitFormButton";


function NewFuelTransactionPanel() {
    const navigate = useNavigate();
    const [vehicleOptions , setVehicleOptions] = useState([]);

    const [fuelTransaction, setFuelTransaction] = useState({
        selectedVehicleId: "",
        pricePerGallon: "",
        gallonsOfGas: "",
        fuelPointsRedeemed: "",
        fuelTransactionDate: "",
    })
    useEffect(() => {
        document.title = "Add Fuel Transaction | Cridr";
        const getVehicles = async () => {
            try {
                const response = await apiClient.get("/vehicles");
                if (response.data) {
                    const vehicleList = [...response.data.data];
                    setVehicleOptions(vehicleList);
                    setFuelTransaction((prev) => ({ ...prev, selectedVehicleId: vehicleList[0].vehicle_id }))
                }
            } catch (error) {
                console.error("Unable to get vehicles.", error);
            }
        }
        getVehicles();
    }, []);
    
    const handleFuelTransactionChange = (e) => {
        const { name, value } = e.target;
        setFuelTransaction((prev) => ({ ...prev, [name]: value }));
    };

    const resetFuelTransactionForm = () => {
        setFuelTransaction({ 
            selectedVehicleId: "",
            pricePerGallon: "",
            gallonsOfGas: "",
            fuelPointsRedeemed: "",
            fuelTransactionDate: "",
        })
    }

    const handleFuelTransactionSubmit = async (e) => {
        e.preventDefault();
        console.log(fuelTransaction.selectedVehicleId)
        const newFuelTransaction = {
            vehicle_id: fuelTransaction.selectedVehicleId,
            price_per_gallon: fuelTransaction.pricePerGallon,
            gallons_filled: fuelTransaction.gallonsOfGas,
            fuel_points_redeemed: fuelTransaction.fuelPointsRedeemed,
            transaction_fuel_date: fuelTransaction.fuelTransactionDate,
            
        }
        try {
            const response = await apiClient.post("/fuel-transaction", newFuelTransaction)
            if (response.data.success) {
                resetFuelTransactionForm();
                navigate('/fuel-transaction');
            }
        } catch (error) {
            console.error("Error while adding fuel points", error);
        }
    }

    return (
        <form action='' onSubmit={handleFuelTransactionSubmit}>
            <fieldset>
                <legend>Add Fuel Transaction</legend>
                <CategorySelect fieldId="fuel-transaction-select-vehicle" labelText="Select Vehicle" optionList={vehicleOptions} onChange={handleFuelTransactionChange} value={fuelTransaction.selectedVehicleId} optionTextAccessor="vehicle_model" optionIdAccessor="vehicle_id" name="selectedVehicleId" />
                <NumberField labelText="Price Per Gallon" value={fuelTransaction.pricePerGallon} onChange={handleFuelTransactionChange} name="pricePerGallon" />
                <NumberField labelText="Gallons o' Gas" value={fuelTransaction.gallonsOfGas} onChange={handleFuelTransactionChange} name="gallonsOfGas" />
                <NumberField labelText="Fuel Points Used" value={fuelTransaction.fuelPointsRedeemed} onChange={handleFuelTransactionChange} name="fuelPointsRedeemed" />
                <DateField labelText="Date Of Transaction" value={fuelTransaction.fuelPointTransactionDate} onChange={handleFuelTransactionChange} name="fuelTransactionDate" />
                <SubmitFormButton buttonText='Submit Fuel Transaction' />
            </fieldset>
        </form>
    )

}

export default NewFuelTransactionPanel