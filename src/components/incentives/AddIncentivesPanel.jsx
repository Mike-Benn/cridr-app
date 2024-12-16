import { useState , useEffect} from "react"
import TextField from "../general/form-fields/TextField"
import SelectField from "../general/form-fields/SelectField";
import NumberField from "../general/form-fields/NumberField";
import DateField from "../general/form-fields/DateField";
import axios from 'axios'

function AddIncentivePanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [businessName , setBusinessName] = useState("");
    const [incentiveName , setIncentiveName] = useState("");
    const [amount , setAmount] = useState("");
    const [transactionDate , setTransactionDate] = useState(null);
    const [businessOptions , setBusinessOptions] = useState([]);

    console.log(businessOptions);

    useEffect(() => {
        document.title = "Add Incentive | Cridr";
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get(`${apiUrl}/utils/get-businesses/Incentives`);
                if (response.data) {
                    setBusinessOptions(response.data.data);
                }
            } catch (error) {
                console.error(error , "Error fetching business names");
            }
        }

        fetchBusinesses();

    }, [apiUrl])

    const handleBusinessNameChange = (e) => {
        setBusinessName(e.target.value);
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

    return (
        <form action="">
            <fieldset>
                <legend>Add Incentive Transaction</legend>
                
                <TextField fieldName="Incentive Name" onChange={handleIncentiveNameChange} value={incentiveName} />
                <NumberField fieldName="Amount" onChange={handleAmountChange} value={amount} />
                <DateField fieldName="Transaction Date" onChange={handleTransactionDateChange} value={transactionDate} />
            </fieldset>
        </form>
    )
}

export default AddIncentivePanel