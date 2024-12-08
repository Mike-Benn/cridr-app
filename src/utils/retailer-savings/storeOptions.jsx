
import { v4 as uuidv4 } from "../../../node_modules/uuid"


const RETAILER_OPTIONS = [
    {
        id: uuidv4(),
        text: "Select retailer",
        value: "default",
    },

    {
        id: uuidv4(),
        text: "Walmart",
        value: "Walmart"
    },
    {
        id: uuidv4(),
        text: "Kroger",
        value: "Kroger"
    },
    {
        id: uuidv4(),
        text: "Amazon",
        value: "Amazon"
    },
    {
        id: uuidv4(),
        text: "Sam's Club",
        value: "Sam's Club"
    },
    
];

export {
    RETAILER_OPTIONS,
}