import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import Input from "./Input";

export default function Form() {

  const [defaultState, setDefaultState] = useState({
    name: "",
    instruction: "",
    email: "",
    size: "..Select a Size..", //Just to show that we can choose a default size using React state from drop-down options. Note: Put the value (attribute of option) there, not the actual option. They can be different.
    pepperoni: "",  //Instructor put here false so it it stays unchecked. But looks like even with quotation it works. (confused).
    mushroom: "",
    olive: "",
    anchovi: ""
  })

  const [formState, setFormState] = useState(defaultState)
  // console.log(formState)
  const [errors, setErrors] = useState({...defaultState})
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(()=> {
    formSchema.validate(formState)
    .then(valid => setButtonDisabled(!valid));
  }, [formState])

  

  // formState schema

  let formSchema = yup.object().shape({
    name: yup.string().required("Please provide name"),
    instruction: yup.string().required(),
    email: yup
    .string()
    .required("Please provide an email")
    .email("This is not a valid email"),
    size: yup.string().required("Please select a size"),
    pepperoni: yup.boolean(),
    mushroom: yup.boolean(),
    olive: yup.boolean(),
    anchovi: yup.boolean()
  });


  // Validate whether value meets schema
  const  validateChange = e => {
    //reach allows us to check a specific value of the schema
    e.persist();
      yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => setErrors({
        ...errors,
        [e.target.name]: ""
      }))
      .catch(error => 
        setErrors({
          ...errors,
          [e.target.name]: error.errors[0]
        })
      )
  }

  const inputChange = e => {
    console.log("input changed!", e.target.name, e.target.checked)
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value //It's a Ternary Operator (conditional statement). It will determine whether to use value or checked. Then plug in the 'value' variable in the 'setFormState' replacing 'e.target.value'.
    setFormState({ 
      ... formState, 
      [e.target.name] : value})
    // 1. When somthings typed there, the DOM register that. It tells REACT about that event 
    // takes place. But React says I can't update anything cos' the state didn't change.
    // But the data (key-stroke) is registering there if we look in console. But we are not
    //  getting a UI update cos' React does not letting us. This is where we update 'setFormState'.
    // This is called controlled input.
    // 2. If you wrap a variable in brackets, you can replace the key with the name of the 
    // key with it
    validateChange(e);
  }

  const formSubmit = e => {
    e.preventDefault();
    // This will stop the page from re-loading which is a default behaviour of s submit form.
    setFormState(defaultState)
    // This will reset the form values after we submit it - changing the form to the above state.

    axios
      .post("https://reqres.in/api/users", formState)
      .then(() => console.log("form submitted success"))
      .catch(err => console.log(err));
  }



  return (

    <form onSubmit={formSubmit}>

      <div className="nameInput" >
      <Input 
       type="text"
       name="name"
       value= {formState.name}
       id="name"
       onChange= {inputChange}
       label={'Name'}
       errors={errors}
      />
      </div>

      <div className="sizeInput">
      <label htmlFor="size">
        Size
        <br />
        <select
          // value={formState.size}
          name="size"
          id="size" 
          onChange={inputChange}
          >
            <option value="select">..Select a Size..</option>
            <option value="regular">Regular</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">Extra Large</option>
          
       </select>
      </label>
      </div>

      <Input 
       type="text"
       name="instruction"
       value= {formState.instruction}
       id="instruction"
       placeholder="Special Instruction"
       onChange= {inputChange}
       label={'Instruction'}
       errors={errors}
       />

      <div className="top-check">
      <p>Choose your toppings:</p>

      <label htmlFor="pepperoni">
        Pepperonis
        <input 
        type="checkbox"
        name="pepperoni"
        id="pepperoni"
        // checked={formState.pepperoni} //Here 'checked' instead value. But comment this out cause' we already put a turnery operator in inputChange function.
        onChange={inputChange}
        />
      </label>
      <br />
      <label htmlFor="mushroom">
        Mushroom
        <input 
         type="checkbox"
         name="mushroom"
         id="mushroom"
        //  checked={formState.mushroom}
         onChange={inputChange}
        />
      </label>
      <br />

      <label htmlFor="olive">
        Olives
        <input 
        type="checkbox"
        name="olive"
        id="olive"
        // checked={formState.olive}
        onChange={inputChange}
        />
        </label>
        <br />

        <label htmlFor="Anchovi">
          Anchovi
          <input 
          type="checkbox"
          name="anchovi"
          id="anchovi"
          // checked={formState.anchovi}
          onChange={inputChange}
          />
        </label>
        </div>

      <div className="email-input">
      <Input 
       type="email"
       name="email"
       value= {formState.email}
       id="email"
       onChange= {inputChange}
       label={'Email'}
       errors={errors}
       />
      </div>

      
      <p>
      <button disabled={buttonDisabled} type="submit">Add to Order</button>
      </p>


    </form>
  )
}

