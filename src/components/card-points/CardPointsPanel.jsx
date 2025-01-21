import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateCardPoints } from "../../utils/general/utils";



function CardPointsPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [cardPointData, setCardPointData] = useState([]);
    let pointTotal = calculateCardPoints(cardPointData);


    useEffect(() => {
        document.title = "Credit Card Points | Cridr";
        const fetchCardPoints = async () => {
            try {
                const response = await axios.get(`${apiUrl}/card-points/all`);
                if (response.status === 200 && response.data) {
                    setCardPointData(response.data.data);
                } 
            } catch (error) {
                console.error("Failed to get credit card points!", error);
            }
        }
    }, [apiUrl]);

    const navigate = useNavigate();

    const handleAddCardPoints = () => {
        navigate('new');
    }
    


    return (
        <section>
            <button type="button" onClick={handleAddCardPoints}>Add Credit Card Points!</button>
            <p>Chase Points: {pointTotal}</p>
        </section>
    )


}

export default CardPointsPanel