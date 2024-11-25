import { v4 as uuidv4 } from "../../../node_modules/uuid"
import { useNavigate } from "react-router-dom";
import glass from "../../images/magnifying.png"
import CouponListItem from "./CouponListItem";
import { useEffect , useState } from "react";
import axios from "axios";


function CreditCardCouponPanel() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [couponList, setCouponList] = useState([]);
    const couponListItems = couponList.map(item => 
        <CouponListItem key={uuidv4()} data={item} />
    )
    
    useEffect(() => {
        document.title = "Coupons | Cridr";
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`${apiUrl}/coupon/all`);
                if (response.status === 200 && response.data) {
                    setCouponList(response.data.data);
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
        </div>
        <ul className="coupon-list">{couponListItems}</ul>
    </section>
    )
}

export default CreditCardCouponPanel