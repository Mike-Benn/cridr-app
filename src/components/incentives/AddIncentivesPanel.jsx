import { useState } from "react"
import TextField from "../general/form-fields/TextField"
import NumberField from "../general/form-fields/NumberField";
import DateField from "../general/form-fields/DateField";

function AddIncentivePanel() {

    const [businessName , setBusinessName] = useState("");
    const [incentiveName , setIncentiveName] = useState("");
    const [amount , setAmount] = useState("");
    const [transactionDate , setTransactionDate] = useState(null);

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
                <TextField fieldName="Business Name" onChange={handleBusinessNameChange} value={businessName} />
                <TextField fieldName="Incentive Name" onChange={handleIncentiveNameChange} value={incentiveName} />
                <NumberField fieldName="Amount" onChange={handleAmountChange} value={amount} />
                <DateField fieldName="Transaction Date" onChange={handleTransactionDateChange} value={transactionDate} />
            </fieldset>
        </form>
    )
}

export default AddIncentivePanel