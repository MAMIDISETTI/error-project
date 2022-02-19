import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import BookContext from '../../Context/bookContext'
import SlickItem from '../SlickItem'
import Navbar from '../Navbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    slickDataArray: [],
  }

  componentDidMount() {
    this.getSlickApi()
  }

  getSlickApi = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/top-rated-books`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(slickData => ({
        authorName: slickData.author_name,
        coverPic: slickData.cover_pic,
        id: slickData.id,
        title: slickData.title,
      }))
      this.setState({
        slickDataArray: [...updatedData],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingViewHome = () => (
    <div className="loader-container loader-home " testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  homeBoxSlickSlider = () => {
    const {slickDataArray} = this.state
    const settingsOne = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    const settingsTwo = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    }
    const settingsThree = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    }
    const settingsFour = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <>
        <div className="slider-container">
          <Slider {...settingsOne}>
            {slickDataArray.map(slickData => (
              <SlickItem slickDataItem={slickData} key={slickData.id} />
            ))}
          </Slider>
        </div>
        <div className="slider-container-mid">
          <Slider {...settingsTwo}>
            {slickDataArray.map(slickData => (
              <SlickItem slickDataItem={slickData} key={slickData.id} />
            ))}
          </Slider>
        </div>
        <div className="slider-container-small">
          <Slider {...settingsThree}>
            {slickDataArray.map(slickData => (
              <SlickItem slickDataItem={slickData} key={slickData.id} />
            ))}
          </Slider>
        </div>
        <div className="slider-container-small-mobile">
          <Slider {...settingsFour}>
            {slickDataArray.map(slickData => (
              <SlickItem slickDataItem={slickData} key={slickData.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  homeBoxSlick = () => (
    <BookContext.Consumer>
      {value => {
        const {alterActiveRoute} = value
        const moveToShelf = () => {
          const {history} = this.props
          alterActiveRoute('bookshelves')
          history.push('/shelf')
        }

        return (
          <>
            <div className="home-container-main">
              <h1 className="home-container-heading">
                Find Your Next Favorite Books?
              </h1>
              <p className="home-container-content">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <div className="home-slick-container">
                <div className="home-slick-top-container">
                  <h1 className="home-slick-top-container-heading">
                    Top Rated Books
                  </h1>
                  <button
                    onClick={moveToShelf}
                    className="home-slick-container-button"
                    type="button"
                  >
                    Find Books
                  </button>
                </div>
                {this.renderSlick()}
              </div>
              <Footer />
            </div>
            <div className="home-container-main-small">
              <h1 className="home-container-heading-small">
                Find Your Next Favorite Books?
              </h1>
              <p className="home-container-content-small">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <button
                onClick={moveToShelf}
                className="home-slick-container-button-small"
                type="button"
              >
                Find Books
              </button>
              <div className="home-slick-container-small">
                <div className="home-slick-top-container">
                  <h1 className="home-slick-top-container-heading-small">
                    Top Rated Books
                  </h1>
                </div>
                {this.renderSlick()}
              </div>
              <Footer />
            </div>
          </>
        )
      }}
    </BookContext.Consumer>
  )

  renderFailureViewSlick = () => {
    const failureViewSlick = () => {
      this.getSlickApi()
    }
    return (
      <div className="failure-view-slick-view">
        <img
          src="https://res.cloudinary.com/dq8h4f4kb/image/upload/v1643963041/MiniProject/Group_7522Something_went_wrong_detailed_view_c2zkls.png"
          alt="failure view"
          className="failure-view-slick-view-image"
        />
        <p className="failure-view-slick-view-heading">
          Something went wrong, Please try again.
        </p>
        <button
          className="failure-view-slick-view-button"
          type="button"
          onClick={failureViewSlick}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderSlick = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.homeBoxSlickSlider()
      case apiStatusConstants.failure:
        return this.renderFailureViewSlick()
      case apiStatusConstants.inProgress:
        return this.renderLoadingViewHome()
      default:
        return null
    }
  }

  render() {
    localStorage.setItem('activeLink', 'home')
    return (
      <>
        <Navbar />
        <div className="home-container">
          <div className="home-inside-container">{this.homeBoxSlick()}</div>
        </div>
      </>
    )
  }
}
export default Home
