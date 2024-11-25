import { v4 as uuidv4 } from "../../../node_modules/uuid"


const CARD_OPTIONS = [
    {
        id: uuidv4(),
        text: "Select credit card",
        value: "default",
    },

    {
        id: uuidv4(),
        text: "Chase Freedom Unlimited",
        value: "Chase Freedom Unlimited"
    },
    {
        id: uuidv4(),
        text: "Chase Freedom Flex",
        value: "Chase Freedom Flex"
    },
    {
        id: uuidv4(),
        text: "Chase Sapphire Preferred",
        value: "Chase Sapphire Preferred"
    }
];

export {
    CARD_OPTIONS,
}