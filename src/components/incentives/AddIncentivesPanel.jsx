import { useState , useEffect} from "react"
import TextField from "../general/form-fields/TextField"
import VariableSelectField from "../general/form-fields/VariableSelectField";
import NumberField from "../general/form-fields/NumberField";
import DateField from "../general/form-fields/DateField";
import SubmitFormButton from "../general/buttons/SubmitFormButton"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { addDefaultOptionToSelect } from "../../utils/general/utils";



function AddIncentivePanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [businessId , setBusinessId] = useState(-1);
    const [incentiveDescription , setIncentiveDescription] = useState("");
    const [incentiveAmount , setIncentiveAmount] = useState("");
    const [transactionDate , setTransactionDate] = useState("");
    const [businessOptions , setBusinessOptions] = useState([]);

    useEffect(() => {
        document.title = "Add Incentive | Cridr";
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get(`${apiUrl}/utils/get-businesses/Incentives`);
                if (response.data) {
                    let businessOptionList = response.data.data;
                    addDefaultOptionToSelect(businessOptionList , "business_name" , "business_id" , "Select Incentive Provider")
                    setBusinessOptions(businessOptionList);
                }
            } catch (error) {
                console.error(error , "Error fetching business names");
            }
        }

        fetchBusinesses();

    }, [apiUrl])

    const handleBusinessIdChange = (e) => {
        setBusinessId(e.target.value);
    }

    const handleIncentiveDescriptionChange = (e) => {
        setIncentiveDescription(e.target.value);
    }
    
    const handleIncentiveAmountChange = (e) => {
        setIncentiveAmount(e.target.value);
    }

    const handleTransactionDateChange = (e) => {
        setTransactionDate(e.target.value);
    }

    const handleIncentiveFormSubmit = async (e) => {
        e.preventDefault();
        const newIncentive = {
            business_id: businessId,
            incentive_description: incentiveDescription,
            incentive_amount: Number(incentiveAmount),
            incentive_transaction_date: transactionDate,
        }

        try {
            const response = await axios.post(`${apiUrl}/incentives/submit-incentive`, newIncentive);
            if (response.status === 200) {
                clearIncentiveForm();
                navigate('/incentives');
            }
        } catch (error) {
            console.error("Error while adding incentive", error);
        }
    }

    const clearIncentiveForm = () => {
        setBusinessId(-1);
        setIncentiveDescription("");
        setIncentiveAmount("");

    }

    return (
        <form action="" onSubmit={handleIncentiveFormSubmit}>
            <fieldset>
                <legend>Add Incentive Transaction</legend>
                <VariableSelectField fieldId="incentive-select-business" labelText="Select Business Name" optionList={businessOptions} onChange={handleBusinessIdChange} value={businessId} optionIdAccessor="business_id" optionTextAccessor="business_name" />
                <TextField fieldName="Incentive Description" onChange={handleIncentiveDescriptionChange} value={incentiveDescription} />
                <NumberField fieldName="Amount" onChange={handleIncentiveAmountChange} value={incentiveAmount} />
                <DateField fieldName="Transaction Date" onChange={handleTransactionDateChange} value={transactionDate} />
                <SubmitFormButton buttonText="Submit Incentive Transaction" />
            </fieldset>
        </form>
    )
}

export default AddIncentivePanel