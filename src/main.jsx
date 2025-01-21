import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPanel from './components/root/RootPanel.jsx'
import CreditCardCouponPanel from './components/credit-card-offers/CreditCardCouponPanel.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import ProfilePanel from './components/profile/ProfilePanel.jsx'
import MainLayout from './components/layouts/MainLayout.jsx'
import ProfilePersonalInfoPanel from './components/profile/ProfilePersonalInfoPanel.jsx'
import ManageCardsPanel from './components/profile/ManageCardsPanel.jsx'
import FuelPointsPanel from './components/fuel-points/FuelPointsPanel.jsx'
import AddFuelPointsPanel from './components/fuel-points/AddFuelPointsPanel.jsx'
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
          { path: "/credit-card-offers", element: <ProtectedRoute><CreditCardCouponPanel /></ProtectedRoute> },
          { path: "/credit-card-offers/new", element: <ProtectedRoute><AddCreditCardOfferPanel/></ProtectedRoute> },
          { path: "/profile", element: <ProtectedRoute><ProfilePanel /></ProtectedRoute> },
          { path: "/profile/personal", element: <ProtectedRoute><ProfilePersonalInfoPanel /></ProtectedRoute> },
          { path: "/profile/my-cards", element: <ProtectedRoute><ManageCardsPanel /></ProtectedRoute> },
          { path: "/fuel-points", element: <ProtectedRoute><FuelPointsPanel /></ProtectedRoute> },
          { path: "/fuel-points/new", element: <ProtectedRoute><AddFuelPointsPanel /></ProtectedRoute> },
          { path: "/card-points", element: <ProtectedRoute><CardPointsPanel /></ProtectedRoute> },
          { path: "/card-points/new", element: <ProtectedRoute><AddCardPointsPanel /></ProtectedRoute> },
          { path: "/retailer-savings", element: <ProtectedRoute><RetailerSavingsPanel /></ProtectedRoute> },
          { path: "/retailer-savings/new", element: <ProtectedRoute><AddRetailerSavingsPanel /></ProtectedRoute> },
          { path: "/incentives", element: <ProtectedRoute><IncentivesPanel /></ProtectedRoute> },
          { path: "/incentives/new", element: <ProtectedRoute><AddIncentivePanel /></ProtectedRoute> },
          { path: "/collectibles", element: <ProtectedRoute><CollectiblesDashboard /></ProtectedRoute>},
          { path: "/collectibles/new-category", element: <ProtectedRoute><NewCollectibleCategory /></ProtectedRoute> },
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
