import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {count} = props

  return (
    <>
      <div className="header-container">
        <h1 className="uni-heading">UNI Resto Cafe</h1>
        <div className="cart-container">
          <p className="my-orders">My Orders</p>
          <IoCartOutline className="cart" />
          <span className="cart-count">{count}</span>
        </div>
      </div>
      <hr className="line" />
    </>
  )
}

export default Header
