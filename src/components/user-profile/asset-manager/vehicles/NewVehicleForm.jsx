import SubmitFormButton from "../../../general/buttons/SubmitFormButton";
import { TextField } from "../../../general/form-fields/InputFields";
import { useState } from "react";
import apiClient from "../../../../api/apiClient";
import { useNavigate } from "react-router-dom";


function NewVehicleForm() {
    const navigate = useNavigate();
    const [newVehicle , setNewVehicle] = useState({
        vehicleMake: "",
        vehicleModel: "",
    })

    const handleNewVehicleChange = (e) => {
        const { name, value } = e.target; 
        setNewVehicle((prev) => ({...prev, [name]: value }));
    }

    const handleNewVehicleSubmit = async (e) => {
        e.preventDefault();
        const vehicle = {
            vehicle_make: newVehicle.vehicleMake,
            vehicle_model: newVehicle.vehicleModel,
        }
        try {
            const response = await apiClient.post("/vehicles", vehicle);
            if (response.status === 201) {
                navigate("..");
            }
        } catch (error) {
            console.log(error.response?.data?.message);
        }
        
    }

    return (
        <form action="" onSubmit={handleNewVehicleSubmit}>
            <fieldset>
                <legend>Add New Vehicle</legend>
                <TextField labelText="Vehicle Make" onChange={handleNewVehicleChange} value={newVehicle.vehicleMake} name="vehicleMake" />
                <TextField labelText="Vehicle Model" onChange={handleNewVehicleChange} value={newVehicle.vehicleModel} name="vehicleModel" />
                <SubmitFormButton buttonText="Add Vehicle" />
            </fieldset>
        </form>
    )
}

export default NewVehicleForm