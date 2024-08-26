import SelectField from "../general/form-fields/SelectField";
import { COUPON_TYPES_FILTER, SORT_OPTIONS } from "../../utils/coupons/options";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import glass from "../../images/magnifying.png"
import CouponList from "./CouponList";

function CreditCardCouponPanel() {

    const navigate = useNavigate();
    const [coupons , setCoupons] = useState([]);

    useEffect(() => {
        const savedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
        setCoupons(savedCoupons);
    }, []);

    const handleAddCoupon = () => {
        navigate('/coupon/add')
    }

    return (
    <section>
        <button type="button" onClick={handleAddCoupon}>Make new coupon!</button>
        <div className="coupon-header">
            <button type="button"><img src={glass} alt="Search coupons" /></button>
            <SelectField options={COUPON_TYPES_FILTER} />
            <SelectField options={SORT_OPTIONS} />
        </div>
        <div className="coupon-list">
            <CouponList couponList={coupons} />
        </div>
    </section>
    )
}

export default CreditCardCouponPanel