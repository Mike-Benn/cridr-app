import { useState , useEffect} from "react"
import { SelectField , DateField , NumberField , TextField } from "../general/form-fields/InputFields"
import SubmitFormButton from "../general/buttons/SubmitFormButton"
import { useNavigate } from "react-router-dom";
import { addDefaultOptionToSelect } from "../../utils/general/utils";
import apiClient from "../../api/apiClient";

function AddIncentivePanel() {
    const navigate = useNavigate();
    const [incentiveTransaction , setIncentiveTransaction] = useState({
        businessId: "-1",
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
        const getBusinessesByFeature = async () => {
            try {
                const response = await apiClient.get("/businesses/feature?feature_id=5");
                if (response.data) {
                    let businessOptionList = [...response.data.data];
                    addDefaultOptionToSelect(businessOptionList , "business_name" , "business_id" , "Select Incentive Provider")
                    setIncentiveTransaction((prev) => ({ ...prev , businessOptions: businessOptionList}));
                }
            } catch (error) {
                console.error(error , "Error fetching business names");
            }
        }
        

        getBusinessesByFeature();

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
            if (response.data.success) {
                resetIncentiveForm();
                navigate('/incentives');
            }
        } catch (error) {
            console.error("Error while adding incentive", error);
        }
    }

    const resetIncentiveForm = () => {
        setIncentiveTransaction({
            businessId: "-1",
            incentiveDescription: "",
            incentiveAmount: "",
            incentiveTransactionDate: "",
            businessOptions: [],
        })

    }

    return (
        <form action="" onSubmit={handleIncentiveSubmit}>
            <fieldset>
                <legend>Add Incentive Transaction</legend>
                <SelectField fieldId="incentive-select-business" labelText="Select Business Name" optionList={incentiveTransaction.businessOptions} onChange={handleIncentiveTransactionChange} value={incentiveTransaction.businessId} optionIdAccessor="business_id" optionTextAccessor="business_name" name="businessId" />
                <TextField labelText="Description" onChange={handleIncentiveTransactionChange} value={incentiveTransaction.incentiveDescription} name="incentiveDescription" />
                <NumberField labelText="Amount" onChange={handleIncentiveTransactionChange} value={incentiveTransaction.incentiveAmount} name="incentiveAmount" />
                <DateField labelText="Transaction Date" onChange={handleIncentiveTransactionChange} value={incentiveTransaction.incentiveTransactionDate} name="incentiveTransactionDate"/>
                <SubmitFormButton buttonText="Submit Incentive Transaction" />
            </fieldset>
        </form>
    )
}

export default AddIncentivePanel