import React from "react";



const Input = (props) => {
   
    const errorMessage = props.errors[props.name];
    return (
        <div>
          <label htmlFor="name">
            {props.label}

            <input {...props}/>
          </label>
         {errorMessage.length !== 0 && <p className="error">{errorMessage}</p>}
         
        </div>
    )
}

export default Input;


