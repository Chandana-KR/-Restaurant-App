import {Link} from 'react-router-dom'
import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const count = cartList.length
      return (
        <>
          <div className="header-container">
            <Link to="/" className="link">
              <h1 className="uni-heading">UNI Resto Cafe</h1>
            </Link>
            <div className="header-cart-container">
              <p className="my-orders">My Orders</p>
              <Link to="/cart" className="link">
                <button
                  type="button"
                  className="header-cart-button"
                  data-testid="cart"
                >
                  <IoCartOutline className="cart" />
                </button>
              </Link>
              <p className="cart-count">{count}</p>
            </div>
          </div>
          <hr className="line" />
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Header
