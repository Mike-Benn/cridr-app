export { payRates }

const KERMIT_BASE_RATE = 43.24;
const KERMIT_OVERTIME_RATE = 64.86;
const KERMIT_WEEKEND_DIFFERENTIAL = 5;
const KERMIT_NIGHTSHIFT_DIFFERENTIAL = 4.50;
const KERMIT_HOLIDAY_DIFFERENTIAL = 10;
const KERMIT_TAX_RATE = 0.65;

const MIKE_BASE_RATE = 0;
const MIKE_OVERTIME_RATE = 0;
const MIKE_WEEKEND_DIFFERENTIAL = 0;
const MIKE_NIGHTSHIFT_DIFFERENTIAL = 0;
const MIKE_TAX_RATE = 0;



const payRates = {

    kermit: {
        baseRate: KERMIT_BASE_RATE,
        overtimeRate: KERMIT_OVERTIME_RATE,
        weekendDifferential: KERMIT_WEEKEND_DIFFERENTIAL,
        nightShiftDifferential: KERMIT_NIGHTSHIFT_DIFFERENTIAL,
        holidayDifferential: KERMIT_HOLIDAY_DIFFERENTIAL,
        taxRate: KERMIT_TAX_RATE,
    },
    mike: {
        baseRate: MIKE_BASE_RATE,
        overtimeRate: MIKE_OVERTIME_RATE,
        weekendDifferential: MIKE_WEEKEND_DIFFERENTIAL,
        nightshiftDifferential: MIKE_NIGHTSHIFT_DIFFERENTIAL,
        taxRate: MIKE_TAX_RATE,
    }
}