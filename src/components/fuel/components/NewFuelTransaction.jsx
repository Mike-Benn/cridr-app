import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import apiClient from "../../../api/apiClient";
import { SelectField, NumberField, DateField } from "../../general/form-fields/InputFields";
import SubmitFormButton from "../../general/buttons/SubmitFormButton";
import AuthContext from "../../../auth/AuthContext";


function NewFuelTransaction() {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const [vehicleOptions , setVehicleOptions] = useState([]);
    const [fuelTransaction, setFuelTransaction] = useState({
        selectedVehicleId: "",
        pricePerGallon: "",
        gallonsOfGas: "",
        fuelPointsRedeemed: "",
        fuelTransactionDate: "",
    })
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        document.title = "Add Fuel Transaction | Cridr";
        const getVehiclesByUserId = async () => {
            try {
                const response = await apiClient.get("/vehicles");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    const vehicleList = [...response.data.data];
                    setVehicleOptions(vehicleList);
                    setFuelTransaction((prev) => ({ ...prev, selectedVehicleId: vehicleList[0].vehicle_id }))
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error.response?.data?.message);
                setIsLoading(false);
            }
        }
        getVehiclesByUserId();
    }, [navigate, setIsAuthenticated]);
    
    const handleFuelTransactionChange = (e) => {
        const { name, value } = e.target;
        setFuelTransaction((prev) => ({ ...prev, [name]: value }));
    };

    const handleFuelTransactionSubmit = async (e) => {
        e.preventDefault();
        const newFuelTransaction = {
            vehicle_id: fuelTransaction.selectedVehicleId,
            price_per_gallon: fuelTransaction.pricePerGallon,
            gallons_filled: fuelTransaction.gallonsOfGas,
            fuel_points_redeemed: fuelTransaction.fuelPointsRedeemed,
            transaction_fuel_date: fuelTransaction.fuelTransactionDate,
            
        }
        try {
            const response = await apiClient.post("/fuel-transaction", newFuelTransaction)
            if (response.status === 201) {
                navigate('/fuel-transaction');
            }
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }

    if (isLoading) return <div>Loading...</div>

    return (
        <form action='' onSubmit={handleFuelTransactionSubmit}>
            <fieldset>
                <legend>Add Fuel Transaction</legend>
                <SelectField fieldId="fuel-transaction-select-vehicle" labelText="Select Vehicle" optionList={vehicleOptions} onChange={handleFuelTransactionChange} value={fuelTransaction.selectedVehicleId} optionTextAccessor="vehicle_model" optionIdAccessor="vehicle_id" name="selectedVehicleId" />
                <NumberField labelText="Price Per Gallon" value={fuelTransaction.pricePerGallon} onChange={handleFuelTransactionChange} name="pricePerGallon" />
                <NumberField labelText="Gallons o' Gas" value={fuelTransaction.gallonsOfGas} onChange={handleFuelTransactionChange} name="gallonsOfGas" />
                <NumberField labelText="Fuel Points Used" value={fuelTransaction.fuelPointsRedeemed} onChange={handleFuelTransactionChange} name="fuelPointsRedeemed" />
                <DateField labelText="Date Of Transaction" value={fuelTransaction.fuelPointTransactionDate} onChange={handleFuelTransactionChange} name="fuelTransactionDate" />
                <SubmitFormButton buttonText='Submit Fuel Transaction' />
            </fieldset>
        </form>
    )

}

export default NewFuelTransaction