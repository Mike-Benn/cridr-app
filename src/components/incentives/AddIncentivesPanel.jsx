import { useState , useEffect} from "react"
import TextField from "../general/form-fields/TextField"
import VariableSelectField from "../general/form-fields/VariableSelectField";
import NumberField from "../general/form-fields/NumberField";
import DateField from "../general/form-fields/DateField";
import SubmitFormButton from "../general/buttons/SubmitFormButton"
import axios from 'axios'
import { addDefaultOptionToSelect } from "../../utils/general/utils";

function AddIncentivePanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [businessId , setBusinessId] = useState(-1);
    const [incentiveName , setIncentiveName] = useState("");
    const [amount , setAmount] = useState("");
    const [transactionDate , setTransactionDate] = useState(null);
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

    const handleIncentiveNameChange = (e) => {
        setIncentiveName(e.target.value);
    }
    
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleTransactionDateChange = (e) => {
        setTransactionDate(e.target.value);
    }

    const handleIncentiveFormSubmit = (e) => {
        e.preventDefault();
        console.log(businessId);
    }

    return (
        <form action="" onSubmit={handleIncentiveFormSubmit}>
            <fieldset>
                <legend>Add Incentive Transaction</legend>
                <VariableSelectField fieldId="incentive-select-business" labelText="Select Business Name" optionList={businessOptions} onChange={handleBusinessIdChange} value={businessId} optionIdAccessor="business_id" optionTextAccessor="business_name" />
                <TextField fieldName="Incentive Description" onChange={handleIncentiveNameChange} value={incentiveName} />
                <NumberField fieldName="Amount" onChange={handleAmountChange} value={amount} />
                <DateField fieldName="Transaction Date" onChange={handleTransactionDateChange} value={transactionDate} />
                <SubmitFormButton buttonText="Submit Incentive Transaction" />
            </fieldset>
        </form>
    )
}

export default AddIncentivePanel