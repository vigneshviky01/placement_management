import React from "react";
import ReactDOM from "react-dom";
import Button from "./COMPONENTS/Button"

function Page(){
    return(
       <Button/>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Page/>)