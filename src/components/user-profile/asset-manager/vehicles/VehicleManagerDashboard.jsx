import { useEffect, useState } from "react";
import NewVehicleForm from "./NewVehicleForm";
import GeneralButton from "../../../general/buttons/GeneralButton";
import apiClient from "../../../../api/apiClient";

function VehicleManagerDashboard() {

    const [vehicles, setVehicles] = useState([]);
    const [uiState, setUiState] = useState({
        isAddingVehicle: false,
        isLoading: true,
    })
    const toggleAddVehicle = () => {
        setUiState((prev) => ({ ...prev, isAddingVehicle: !prev.isAddingVehicle }))
    }

    console.log(vehicles)
    
    useEffect(() => {
        const getVehicles = async () => {
            try {
                const response = await apiClient.get("/vehicles");
                if (response.data?.data && Array.isArray(response.data.data)) {
                    setVehicles(response.data.data);
                    setUiState((prev) => ({ ...prev, isLoading: false} ))
                }
            } catch (error) {
                console.log(error.response?.data?.message);
            }
        }
        getVehicles();
    }, [])

    if (uiState.isLoading) return <p>Loading...</p>

    const vehicleList = <ul>{vehicles.map(vehicle => <li key={vehicle.vehicle_id}>{vehicle.vehicle_make} {vehicle.vehicle_model}</li>)}</ul>
    return (
        <>
            {!uiState.isAddingVehicle  && vehicleList}
            {uiState.isAddingVehicle && <NewVehicleForm />}
            {uiState.isAddingVehicle && <GeneralButton buttonType="button" buttonText="Cancel" onClick={toggleAddVehicle} />}
            {!uiState.isAddingVehicle && <GeneralButton buttonType="button" buttonText="Add New Vehicle" onClick={toggleAddVehicle} />}
        </>
    )
}

export default VehicleManagerDashboard