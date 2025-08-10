import React from 'react'
import "./css/global.css"
import ReactDOM from 'react-dom/client'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.jsx'
import IncentivesDashboard from './components/incentives/IncentivesDashboard.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import App from "./App.jsx"
import OffersDashboard from './components/offers/OffersDashboard.jsx'
import SignInPage from "./components/sign-in/SignInPage.jsx"
import SignUpPage from './components/sign-up/SignUpPage.jsx'
import ExpensesDashboard from './components/expenses/ExpensesDashboard.jsx'
import HomeDashboard from "./components/home/HomeDashboard.jsx"


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
          { path: "/", element: <HomeDashboard />},
          { path: "/offers", element: <OffersDashboard /> },
          { path: "/incentives", element: <IncentivesDashboard /> },
          { path: "/expenses", element: <ExpensesDashboard /> },
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
