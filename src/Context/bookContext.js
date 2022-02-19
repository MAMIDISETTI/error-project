import React from 'react'

const BookContext = React.createContext({
  activeRoute: '',
  alterActiveRoute: () => {},
  hamburger: false,
  hamburgerDrop: () => {},
})
export default BookContext
