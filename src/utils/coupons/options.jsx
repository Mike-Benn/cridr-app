import { v4 as uuidv4 } from '../../../node_modules/uuid'
export { CARD_OPTIONS,
         COUPON_TYPES,
         CASHBACK_TYPE,
         COUPON_TYPES_FILTER,
         SORT_OPTIONS,
}

const CARD_OPTIONS = [
    {
        id: uuidv4(),
        text: "Select credit card",
        value: "default",
    },

    {
        id: uuidv4(),
        text: "Chase Freedom Unlimited",
        value: "cfu"
    },
    {
        id: uuidv4(),
        text: "Chase Freedom Flex",
        value: "cff"
    },
    {
        id: uuidv4(),
        text: "Chase Sapphire Preferred",
        value: "csp"
    }
];

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

const COUPON_TYPES_FILTER = [
    {
        id: uuidv4(),
        text: "All Coupons",
        value: "all",
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

const SORT_OPTIONS = [
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
];