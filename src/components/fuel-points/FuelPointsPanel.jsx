import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function FuelPointsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        document.title = "Fuel Points | Cridr";
    }, []);

    const navigate = useNavigate();

    const handleAddFuelPoints = () => {
        navigate('new');
    }

    return (
        <section>
            <button type="button" onClick={handleAddFuelPoints}>Add Fuel Points!</button>
        </section>
    )


}

export default FuelPointsPanel