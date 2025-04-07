import GeneralButton from "../../general/buttons/GeneralButton";
import { useState } from "react";
import CreditCardManagerDashboard from "./credit-cards/CreditCardManagerDashboard";
import VehicleManagerDashboard from "./vehicles/VehicleManagerDashboard";
import BusinessManagerDashboard from "./businesses/BusinessManagerDashboard";

function AssetManagerDashboard() {
    
    const [assetTabs, setAssetTabs] = useState({
        tabIndex: 0,
    });

    const handleAssetTabsChange = (e) => {
        const { name, value } = e.target;
        setAssetTabs((prev) => ({ ...prev, [name]: Number(value) }))
    }
    console.log(assetTabs.tabIndex);
    return (
        <div>
            <header>
                <GeneralButton buttonType="button" buttonText="Credit Cards" onClick={handleAssetTabsChange} value={0} name="tabIndex" />
                <GeneralButton buttonType="button" buttonText="Businesses" onClick={handleAssetTabsChange} value={1} name="tabIndex" />
                <GeneralButton buttonType="button" buttonText="Vehicles" onClick={handleAssetTabsChange} value={2} name="tabIndex" />
            </header>
            <section>
                {assetTabs.tabIndex === 0 && <CreditCardManagerDashboard />}
                {assetTabs.tabIndex === 1 && <BusinessManagerDashboard />}
                {assetTabs.tabIndex === 2 && <VehicleManagerDashboard />}
            </section>
        </div>
    )
    
}

export default AssetManagerDashboard