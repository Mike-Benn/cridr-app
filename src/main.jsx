import React from 'react'
import "./css/global.css"
import ReactDOM from 'react-dom/client'
import RootPanel from './components/root/RootPanel.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.jsx'
import IncentivesDashboard from './components/incentives/IncentivesDashboard.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import App from "./App.jsx"
import OffersDashboard from './components/offers/OffersDashboard.jsx'
import SignInPage from "./components/sign-in/SignInPage.jsx"
import SignUpPage from './components/sign-up/SignUpPage.jsx'
import CreditCardManagerDashboard from "./components/user-profile/asset-manager/credit-cards/CreditCardManagerDashboard.jsx"
import UserProfileDashboard from './components/user-profile/UserProfileDashboard.jsx'
import AssetManagerDashboard from './components/user-profile/asset-manager/AssetManagerDashboard.jsx'
import ExpensesDashboard from './components/expenses/ExpensesDashboard.jsx'


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
          { path: "/offers", element: <OffersDashboard /> },
          { path: "/incentives", element: <IncentivesDashboard /> },
          { path: "/expenses", element: <ExpensesDashboard /> },
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
