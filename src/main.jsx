import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPanel from './components/root/RootPanel.jsx'
import CreditCardCouponPanel from './components/card-coupons/CreditCardCouponPanel.jsx'
import CalculatorPanel from './components/calculator/CalculatorPanel.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import AddCouponPanel from './components/card-coupons/AddCouponPanel.jsx'
import ProfilePanel from './components/profile/ProfilePanel.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPanel />
  },
  {
    path: "/coupon",
    element: <CreditCardCouponPanel />
  },
  {
    path: "/coupon/new",
    element: <AddCouponPanel />
  },
  {
    path: "/profile",
    element: <ProfilePanel />
  },
  {
    path: "/calculator",
    element: <CalculatorPanel />
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
