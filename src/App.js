import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './component/Home'
import LoginForm from './component/LoginForm'
import Cart from './component/Cart'
import ProtectedRoute from './component/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = dish => {
    this.setState(prevState => {
      const isExist = prevState.cartList.find(
        each => each.dishId === dish.dishId,
      )

      if (isExist) {
        return {
          cartList: prevState.cartList.map(cartItem => {
            if (cartItem.dishId === dish.dishId) {
              return {...cartItem, quantity: cartItem.quantity + 1}
            }
            return cartItem
          }),
        }
      }
      return {
        cartList: [...prevState.cartList, dish],
      }
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.dishId === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.dishId !== dishId),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item => {
          if (item.dishId === id) {
            return {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 0,
            }
          }
          return item
        })
        .filter(item => item.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
