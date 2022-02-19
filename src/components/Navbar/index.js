import './index.css'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {useState} from 'react'
import BookContext from '../../Context/bookContext'

const Navbar = props => {
  const [hamburgerdown, setHamburgerDown] = useState(false)

  const dropTheHamburgerIcon = () => {
    setHamburgerDown(!hamburgerdown)
  }
  return (
    <BookContext.Consumer>
      {value => {
        const {alterActiveRoute} = value
        const activeRouteNavbar = localStorage.getItem('activeLink')
        let HomeClass = ''
        let booksClass = ''
        if (activeRouteNavbar === 'home') {
          HomeClass = 'navbar-menu-section-content-blue'
        } else if (activeRouteNavbar === 'bookshelves') {
          booksClass = 'navbar-menu-section-content-blue'
        }

        const logoutFromHere = () => {
          const {history} = props

          Cookies.remove('jwt_token')
          history.replace('/login')
        }

        const changeToHome = () => {
          alterActiveRoute('home')
        }
        const changeToBooks = () => {
          alterActiveRoute('bookshelves')
        }
        const menuInSmall = () => (
          <ul className="navbar-menu-section-small">
            <li className="navbar-menu-section-content-margin">
              <Link
                onClick={changeToHome}
                className={`navbar-menu-section-content  ${HomeClass} link-class`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="navbar-menu-section-content-margin">
              <Link
                to="/shelf"
                onClick={changeToBooks}
                className={`navbar-menu-section-content  ${booksClass} link-class`}
              >
                Bookshelves
              </Link>
            </li>

            <button
              className="logout-button logout-button-small"
              type="button"
              onClick={logoutFromHere}
            >
              Logout
            </button>
          </ul>
        )

        return (
          <nav className="navbar-container">
            <div className="navbar-nav-container-large">
              <div className="navbar-bookhub-logo-container">
                <Link to="/" className="link-class logo-align">
                  <img
                    src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643955306/MiniProject/Group_7731book_hub_logo_dzbf3w.png"
                    alt="website logo"
                    className="login-page-bookhub-logo navbar-page-bookhub-logo"
                  />
                </Link>
              </div>
              <ul className="navbar-menu-section">
                <li>
                  <Link
                    to="/"
                    onClick={changeToHome}
                    className={`navbar-menu-section-content ${HomeClass} link-class`}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shelf"
                    onClick={changeToBooks}
                    className={`navbar-menu-section-content ${booksClass} link-class`}
                  >
                    Bookshelves
                  </Link>
                </li>

                <button
                  className="logout-button"
                  type="button"
                  onClick={logoutFromHere}
                >
                  Logout
                </button>
              </ul>
            </div>
            <div className="navbar-nav-container-small-main">
              <div className="navbar-nav-container-small">
                <div className="navbar-bookhub-logo-container-small">
                  <Link to="/" className="link-class logo-align">
                    <img
                      src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643955306/MiniProject/Group_7731book_hub_logo_dzbf3w.png"
                      alt="website logo"
                      className="login-page-bookhub-logo-small"
                    />
                  </Link>
                </div>
                <div>
                  <button
                    onClick={dropTheHamburgerIcon}
                    type="button"
                    className="button-hamburger-navbar"
                  >
                    <img
                      className="hamburger-icon-navbar"
                      src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643817045/MiniProject/iconhamburger_icon_navbar_ysaave.svg"
                      alt="hamburger"
                    />
                  </button>
                </div>
              </div>
              {hamburgerdown ? menuInSmall() : null}
            </div>
          </nav>
        )
      }}
    </BookContext.Consumer>
  )
}
export default withRouter(Navbar)
