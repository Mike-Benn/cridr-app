import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPanel from './components/root/RootPanel.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import ProfilePanel from './components/profile/ProfilePanel.jsx'
import MainLayout from './components/layouts/MainLayout.jsx'
import ProfilePersonalInfoPanel from './components/profile/ProfilePersonalInfoPanel.jsx'
import ManageCardsPanel from './components/profile/ManageCardsPanel.jsx'
import FuelTransactionDashboard from './components/fuel/components/FuelTransactionDashboard.jsx'
import CardPointsPanel from './components/card-points/CardPointsPanel.jsx'
import AddCardPointsPanel from './components/card-points/AddCardPointsPanel.jsx'
import RetailerSavingsPanel from './components/retailer-savings/RetailerSavingsPanel.jsx'
import AddRetailerSavingsPanel from './components/retailer-savings/AddRetailerSavingsPanel.jsx'
import IncentivesPanel from './components/incentives/IncentivesPanel.jsx'
import AddIncentivePanel from './components/incentives/AddIncentivePanel.jsx'
import SignInUpPanel from './components/sign-up/SignInUpPanel.jsx'
import AddCreditCardOfferPanel from "./components/credit-card-offers/AddCreditCardOfferPanel.jsx"
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import App from "./App.jsx"
import CollectiblesDashboard from './components/collectibles/CollectiblesDashboard.jsx'
import NewCollectibleCategory from './components/collectibles/NewCollectibleCategory.jsx'
import NewCollectibleSubcategory from './components/collectibles/NewCollectibleSubcategory.jsx'
import NewFuelTransactionPanel from './components/fuel/components/NewFuelTransactionPanel.jsx'
import NewVehiclePanel from "./components/vehicles/NewVehiclePanel.jsx"
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
          { path: "/credit-card-offers/new", element: <ProtectedRoute><AddCreditCardOfferPanel/></ProtectedRoute> },
          { path: "/profile", element: <ProtectedRoute><ProfilePanel /></ProtectedRoute> },
          { path: "/profile/personal", element: <ProtectedRoute><ProfilePersonalInfoPanel /></ProtectedRoute> },
          { path: "/profile/my-cards", element: <ProtectedRoute><ManageCardsPanel /></ProtectedRoute> },
          { path: "/fuel-transaction", element: <ProtectedRoute><FuelTransactionDashboard /></ProtectedRoute> },
          { path: "/fuel-transaction/new", element: <ProtectedRoute><NewFuelTransactionPanel /></ProtectedRoute>},
          { path: "/fuel-transaction/new-vehicle", element: <ProtectedRoute><NewVehiclePanel /></ProtectedRoute>},
          { path: "/card-points", element: <ProtectedRoute><CardPointsPanel /></ProtectedRoute> },
          { path: "/card-points/new", element: <ProtectedRoute><AddCardPointsPanel /></ProtectedRoute> },
          { path: "/retailer-savings", element: <ProtectedRoute><RetailerSavingsPanel /></ProtectedRoute> },
          { path: "/retailer-savings/new", element: <ProtectedRoute><AddRetailerSavingsPanel /></ProtectedRoute> },
          { path: "/incentives", element: <ProtectedRoute><IncentivesPanel /></ProtectedRoute> },
          { path: "/incentives/new", element: <ProtectedRoute><AddIncentivePanel /></ProtectedRoute> },
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
