import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const BooksItem = props => {
  const {everyBook} = props
  const {authorName, coverPic, title, readStatus, rating, id} = everyBook
  return (
    <li className="li-booksitem-container">
      <Link className="link-class-books-item" to={`/books/${id}`}>
        <img
          src={coverPic}
          alt={title}
          className="li-booksitem-container-pic"
        />
        <div className="li-booksitem-container-desc">
          <h1 className="li-booksitem-container-desc-title">{title}</h1>
          <p className="li-booksitem-container-desc-author">{authorName}</p>
          <div className="booksitem-container-rating">
            <p className="booksitem-container-rating-heading">Avg Rating</p>
            <BsFillStarFill className="booksitem-container-rating-icon-star" />
            <p className="booksitem-container-rating-heading-rating">
              {rating}
            </p>
          </div>
          <div className="li-status-container">
            <p className="li-status-container-status-heading">Status : </p>
            <p className="li-status-container-status">{readStatus}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}
export default BooksItem
