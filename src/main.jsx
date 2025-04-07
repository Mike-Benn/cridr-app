import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPanel from './components/root/RootPanel.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.jsx'
import FuelTransactionDashboard from './components/fuel/components/FuelTransactionDashboard.jsx'
import CardPointsDashboard from './components/card-points/CardPointsDashboard.jsx'
import NewCardPointsTransaction from './components/card-points/NewCardPointsTransaction.jsx'
import RetailerSavingsDashboard from './components/retailer-savings/RetailerSavingsDashboard.jsx'
import NewRetailerSavingsTransaction from './components/retailer-savings/NewRetailerSavingsTransaction.jsx'
import IncentivesDashboard from './components/incentives/IncentivesDashboard.jsx'
import NewIncentiveTransaction from './components/incentives/NewIncentiveTransaction.jsx'
import NewCreditCardOffer from "./components/credit-card-offers/NewCreditCardOffer.jsx"
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import App from "./App.jsx"
import CollectiblesDashboard from './components/collectibles/CollectiblesDashboard.jsx'
import NewCollectibleCategory from './components/collectibles/NewCollectibleCategory.jsx'
import NewCollectibleSubcategory from './components/collectibles/NewCollectibleSubcategory.jsx'
import NewFuelTransaction from './components/fuel/components/NewFuelTransaction.jsx'
import NewVehicleForm from "./components/user-profile/asset-manager/vehicles/NewVehicleForm.jsx"
import OffersDashboard from './components/credit-card-offers/OffersDashboard.jsx'
import AvailableOffersDashboard from './components/credit-card-offers/AvailableOffersDashboard.jsx'
import SignInPage from "./components/sign-in/SignInPage.jsx"
import SignUpPage from './components/sign-up/SignUpPage.jsx'
import CreditCardManagerDashboard from "./components/user-profile/asset-manager/credit-cards/CreditCardManagerDashboard.jsx"
import UserProfileDashboard from './components/user-profile/UserProfileDashboard.jsx'
import AssetManagerDashboard from './components/user-profile/asset-manager/AssetManagerDashboard.jsx'

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/log-in",
        element: <SignInPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
      },
      {
        path: "/",
        element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
          { path: "/", element: <RootPanel />},
          { path: "/credit-card-offers", element: <OffersDashboard /> },
          { path: "/credit-card-offers/available", element: <AvailableOffersDashboard />},
          { path: "/credit-card-offers/available/new", element: <NewCreditCardOffer/> },
          { path: "/fuel-transaction", element: <FuelTransactionDashboard /> },
          { path: "/fuel-transaction/new", element: <NewFuelTransaction />},
          { path: "/fuel-transaction/new-vehicle", element: <NewVehicleForm />},
          { path: "/card-points", element: <CardPointsDashboard /> },
          { path: "/card-points/new", element: <NewCardPointsTransaction /> },
          { path: "/retailer-savings", element: <RetailerSavingsDashboard /> },
          { path: "/retailer-savings/new", element: <NewRetailerSavingsTransaction /> },
          { path: "/incentives", element: <IncentivesDashboard /> },
          { path: "/incentives/new", element: <NewIncentiveTransaction /> },
          { path: "/collectibles", element: <CollectiblesDashboard />},
          { path: "/collectibles/new-category", element: <NewCollectibleCategory /> },
          { path: "/collectibles/new-subcategory", element: <NewCollectibleSubcategory /> },
          { path: "/profile", element: <UserProfileDashboard /> },
          { path: "/profile/manager", element: <AssetManagerDashboard /> },
          { path: "/profile/manager/credit-cards", element: <CreditCardManagerDashboard /> },
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <RouterProvider router={router} />
    
  </React.StrictMode>,
)
