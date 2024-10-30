import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

const API = `http://localhost:3001/pizzas`

function App() {
  const [pizzas, setPizzas] = useState([])
  const [selectedPizza, setSelectedPizza] = useState(null)
  
  useEffect(()=>{
    fetch(API)
    .then(r=>r.json())
    .then(pizzaData=>setPizzas(pizzaData))
  }, [])

  function handleEditPizza(pizza){
    setSelectedPizza(pizza)
  }

  function handleUpdatePizzas(updatedPizza){
    const updatedPizzas = pizzas.map(pizza=>{
      if(pizza.id === updatedPizza.id){
        return updatedPizza
      } return pizza
    })
    setPizzas(updatedPizzas)
  }

  return (
    <>
      <Header />
      <PizzaForm selectedPizza={selectedPizza} onUpdatePizza={handleUpdatePizzas}/>
      <PizzaList pizzaData={pizzas} onEditPizza={handleEditPizza}/>
    </>
  );
}

export default App;
