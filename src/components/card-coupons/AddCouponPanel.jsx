import NumberField from '../general/form-fields/NumberField'
import DateField from "../general/form-fields/DateField"
import SubmitFormButton from "../general/buttons/SubmitFormButton"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { addDefaultOptionToSelect } from '../../utils/general/utils'
import VariableSelectField from '../general/form-fields/VariableSelectField'

function AddCouponPanel() {

    const [userId , setUserId] = useState(1);
    const [cardId , setCardId] = useState("-1");
    const [cashbackTypeId , setCashbackTypeId] = useState("-1");
    const [cardOptions , setCardOptions] = useState([]);
    const [businessOptions , setBusinessOptions] = useState([]);
    const [cashbackTypeOptions , setCashbackTypeOptions] = useState([]);
    const [businessId , setBusinessId] = useState("-1");
    const [cashbackRate , setCashbackRate] = useState("");
    const [cashbackLimit , setCashbackLimit] = useState("");
    const [expirationDate , setExpirationDate] = useState("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        document.title = "Add Coupon | Cridr";
        const fetchCreditCards = async () => {
            try {
                const response = await axios.get(`${apiUrl}/utils/get-credit-cards-by-id/${userId}`) 
                if (response.data) {
                    let optionList = [...response.data.data];
                    addDefaultOptionToSelect(optionList , "credit_card_name" , "credit_card_id" , "Select Credit Card");
                    setCardOptions(optionList);
                }
            } catch (error) {
                console.error(error , "Failed to fetch cards.");
            }
        }
        const fetchBusinessesByFeature = async () => {
            try {
                const response = await axios.get(`${apiUrl}/businesses/feature/Coupons`);
                if (response.data) {
                    let optionList = [...response.data.data];
                    addDefaultOptionToSelect(optionList , "business_name" , "business_id" , "Select Business/Service Provider");
                    setBusinessOptions(optionList);
                }
            } catch (error) {
                console.error(error , "Failed to fetch businesses.")
            }
        }
        const fetchCashbackTypes = async () => {
        
            try {
                const response = await axios.get(`${apiUrl}/cashback/type/all`);
                
                if (response.data) {
                    let optionList = [...response.data.data];
                    addDefaultOptionToSelect(optionList , "coupon_cashback_type_desc" , "coupon_cashback_type_id" , "Select Cashback Type");
                    setCashbackTypeOptions(optionList);
                }
            } catch (error) {
                console.error(error , "Failed to fetch cashback types.");
            }
        }
        fetchCreditCards();
        fetchBusinessesByFeature();
        fetchCashbackTypes();

    }, [apiUrl , userId]);

    const handleCardIdChange = (e) => {
        setCardId(e.target.value);
    }

    const handleCashbackTypeIdChange = (e) => {
        setCashbackTypeId(e.target.value);
    }
    
    const handleBusinessIdChange = (e) => {
        setBusinessId(e.target.value);
    }

    const handleCashbackRateChange = (e) => {
        setCashbackRate(e.target.value);
    }

    const handleCashbackLimitChange = (e) => {
        setCashbackLimit(e.target.value);
    }

    const handleExpirationDateChange = (e) => {
        setExpirationDate(e.target.value);
    }
    const handleClearForm = () => {
        setCardId("-1");
        setCashbackTypeId("-1");
        setBusinessId("-1");
        setCashbackRate("");
        setCashbackLimit("");
        setExpirationDate("");
    }
    const handleCouponFormSubmit = async (e) => {
        e.preventDefault();

        const newCoupon = {
            user_id: userId,
            credit_card_id: cardId,
            business_id: businessId,
            coupon_cashback_type_id: cashbackTypeId,
            coupon_cashback_rate: cashbackRate,
            coupon_cashback_limit: cashbackLimit,
            coupon_expiration_date: expirationDate,
        };

        try {
            const response = await axios.post(`${apiUrl}/coupon/submit-coupon` , newCoupon);
            if (response.status === 200) {
                handleClearForm();
                navigate("/coupon");
            }

        } catch (error) {
            console.error(error , "Failed to post coupon.")
        }
    }
    
    return (
        <form action='' onSubmit={handleCouponFormSubmit}>
            <fieldset>
                <legend>Coupon Info</legend>
                <VariableSelectField fieldId="card-coupons-card-select" labelText="Select Credit Card" optionList={cardOptions} onChange={handleCardIdChange} value={cardId} optionIdAccessor="credit_card_id" optionTextAccessor="credit_card_name" />
                <VariableSelectField fieldId="card-coupons-cashback-select" labelText="Select Cashback Type"  optionList={cashbackTypeOptions} onChange={handleCashbackTypeIdChange} value={cashbackTypeId} optionIdAccessor="coupon_cashback_type_id" optionTextAccessor="coupon_cashback_type_desc" />
                <VariableSelectField fieldId="card-coupons-business-select" labelText="Business/Service Provider" optionList={businessOptions} onChange={handleBusinessIdChange} value={businessId} optionIdAccessor="business_id" optionTextAccessor="business_name" />
                <NumberField fieldName="Cashback Rate" placeHolder="% or raw amount, must be number" onChange={handleCashbackRateChange} value={cashbackRate} />
                <NumberField fieldName="Cashback Limit" placeHolder="Must be number, 0 for no limit" onChange={handleCashbackLimitChange} value={cashbackLimit} />
                <DateField fieldName="Expiration Date" onChange={handleExpirationDateChange} value={expirationDate} />
                <SubmitFormButton buttonText='Submit Coupon'/>
            </fieldset>
        </form>
    )
}

export default AddCouponPanel