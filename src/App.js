import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import BookDetails from './components/BookDetails'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import BookShelves from './components/BookShelves'
import BookContext from './Context/bookContext'
import NotFound from './components/NotFound'

import './App.css'
// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  state = {
    activeRoute: 'home',
  }

  alterActiveRoute = activeRouteValue => {
    this.setState(
      {
        activeRoute: activeRouteValue,
      },
      this.setTheLocalStorage,
    )
  }

  setTheLocalStorage = () => {
    const {activeRoute} = this.state
    localStorage.setItem('activeLink', activeRoute)
  }

  render() {
    const {activeRoute} = this.state
    return (
      <BookContext.Provider
        value={{
          activeRoute,
          alterActiveRoute: this.alterActiveRoute,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </BookContext.Provider>
    )
  }
}

export default App
