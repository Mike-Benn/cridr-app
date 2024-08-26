
import { useNavigate } from "react-router-dom"
import "./css/styles.css"
function App() {
  
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/coupon');
  }
  
  return (
    <>
      <button type="button" onClick={handleNavigate}>Coupons</button>
    </>
  )
}

export default App
