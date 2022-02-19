import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    book: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getDetailsOfBook()
  }

  getDetailsOfBook = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        authorName: fetchedData.book_details.author_name,
        aboutAuthor: fetchedData.book_details.about_author,
        aboutBook: fetchedData.book_details.about_book,
        coverPic: fetchedData.book_details.cover_pic,
        id: fetchedData.book_details.id,
        title: fetchedData.book_details.title,
        readStatus: fetchedData.book_details.read_status,
        rating: fetchedData.book_details.rating,
      }
      this.setState({
        book: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBookDetailedView = () => {
    const {book} = this.state
    const {
      authorName,
      aboutAuthor,
      aboutBook,
      coverPic,
      title,
      readStatus,
      rating,
    } = book
    return (
      <>
        <div className="book-details-container">
          <div className="book-details-sub-container">
            <div className="book-details-preface-container">
              <div className="book-details-preface">
                <img
                  src={coverPic}
                  alt={title}
                  className="book-details-cover-pic"
                />
                <div className="book-details-preface-content">
                  <p className="book-details-preface-content-title">{title}</p>
                  <p className="book-details-preface-content-authorname">
                    {authorName}
                  </p>
                  <div className="booksitem-container-rating">
                    <p className="avg-rating-heading-detailed">Avg Rating</p>
                    <BsFillStarFill className="booksitem-container-rating-icon" />
                    <p className="booksitem-container-rating-mainrating">
                      {rating}
                    </p>
                  </div>
                  <div className="li-status-container">
                    <p className="detailed-status-heading">Status:</p>
                    <p className="detailed-real-status-heading">{readStatus}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="book-details-hr" />
            <div className="about-container">
              <h1 className="about-container-heading">About Author</h1>
              <p className="about-container-content">{aboutAuthor}</p>
              <h1 className="about-container-heading">About Book</h1>
              <p className="about-container-content">{aboutBook}</p>
            </div>
          </div>
          <Footer />
        </div>
        <div className="book-details-container-small">
          <div className="book-details-sub-container-small">
            <div className="book-details-preface-container">
              <div className="book-details-preface-small">
                <img
                  src={coverPic}
                  alt={title}
                  className="book-details-cover-pic-small"
                />
                <div className="book-details-preface-content-small">
                  <p className="book-details-preface-content-title-small">
                    {title}
                  </p>
                  <p className="book-details-preface-content-authorname-small">
                    {authorName}
                  </p>
                  <div className="booksitem-container-rating">
                    <p className="avg-rating-heading-detailed-small">
                      Avg Rating
                    </p>
                    <BsFillStarFill className="booksitem-container-rating-icon-small" />
                    <p className="booksitem-container-rating-mainrating-small">
                      {rating}
                    </p>
                  </div>
                  <div className="li-status-container">
                    <p className="detailed-status-heading-small">Status:</p>
                    <p className="detailed-real-status-heading-small">
                      {readStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="book-details-hr" />
            <div className="about-container">
              <h1 className="about-container-heading-small">About Author</h1>
              <p className="about-container-content-small">{aboutAuthor}</p>
              <h1 className="about-container-heading-small">About Book</h1>
              <p className="about-container-content-small">{aboutBook}</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  renderLoadingViewBooks = () => (
    <div className="loader-container loader-book-detailed" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFailureDetailedView = () => {
    const failureViewDetailedViewTryagain = () => {
      this.getDetailsOfBook()
    }
    return (
      <div className="failure-view-detailed-view">
        <img
          src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643963041/MiniProject/Group_7522Something_went_wrong_detailed_view_c2zkls.png"
          alt="failure view"
          className="failure-view-detailed-view-image"
        />
        <p className="failure-view-detailed-view-image-heading">
          Something went wrong, Please try again.
        </p>
        <button
          className="failure-view-detailed-view-image-button"
          type="button"
          onClick={failureViewDetailedViewTryagain}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderBook = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailedView()
      case apiStatusConstants.failure:
        return this.renderFailureDetailedView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingViewBooks()
      default:
        return null
    }
  }

  render() {
    localStorage.setItem('activeLink', '')
    return (
      <>
        <Navbar />
        {this.renderBook()}
      </>
    )
  }
}
export default BookDetails
