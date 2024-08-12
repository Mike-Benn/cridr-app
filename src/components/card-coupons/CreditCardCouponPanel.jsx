import SelectField from "../general/form-fields/SelectField";
import { v4 as uuidv4 } from '../../../node_modules/uuid'
import { useState } from "react";
import glass from "../../images/magnifying.png"

function CreditCardCouponPanel() {


    const [tab , setTab] = useState("default");
    

    

    const couponOptions = [
        {
            id: uuidv4(),
            text: "All Coupons",
            value: "default",
        },

        {
            id: uuidv4(),
            text: "Restaurants",
            value: "restaurants",
        },

        {
            id: uuidv4(),
            text: "Hotels",
            value: "hotels",
        },

        {
            id: uuidv4(),
            text: "Shopping",
            value: "shopping",
        },

        {
            id: uuidv4(),
            text: "Miscellaneous",
            value: "misc",
        }
    ];

    const sortOptions = [
        {
            id: uuidv4(),
            text: "By Expiration",
            value: "expiration",
        },

        {
            id: uuidv4(),
            text: "A to Z",
            value: "alphabetical-ascen",
        },

        {
            id: uuidv4(),
            text: "Z to A",
            value: "alphabetical-descen"
        }
    ]

    return (
    <>
        <button type="button">Make new coupon!</button>
        <div>
            <button type="button"><img src={glass} alt="Search coupons" /></button>
            <SelectField values={couponOptions} />
            <SelectField values={sortOptions} />
        </div>
    </>
    )
}

export default CreditCardCouponPanel