import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Footer from '../Footer'
import BooksItem from '../BooksItem'
import Navbar from '../Navbar'
import BookMenu from '../BookMenu'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    currentReadingList: bookshelvesList[0].value,
    searchInput: '',
    nothingToShow: '',
    apiStatus: apiStatusConstants.initial,
    booksDataList: [],
  }

  componentDidMount() {
    this.getBooksapi()
  }

  getBooksapi = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {currentReadingList, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${currentReadingList}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(booksData => ({
        authorName: booksData.author_name,
        coverPic: booksData.cover_pic,
        id: booksData.id,
        title: booksData.title,
        readStatus: booksData.read_status,
        rating: booksData.rating,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        booksDataList: [...updatedData],
        nothingToShow: searchInput,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSelectedValue = changedValue => {
    this.setState(
      {
        currentReadingList: changedValue,
      },
      this.getBooksapi,
    )
  }

  BookShelvesMenu = () => {
    const {currentReadingList} = this.state

    return (
      <div className="bookshelves-menu-container">
        <h1 className="bookshelves-menu-containe-heading">Bookshelves</h1>
        <ul className="bookshelves-menu-ul">
          {bookshelvesList.map(selectedValue => (
            <BookMenu
              key={selectedValue.id}
              activeReadingList={currentReadingList === selectedValue.value}
              changeSelectedValue={this.changeSelectedValue}
              selectedValue={selectedValue}
            />
          ))}
        </ul>
      </div>
    )
  }

  BookShelvesMenuSmall = () => {
    const {currentReadingList} = this.state
    return (
      <div className="bookshelves-menu-container-small">
        <h1 className="bookshelves-menu-containe-heading">Bookshelves</h1>
        <ul className="bookshelves-menu-ul-small">
          {bookshelvesList.map(selectedValue => (
            <BookMenu
              key={selectedValue.id}
              activeReadingList={currentReadingList === selectedValue.value}
              changeSelectedValue={this.changeSelectedValue}
              selectedValue={selectedValue}
            />
          ))}
        </ul>
      </div>
    )
  }

  inputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingViewBookShelves = () => (
    <div className="loader-container loader-bookshelves " testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  notAnythingToShow = () => {
    const {nothingToShow} = this.state
    return (
      <>
        <div className="nothing-to-show-container">
          <img
            src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643955328/MiniProject/Groupnot_found_results_v8jur8.svg"
            alt="no books"
            className="nothing-too-show-pic"
          />
          <p className="nothing-to-show-container-content">
            Your search for {nothingToShow} did not find any matches.
          </p>
        </div>
        <div className="nothing-to-show-container-small">
          <img
            src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643955328/MiniProject/Groupnot_found_results_v8jur8.svg"
            alt="no books"
            className="nothing-too-show-pic-small"
          />
          <p className="nothing-to-show-container-content-small">
            Your search for {nothingToShow} did not find any matches.
          </p>
        </div>
      </>
    )
  }

  renderBookshelvesListView = () => {
    const {booksDataList} = this.state
    const booksDataListLength = booksDataList.length
    if (booksDataListLength !== 0) {
      return booksDataList.map(everyBook => (
        <BooksItem everyBook={everyBook} key={everyBook.id} />
      ))
    }

    return this.notAnythingToShow()
  }

  renderFailureViewBookshelves = () => {
    const failureViewAllBookshelves = () => {
      this.getBooksapi()
    }
    return (
      <div className="failure-view-all-books-view">
        <img
          src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643963041/MiniProject/Group_7522Something_went_wrong_detailed_view_c2zkls.png"
          alt="failure view"
          className="failure-view-all-books-view-image"
        />
        <p className="failure-view-all-books-view-image-heading">
          Something went wrong, Please try again.
        </p>
        <button
          className="failure-view-all-books-view-image-button"
          type="button"
          onClick={failureViewAllBookshelves}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderAllBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookshelvesListView()
      case apiStatusConstants.failure:
        return this.renderFailureViewBookshelves()
      case apiStatusConstants.inProgress:
        return this.renderLoadingViewBookShelves()
      default:
        return null
    }
  }

  clickingInput = () => {
    this.getBooksapi()
  }

  renderHomePage = () => {
    const {searchInput, currentReadingList} = this.state
    const filteredSuggestion = bookshelvesList.filter(
      everySuggestion => everySuggestion.value === currentReadingList,
    )[0].label

    return (
      <>
        <Navbar />
        <div className="bookshelves-parent-container">
          <div className="bookshelves-bg-container">
            {this.BookShelvesMenu()}
            <div className="bookshelves-main-container">
              <div className="bookshelves-main-container-search-contaiener">
                <p className="bookshelves-main-container-search-contaiener-heading">
                  {filteredSuggestion} Books
                </p>
                <div className="search-container">
                  <input
                    type="search"
                    className="search-container-real"
                    placeholder="Search"
                    onChange={this.inputChange}
                    value={searchInput}
                  />
                  <button
                    type="button"
                    className="search-button"
                    data-testid="searchButton"
                    onClick={this.clickingInput}
                    testid="searchButton"
                  >
                    <BsSearch />
                  </button>
                </div>
              </div>
              <ul className="render-all-books-ul">{this.renderAllBooks()}</ul>
            </div>
          </div>
          <Footer />
        </div>
        <div className="bookshelves-parent-container-small">
          <div className="bookshelves-bg-container-small">
            <div className="search-container-small">
              <input
                type="search"
                className="search-container-real"
                placeholder="Search"
                onChange={this.inputChange}
                value={searchInput}
              />
              <button
                type="button"
                className="search-button"
                data-testid="searchButton"
                onClick={this.clickingInput}
                testid="searchButton"
              >
                <BsSearch />
              </button>
            </div>
            {this.BookShelvesMenuSmall()}
            <div className="bookshelves-main-container-main">
              <ul className="render-all-books-ul">{this.renderAllBooks()}</ul>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  render() {
    localStorage.setItem('activeLink', 'bookshelves')
    return this.renderHomePage()
  }
}
export default BookShelves
