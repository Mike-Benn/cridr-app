import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateFuelPointSavings } from "../../utils/general/utils";
import axios from "axios";



function FuelPointsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [fuelPointTransactions, setFuelPointTransactions] = useState([]);
    let amountSaved = 0;
    amountSaved = calculateFuelPointSavings(fuelPointTransactions);
    
    useEffect(() => {
        document.title = "Fuel Points | Cridr";
        const fetchFuelPoints = async () => {
            try {
                const response = await axios.get(`${apiUrl}/fuel-points/all`);
                if (response.status === 200 && response.data) {
                    setFuelPointTransactions(response.data.data);
                } 
            } catch (error) {
                console.error("Failed to get fuel points", error);
            }
        }
        fetchFuelPoints();
    }, [apiUrl]);

    const navigate = useNavigate();

    const handleAddFuelPoints = () => {
        navigate('new');
    }
    
    return (
        <section>
            <button type="button" onClick={handleAddFuelPoints}>Add Fuel Points!</button>
            <p>Cridr has saved: ${amountSaved}</p>
        </section>
    )


}

export default FuelPointsPanel