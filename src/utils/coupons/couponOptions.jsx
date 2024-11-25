import { v4 as uuidv4 } from '../../../node_modules/uuid'

const COUPON_TYPES = [
    {
        id: uuidv4(),
        text: "Select coupon type",
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
        text: "Service",
        value: "service",
    },

    {
        id: uuidv4(),
        text: "Miscellaneous",
        value: "misc",
    }
];

const CASHBACK_TYPE = [
    {
        id: uuidv4(),
        text: "Select cashback type",
        value: "default"
    },

    {
        id: uuidv4(),
        text: "Percent cash back",
        value: "percent",
    },

    {
        id: uuidv4(),
        text: "Raw cash back",
        value: "cash",
    }
]



export { 
    COUPON_TYPES,
    CASHBACK_TYPE,
}