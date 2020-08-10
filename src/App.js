import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const URL = 'http://localhost:4000/pizzas/'

class App extends Component {
  state = {
    pizzas: [],
    formValues: {
      id: null,
      topping: '',
      size: '',
      vegetarian: null
    }
  }
  
  fetchPizzas = () => {
    fetch(URL)
    .then(resp => resp.json())
    .then(data => this.setState({pizzas: data}))
  }
  
  patchPizza = (pizza) => {
    fetch(URL + pizza.id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(pizza)
    })
    .then(resp => resp.json())
    .then(data => {
      this.clearForm();
      this.fetchPizzas();
    })
  }

  changeHandler = (e) => {
    let formObj = this.state.formValues
    let value = e.target.value

    if (e.target.value === "Vegetarian") {value = true}
    else if (e.target.value === "Not Vegetarian") {value = false}

    formObj[e.target.name] = value
    this.setState({formValues: formObj})
  }

  populateForm = (pizza) => {
    this.setState({formValues: {
      id: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    }})
  }

  clearForm = () => {
    this.setState({formValues: {
      id: null,
      topping: '',
      size: '',
      vegetarian: null 
    }})
  }

  submitHandler = () => {
    let newPizza = this.state.formValues
    if (newPizza.id) {
      this.patchPizza(newPizza)
    } else {
      window.alert('You have to select a pizza using an edit button below!')
    }
  }

  componentDidMount() {
    this.fetchPizzas();
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm formValues={this.state.formValues} changeHandler={this.changeHandler} submitHandler={this.submitHandler}/>
        <PizzaList pizzas={this.state.pizzas} populateForm={this.populateForm}/>
      </Fragment>
    );
  }
}

export default App;
