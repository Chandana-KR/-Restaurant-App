import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MenuItem from '../MenuItem'
import DishItem from '../DishItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    menuCategory: [],
    activeCategoryId: null,
    activeCategoryDishes: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getDishDetails()
  }

  getDishDetails = async () => {
    this.setState({status: apiStatus.inProgress})

    const dishesApiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    const response = await fetch(dishesApiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data[0].table_menu_list
      const updatedMenuCategory = updatedData.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
        categoryDishes: each.category_dishes.map(dish => ({
          dishAvailability: dish.dish_Availability,
          dishType: dish.dish_Type,
          dishCalories: dish.dish_calories,
          dishCurrency: dish.dish_currency,
          dishDescription: dish.dish_description,
          dishId: dish.dish_id,
          dishImage: dish.dish_image,
          dishName: dish.dish_name,
          dishPrice: dish.dish_price,
          addonCat: dish.addonCat,
          nxtUrl: dish.nxtUrl,
        })),
      }))

      const activeCategory = updatedMenuCategory[0].categoryDishes

      this.setState({
        menuCategory: updatedMenuCategory,
        activeCategoryId: updatedMenuCategory[0].menuCategoryId,
        activeCategoryDishes: activeCategory,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  changeActiveMenu = activeId => {
    const {menuCategory} = this.state

    const activeCategory = menuCategory.find(
      each => each.menuCategoryId === activeId,
    )
    this.setState({
      activeCategoryId: activeId,
      activeCategoryDishes: activeCategory ? activeCategory.categoryDishes : [],
    })
  }

  renderLoader = () => (
    <div className="dishes-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderMenu = () => {
    const {menuCategory, activeCategoryId, count} = this.state
    return (
      <>
        <Header count={count} />
        <div className="resto-cafe-container">
          <ul className="menu-item-container">
            {menuCategory.map(eachMenu => (
              <MenuItem
                menuItem={eachMenu}
                key={eachMenu.menuCategoryId}
                activeCategoryId={activeCategoryId}
                changeActiveMenu={this.changeActiveMenu}
              />
            ))}
          </ul>
          <ul className="dishes-container">{this.renderDishes()}</ul>
        </div>
      </>
    )
  }

  renderDishes = () => {
    const {activeCategoryDishes} = this.state
    return (
      <>
        {activeCategoryDishes.map(each => (
          <DishItem dishItem={each} key={each.dishId} />
        ))}
      </>
    )
  }

  onClickRetry = () => {
    this.getDishDetails()
  }

  failure = () => (
    <button type="button" onClick={this.onClickRetry}>
      Retry
    </button>
  )

  renderBasedOnStatus = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.success:
        return this.renderMenu()
      case apiStatus.failure:
        return this.failure()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return this.renderBasedOnStatus()
  }
}

export default Home
