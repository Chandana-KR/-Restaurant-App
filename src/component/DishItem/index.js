import {useState} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const DishItem = props => {
  const {dishItem} = props
  const {
    dishName,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishCalories,
    dishImage,
    dishAvailability,
    addonCat,
  } = dishItem

  const [quantity, setQuantity] = useState(0)

  const avaiClass = dishAvailability ? 'availability' : 'not-available'
  const circleClass = dishAvailability ? 'circle' : 'red-circle'

  const onClickMinus = () => {
    setQuantity(prev => (prev > 0 ? prev - 1 : 0))
  }

  const onClickPlus = () => {
    setQuantity(prev => prev + 1)
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickCart = () => {
          addCartItem({...dishItem, quantity})
        }
        return (
          <li className="dish-Item">
            <div className={avaiClass}>
              <div className={circleClass}>.</div>
            </div>
            <div className="dish-details-container">
              <h1 className="dish-name">{dishName}</h1>

              <p className="currency">
                {dishCurrency} {dishPrice}
              </p>

              <p className="description">{dishDescription}</p>

              {dishAvailability ? (
                <div className="button-container">
                  <button
                    className="button"
                    type="button"
                    onClick={onClickMinus}
                  >
                    <p className="icons">-</p>
                  </button>
                  <p className="count">{quantity}</p>
                  <button
                    className="button"
                    type="button"
                    onClick={onClickPlus}
                  >
                    <p className="icons">+</p>
                  </button>
                </div>
              ) : (
                <p className="not-available1">Not Available</p>
              )}
              {addonCat.length > 0 && (
                <p className="customization">Customizations Available</p>
              )}
              {dishAvailability && quantity > 0 && (
                <button
                  type="button"
                  className="cart-button"
                  onClick={onClickCart}
                >
                  ADD TO CART
                </button>
              )}
            </div>
            <p className="calories">{dishCalories} calories</p>
            <img src={dishImage} alt={dishName} className="dish-image" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
