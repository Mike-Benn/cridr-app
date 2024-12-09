
import { v4 as uuidv4 } from "../../../node_modules/uuid"


const MEASUREMENT_OPTIONS = [
    {
        id: uuidv4(),
        text: "Select measurement",
        value: "default",
    },
    {
        id: uuidv4(),
        text: "Fluid Ounces",
        value: "floz"
    },
    {
        id: uuidv4(),
        text: "Quarts",
        value: "quarts"
    },
    {
        id: uuidv4(),
        text: "Gallons",
        value: "gals"
    },
    {
        id: uuidv4(),
        text: "Liters",
        value: "liters"
    },
    {
        id: uuidv4(),
        text: "Ounces",
        value: "oz"
    },
    {
        id: uuidv4(),
        text: "Pounds",
        value: "lbs"
    },
    {
        id: uuidv4(),
        text: "Units",
        value: "units"
        
    }
    
];

export {
    MEASUREMENT_OPTIONS,
}