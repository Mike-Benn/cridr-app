import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPanel from './components/root/RootPanel.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import ProfilePanel from './components/profile/ProfilePanel.jsx'
import MainLayout from './components/layouts/MainLayout.jsx'
import ProfilePersonalInfoPanel from './components/profile/ProfilePersonalInfoPanel.jsx'
import ManageCardsPanel from './components/profile/ManageCardsPanel.jsx'
import FuelTransactionDashboard from './components/fuel/components/FuelTransactionDashboard.jsx'
import CardPointsDashboard from './components/card-points/CardPointsDashboard.jsx'
import NewCardPointsTransaction from './components/card-points/NewCardPointsTransaction.jsx'
import RetailerSavingsDashboard from './components/retailer-savings/RetailerSavingsDashboard.jsx'
import NewRetailerSavingsTransaction from './components/retailer-savings/NewRetailerSavingsTransaction.jsx'
import IncentivesDashboard from './components/incentives/IncentivesDashboard.jsx'
import NewIncentiveTransaction from './components/incentives/NewIncentiveTransaction.jsx'
import SignInUpPanel from './components/sign-up/SignInUpPanel.jsx'
import NewCreditCardOffer from "./components/credit-card-offers/NewCreditCardOffer.jsx"
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import App from "./App.jsx"
import CollectiblesDashboard from './components/collectibles/CollectiblesDashboard.jsx'
import NewCollectibleCategory from './components/collectibles/NewCollectibleCategory.jsx'
import NewCollectibleSubcategory from './components/collectibles/NewCollectibleSubcategory.jsx'
import NewFuelTransaction from './components/fuel/components/NewFuelTransaction.jsx'
import NewVehicle from "./components/vehicles/NewVehicle.jsx"
import CreditCardOffersDashboard from './components/credit-card-offers/CreditCardOffersDashboard.jsx'

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/log-in",
        element: <SignInUpPanel />
      },
      {
        path: "/",
        element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
          { path: "/", element: <RootPanel />},
          { path: "/credit-card-offers", element: <CreditCardOffersDashboard /> },
          { path: "/credit-card-offers/new", element: <NewCreditCardOffer/> },
          { path: "/profile", element: <ProfilePanel /> },
          { path: "/profile/personal", element: <ProfilePersonalInfoPanel /> },
          { path: "/profile/my-cards", element: <ManageCardsPanel /> },
          { path: "/fuel-transaction", element: <FuelTransactionDashboard /> },
          { path: "/fuel-transaction/new", element: <NewFuelTransaction />},
          { path: "/fuel-transaction/new-vehicle", element: <NewVehicle />},
          { path: "/card-points", element: <CardPointsDashboard /> },
          { path: "/card-points/new", element: <NewCardPointsTransaction /> },
          { path: "/retailer-savings", element: <RetailerSavingsDashboard /> },
          { path: "/retailer-savings/new", element: <NewRetailerSavingsTransaction /> },
          { path: "/incentives", element: <IncentivesDashboard /> },
          { path: "/incentives/new", element: <NewIncentiveTransaction /> },
          { path: "/collectibles", element: <CollectiblesDashboard />},
          { path: "/collectibles/new-category", element: <NewCollectibleCategory /> },
          { path: "/collectibles/new-subcategory", element: <NewCollectibleSubcategory /> },
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
