import SelectField from "../general/form-fields/SelectField";
import { COUPON_TYPES_FILTER, SORT_OPTIONS } from "../../utils/coupons/options";

import { useNavigate } from "react-router-dom";
import glass from "../../images/magnifying.png"
import CouponList from "./CouponList";
import { useEffect } from "react";

function CreditCardCouponPanel() {

    useEffect(() => {
        document.title = "Coupons | Cridr";
    }, []);
    const navigate = useNavigate();
    const handleAddCoupon = () => {
        navigate('/coupon/new')
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
            <CouponList couponList={[]} />
        </div>
    </section>
    )
}

export default CreditCardCouponPanel