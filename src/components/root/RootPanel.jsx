import { useEffect } from "react"
import { Link } from "react-router-dom"
import GeneralButton from "../general/buttons/GeneralButton"

function RootPanel() {
    useEffect(() => {
      document.title = "Home | Cridr";
    }, []);
    
    return (
      <>
        
      </>
    )
}

export default RootPanel
