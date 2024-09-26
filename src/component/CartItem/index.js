import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {cartItem} = props
  const {dishName, dishImage, quantity, dishId, dishCurrency} = cartItem
  const {dishPrice} = cartItem
  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value
        const onClickIncrement = () => {
          incrementCartItemQuantity(dishId)
        }

        const onClickDecrement = () => {
          decrementCartItemQuantity(dishId)
        }

        const onClickRemove = () => {
          removeCartItem(dishId)
        }
        return (
          <li className="cart-dish-item">
            <img src={dishImage} alt={dishName} className="cart-dish-image" />
            <h1 className="dish-name">{dishName}</h1>

            <p className="currency">
              {dishCurrency} {dishPrice}
            </p>

            <div className="cart-button-container">
              <button
                className="cart-button"
                type="button"
                onClick={onClickDecrement}
              >
                <p className="icons">-</p>
              </button>
              <p className="count">{quantity}</p>
              <button
                className="cart-button"
                type="button"
                onClick={onClickIncrement}
              >
                <p className="icons">+</p>
              </button>
            </div>

            <button
              type="button"
              className="remove-dish-button"
              onClick={onClickRemove}
            >
              Remove
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
