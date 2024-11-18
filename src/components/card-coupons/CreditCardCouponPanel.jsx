import SelectField from "../general/form-fields/SelectField";
import { COUPON_TYPES_FILTER, SORT_OPTIONS } from "../../utils/coupons/options";

import { useNavigate } from "react-router-dom";
import glass from "../../images/magnifying.png"
import CouponList from "./CouponList";

import { useEffect} from "react";
import axios from "axios";


function CreditCardCouponPanel() {
    /*const [couponList, setCouponList] = useState([]);
    const couponListItems = couponList.map(item => 
        <CouponListItem key={uuidv4()} data={item} />
    )*/
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        document.title = "Coupons | Cridr";
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`${apiUrl}/coupon/all`)
                if (response.status === 200) {
                    console.log(response.data)
                } else {
                    console.error('Failed to fetch coupons:', response.statusText);
                }
            } catch (error) {
                console.error('Error while fetching coupons:', error);
            }
        };

        fetchCoupons();
    }, [apiUrl]);

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