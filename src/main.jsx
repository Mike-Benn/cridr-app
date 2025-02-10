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
        element: <MainLayout />,
        children: [
          { path: "/", element: <ProtectedRoute><RootPanel /></ProtectedRoute>},
          { path: "/credit-card-offers", element: <ProtectedRoute><CreditCardOffersDashboard /></ProtectedRoute> },
          { path: "/credit-card-offers/new", element: <ProtectedRoute><NewCreditCardOffer/></ProtectedRoute> },
          { path: "/profile", element: <ProtectedRoute><ProfilePanel /></ProtectedRoute> },
          { path: "/profile/personal", element: <ProtectedRoute><ProfilePersonalInfoPanel /></ProtectedRoute> },
          { path: "/profile/my-cards", element: <ProtectedRoute><ManageCardsPanel /></ProtectedRoute> },
          { path: "/fuel-transaction", element: <ProtectedRoute><FuelTransactionDashboard /></ProtectedRoute> },
          { path: "/fuel-transaction/new", element: <ProtectedRoute><NewFuelTransaction /></ProtectedRoute>},
          { path: "/fuel-transaction/new-vehicle", element: <ProtectedRoute><NewVehicle /></ProtectedRoute>},
          { path: "/card-points", element: <ProtectedRoute><CardPointsDashboard /></ProtectedRoute> },
          { path: "/card-points/new", element: <ProtectedRoute><NewCardPointsTransaction /></ProtectedRoute> },
          { path: "/retailer-savings", element: <ProtectedRoute><RetailerSavingsDashboard /></ProtectedRoute> },
          { path: "/retailer-savings/new", element: <ProtectedRoute><NewRetailerSavingsTransaction /></ProtectedRoute> },
          { path: "/incentives", element: <ProtectedRoute><IncentivesDashboard /></ProtectedRoute> },
          { path: "/incentives/new", element: <ProtectedRoute><NewIncentiveTransaction /></ProtectedRoute> },
          { path: "/collectibles", element: <ProtectedRoute><CollectiblesDashboard /></ProtectedRoute>},
          { path: "/collectibles/new-category", element: <ProtectedRoute><NewCollectibleCategory /></ProtectedRoute> },
          { path: "/collectibles/new-subcategory", element: <ProtectedRoute><NewCollectibleSubcategory /></ProtectedRoute> },
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
