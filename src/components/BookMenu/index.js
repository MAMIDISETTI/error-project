import './index.css'

const BookMenu = props => {
  const {activeReadingList, changeSelectedValue, selectedValue} = props
  const extraActiveClass = activeReadingList ? 'extra-active-class' : ''
  const extraActiveClassSmall = activeReadingList
    ? 'extra-active-class-small'
    : ''
  const {value, label} = selectedValue
  const changeSelectedValueBookMenu = () => {
    changeSelectedValue(value)
  }
  return (
    <>
      <li className="bookmenu-li">
        <button
          className={`change-selected-value-button ${extraActiveClass} `}
          onClick={changeSelectedValueBookMenu}
          type="button"
        >
          {label}
        </button>
      </li>
      <li className="bookmenu-li-small">
        <button
          className={`change-selected-value-button-small ${extraActiveClassSmall} `}
          onClick={changeSelectedValueBookMenu}
          type="button"
        >
          {label}
        </button>
      </li>
    </>
  )
}
export default BookMenu
