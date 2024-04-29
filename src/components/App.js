import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [editPizza, setEditPizza] = useState({
    id: "",
    topping: "",
    size: "small",
    vegetarian: ""
  })

  useEffect(()=>{
    fetch("http://localhost:3001/pizzas")
    .then(r=>r.json())
    .then(pizzaData=>setPizzas(pizzaData))
  }, [])

  function handleEditPizza(pizza){
    setEditPizza(pizza)
  }

  function handleSubmit(updatedPizza){
    const newPizzaList = pizzas.map(pizza=>{
      if(pizza.id === updatedPizza.id){
        return updatedPizza
      } else {
        return pizza
      }
    })
    setPizzas(newPizzaList)
  }

  return (
    <>
      <Header />
      <PizzaForm pizza={editPizza} onSubmit={handleSubmit}/>
      <PizzaList pizzas={pizzas} onEditPizza={handleEditPizza}/>
    </>
  );
}

export default App;
