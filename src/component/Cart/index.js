import CartContext from '../../context/CartContext'
import Header from '../Header'
import CartItem from '../CartItem'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onClickRemove = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            <button
              type="button"
              className="remove-all-button"
              onClick={onClickRemove}
            >
              Remove All
            </button>

            {cartList.length > 0 ? (
              <ul className="cart-list-item-container">
                {cartList.map(eachItem => (
                  <CartItem cartItem={eachItem} key={eachItem.dishId} />
                ))}
              </ul>
            ) : (
              <div className="empty-cart-image">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="Empty Cart"
                />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
