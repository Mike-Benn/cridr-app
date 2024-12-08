import { v4 as uuidv4 } from "../../../node_modules/uuid"


const CARD_OPTIONS = [
    {
        id: uuidv4(),
        text: "Select credit card",
        value: "default",
    },

    {
        id: uuidv4(),
        text: "Freedom Unlimited",
        value: "Freedom Unlimited"
    },
    {
        id: uuidv4(),
        text: "Freedom Flex",
        value: "Freedom Flex"
    },
    {
        id: uuidv4(),
        text: "Sapphire Preferred",
        value: "Sapphire Preferred"
    }
];

export {
    CARD_OPTIONS,
}