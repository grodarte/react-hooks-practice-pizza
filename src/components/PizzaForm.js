import React, { useEffect, useState } from "react";

const blankPizza = {
  topping: "",
  size: "Small",
  vegetarian: true,
}

function PizzaForm({ selectedPizza, onUpdatePizza }) {
  const [formData, setFormData] = useState(blankPizza)

  useEffect(()=>{
    if(selectedPizza){
      setFormData(selectedPizza)
    }
  }, [selectedPizza])
  
  function handleChange(e){
    let name = e.target.name
    let value = e.target.value

    if(name === "vegetarian"){
      setFormData({
        ...formData,
        vegetarian: !formData.vegetarian
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  function handleSubmit(e){
    e.preventDefault()
    fetch(`http://localhost:3001/pizzas/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(r=>r.json())
    .then(updatedPizza=>onUpdatePizza(updatedPizza))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            value={formData.topping}
            placeholder="Pizza Topping"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={formData.size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={formData.vegetarian}
              onChange={handleChange}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={!formData.vegetarian}
              onChange={handleChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
