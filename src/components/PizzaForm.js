import React from "react"

const PizzaForm = (props) => {

  const notVegHandler = (vegBool) => {
    if (vegBool === null) {
      return null;
    } else {
      return !vegBool;
    }
  }

  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={props.changeHandler} name="topping" type="text" className="form-control" placeholder="Pizza Topping" value={
                props.formValues.topping
              }/>
        </div>
        <div className="col">
          <select onChange={props.changeHandler} name="size" value={props.formValues.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onChange={props.changeHandler} name="vegetarian" className="form-check-input" type="radio" value="Vegetarian" checked={props.formValues.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onChange={props.changeHandler} name="vegetarian" className="form-check-input" type="radio" value="Not Vegetarian" checked={notVegHandler(props.formValues.vegetarian)}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.submitHandler}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
