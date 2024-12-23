import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function IncentivesPanel() {

    useEffect(() => {
        document.title = "Incentives | Cridr";
    }, []);

    const navigate = useNavigate();

    const handleAddIncentiveTransaction = () => {
        navigate("new")
    }

    return (
        <button type="button" onClick={handleAddIncentiveTransaction}>Add New Incentive!</button>
    )
}

export default IncentivesPanel