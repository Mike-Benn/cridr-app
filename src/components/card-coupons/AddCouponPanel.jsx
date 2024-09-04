import SelectField from '../general/form-fields/SelectField'
import TextField from '../general/form-fields/TextField'
import NumberField from '../general/form-fields/NumberField'
import DateField from "../general/form-fields/DateField"
import SubmitFormButton from "../general/buttons/SubmitFormButton"
import { useState } from 'react'
import axios from 'axios'

import { CARD_OPTIONS , COUPON_TYPES , CASHBACK_TYPE } from '../../utils/coupons/options'
import { useNavigate } from 'react-router-dom'

function AddCouponPanel() {

    const [card , setCard] = useState("default");
    const [couponType , setCouponType] = useState("default");
    const [cashbackType , setCashbackType] = useState("default");
    const [businessName , setBusinessName] = useState("");
    const [amount , setAmount] = useState("");
    const [cashback_limit , setLimit] = useState("");
    const [expirationDate , setExpirationDate] = useState("");

    const navigate = useNavigate();


    const handleCardChange = (e) => {
        setCard(e.target.value);
    }

    const handleCouponTypeChange = (e) => {
        setCouponType(e.target.value);
    }

    const handleCashbackTypeChange = (e) => {
        setCashbackType(e.target.value);
    }
    
    const handleBusinessNameChange = (e) => {
        setBusinessName(e.target.value);
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
    }

    const handleExpirationDateChange = (e) => {
        setExpirationDate(e.target.value);
    }

    
const handleSubmitForm = async (e) => {
    e.preventDefault();

    const newCoupon = {
        card,
        couponType,
        cashbackType,
        businessName,
        amount: Number(amount),
        cashback_limit: Number(cashback_limit),
        expirationDate,
    };
    console.log(newCoupon);
    try {
        const response = await axios.post('http://api.mike-benn.com/add/submit-coupon', newCoupon, {
            headers: {
                'Content-Type': 'application/json', 
            },
        });

        if (response.status === 200) {
            console.log('Coupon added successfully:', response.data);
            clearForm();
            navigate('/coupon');
        } else {
            console.error('Failed to add coupon:', response.statusText);
        }
    } catch (error) {
        console.error('Error while adding coupon:', error);
    }
};
    
    const clearForm = () => {
        setCard("default");
        setCouponType("default");
        setCashbackType("default");
        setBusinessName("");
        setAmount("");
        setLimit("");
        setExpirationDate("");
    }

    return (
        <form action='' onSubmit={handleSubmitForm}>
            <fieldset>
                <legend>Coupon Info</legend>
                <SelectField options={CARD_OPTIONS} onChange={handleCardChange} value={card} name="cardName"/>
                <SelectField options={COUPON_TYPES} onChange={handleCouponTypeChange} value={couponType} name="couponType"/>
                <SelectField options={CASHBACK_TYPE} onChange={handleCashbackTypeChange} value={cashbackType} name="cashbackType"/>
                <TextField fieldName="Establishment/Service Name" onChange={handleBusinessNameChange} value={businessName} name="businessName"/>
                <NumberField fieldName="Cashback Amount" placeHolder="% or raw amount, must be number" onChange={handleAmountChange} value={amount} name="amount"/>
                <NumberField fieldName="Cashback Limit" placeHolder="Must be number, 0 for no limit" onChange={handleLimitChange} value={cashback_limit} name="limit"/>
                <DateField fieldName="Expiration Date" onChange={handleExpirationDateChange} value={expirationDate} name="expirationDate"/>
                <SubmitFormButton buttonText='Submit Coupon'/>
            </fieldset>
        </form>
    )
}

export default AddCouponPanel