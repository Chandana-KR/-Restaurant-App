import './index.css'

const DishItem = props => {
  const {dishItem, decrementCount, incrementCount, cartItems} = props
  const {
    dishName,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishCalories,
    dishImage,
    dishAvailability,
    addonCat,
    dishId,
  } = dishItem

  const avaiClass = dishAvailability ? 'availability' : 'not-available'
  const circleClass = dishAvailability ? 'circle' : 'red-circle'

  const itemQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const onClickMinus = () => {
    decrementCount(dishItem)
  }

  const onClickPlus = () => {
    incrementCount(dishItem)
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
            <button className="button" type="button" onClick={onClickMinus}>
              <p className="icons">-</p>
            </button>
            <p className="count">{itemQuantity()}</p>
            <button className="button" type="button" onClick={onClickPlus}>
              <p className="icons">+</p>
            </button>
          </div>
        ) : (
          <p className="not-available1">Not Available</p>
        )}
        {addonCat.length > 0 && (
          <p className="customization">Customizations Available</p>
        )}
      </div>
      <p className="calories">{dishCalories} calories</p>
      <img src={dishImage} alt={dishName} className="dish-image" />
    </li>
  )
}

export default DishItem
