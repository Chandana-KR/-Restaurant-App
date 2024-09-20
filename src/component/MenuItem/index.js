import './index.css'

const MenuItem = props => {
  const {menuItem, activeCategoryId, changeActiveMenu} = props
  const {menuCategory, menuCategoryId} = menuItem
  const activeClass = activeCategoryId === menuCategoryId ? 'active-class' : ''
  const onChangeActiveMenu = () => {
    changeActiveMenu(menuCategoryId)
  }
  return (
    <li className="menu-item" onClick={onChangeActiveMenu}>
      <button type="button" className="menu-button">
        <p className={`menu-name ${activeClass}`}>{menuCategory}</p>
      </button>
    </li>
  )
}

export default MenuItem
