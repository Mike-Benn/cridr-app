import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CreditCardCouponPanel from './components/card-coupons/CreditCardCouponPanel.jsx'

import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import AddCouponPanel from './components/card-coupons/AddCouponPanel.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/coupon",
    element: <CreditCardCouponPanel />
  },
  {
    path: "/coupon/add",
    element: <AddCouponPanel />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
