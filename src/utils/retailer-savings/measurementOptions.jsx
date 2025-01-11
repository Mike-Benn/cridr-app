
import { v4 as uuidv4 } from "../../../node_modules/uuid"


const MEASUREMENT_OPTIONS = [
    
    {
        id: uuidv4(),
        text: "Select measurement",
        value: "-1"
    },
    {
        id: uuidv4(),
        text: "Fluid Ounces",
        value: "1",
    },
    {
        id: uuidv4(),
        text: "Quarts",
        value: "2",
    },
    {
        id: uuidv4(),
        text: "Gallons",
        value: "3",
    },
    {
        id: uuidv4(),
        text: "Liters",
        value: "4",
    },
    {
        id: uuidv4(),
        text: "Ounces",
        value: "5",
    },
    {
        id: uuidv4(),
        text: "Pounds",
        value: "6",
    },
    {
        id: uuidv4(),
        text: "Units",
        value: "7",
    }
    
];

export {
    MEASUREMENT_OPTIONS,
}