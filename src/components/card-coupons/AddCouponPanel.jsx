import SelectField from '../general/form-fields/SelectField'
import TextField from '../general/form-fields/TextField'
import NumberField from '../general/form-fields/NumberField'
import DateField from "../general/form-fields/DateField"
import SubmitFormButton from "../general/buttons/SubmitFormButton"
import { v4 as uuidv4 } from "../../../node_modules/uuid"
import { useState } from 'react'

import { CARD_OPTIONS , COUPON_TYPES , CASHBACK_TYPE } from '../../utils/coupons/options'
import { useNavigate } from 'react-router-dom'

function AddCouponPanel() {

    const [card , setCard] = useState("default");
    const [couponType , setCouponType] = useState("default");
    const [cashbackType , setCashbackType] = useState("default");
    const [businessName , setBusinessName] = useState("");
    const [amount , setAmount] = useState("");
    const [limit , setLimit] = useState("");
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

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const coupons = JSON.parse(localStorage.getItem('coupons')) || [];
        const newCoupon = {
            id: uuidv4(),
            card,
            couponType,
            cashbackType,
            businessName,
            amount,
            limit,
            expirationDate,
        };
        coupons.push(newCoupon);
        localStorage.setItem('coupons' , JSON.stringify(coupons));
        clearForm();
        navigate('/coupon')


    }
    
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
                <SelectField options={CARD_OPTIONS} onChange={handleCardChange} value={card}/>
                <SelectField options={COUPON_TYPES} onChange={handleCouponTypeChange} value={couponType}/>
                <SelectField options={CASHBACK_TYPE} onChange={handleCashbackTypeChange} value={cashbackType}/>
                <TextField fieldName="Establishment/Service Name" onChange={handleBusinessNameChange} value={businessName}/>
                <NumberField fieldName="Cashback Amount" placeHolder="% or raw amount, must be number" onChange={handleAmountChange} value={amount}/>
                <NumberField fieldName="Cashback Limit" placeHolder="Must be number, 0 for no limit" onChange={handleLimitChange} value={limit}/>
                <DateField fieldName="Expiration Date" onChange={handleExpirationDateChange} value={expirationDate}/>
                <SubmitFormButton buttonText='Submit Coupon'/>
            </fieldset>
        </form>
    )
}

export default AddCouponPanel