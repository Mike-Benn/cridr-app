import { v4 as uuidv4 } from "../../../node_modules/uuid"


const CARD_PROVIDER_OPTIONS = [
    {
        id: uuidv4(),
        text: "Select card provider",
        value: "default",
    },

    {
        id: uuidv4(),
        text: "Chase",
        value: "Chase"
    },
    
];

export {
    CARD_PROVIDER_OPTIONS,
}