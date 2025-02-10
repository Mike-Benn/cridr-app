import { useState , useEffect} from "react"
import { DateField , NumberField , TextField, SelectField} from "../general/form-fields/InputFields"
import SubmitFormButton from "../general/buttons/SubmitFormButton"
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

function AddIncentivePanel() {
    const defaultBusinessOption = [<option key="default" value="default">Select Incentive Provider</option>];
    const navigate = useNavigate();
    const [incentiveTransaction , setIncentiveTransaction] = useState({
        businessId: "default",
        incentiveDescription: "",
        incentiveAmount: "",
        incentiveTransactionDate: "",
        businessOptions: [],
    })

    const handleIncentiveTransactionChange = (e) => {
        const { name , value} = e.target;
        setIncentiveTransaction((prev) => ({ ...prev , [name]: value }))
    }
    useEffect(() => {
        document.title = "Add Incentive | Cridr";
        const getBusinessesByIncentiveFeature = async () => {
            try {
                const response = await apiClient.get("/businesses/feature?feature_id=5");
                if (response.status === 200 && Array.isArray(response.data.data)) {
                    setIncentiveTransaction((prev) => ({ ...prev , businessOptions: response.data.data }));
                }
            } catch (error) {
                console.error(error , "Error fetching business names");
            }
        }
        

        getBusinessesByIncentiveFeature();

    }, [])

    const handleIncentiveSubmit = async (e) => {
        e.preventDefault();
        const newIncentive = {
            business_id: incentiveTransaction.businessId,
            incentive_description: incentiveTransaction.incentiveDescription,
            incentive_amount: incentiveTransaction.incentiveAmount,
            incentive_transaction_date: incentiveTransaction.incentiveTransactionDate,
        }

        try {
            const response = await apiClient.post("/incentive-transaction", newIncentive);
            if (response.status === 201) {
                navigate('/incentives');
            }
        } catch (error) {
            console.error("Error while adding incentive", error);
        }
    }

    return (
        <form action="" onSubmit={handleIncentiveSubmit}>
            <fieldset>
                <legend>Add Incentive Transaction</legend>
                <SelectField fieldId="incentive-select-business" labelText="Select Business Name" optionList={incentiveTransaction.businessOptions} onChange={handleIncentiveTransactionChange} value={incentiveTransaction.businessId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="businessId" defaultOptions={defaultBusinessOption} />
                <TextField labelText="Description" onChange={handleIncentiveTransactionChange} value={incentiveTransaction.incentiveDescription} name="incentiveDescription" />
                <NumberField labelText="Amount" onChange={handleIncentiveTransactionChange} value={incentiveTransaction.incentiveAmount} name="incentiveAmount" />
                <DateField labelText="Transaction Date" onChange={handleIncentiveTransactionChange} value={incentiveTransaction.incentiveTransactionDate} name="incentiveTransactionDate"/>
                <SubmitFormButton buttonText="Submit Incentive Transaction" />
            </fieldset>
        </form>
    )
}

export default AddIncentivePanel