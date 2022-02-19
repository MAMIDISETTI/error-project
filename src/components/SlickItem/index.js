import {Link} from 'react-router-dom'
import './index.css'

const SlickItem = props => {
  const {slickDataItem} = props
  const {authorName, coverPic, title, id} = slickDataItem
  return (
    <div className="slick-item-container">
      <Link to={`/books/${id}`} className="slickItem-link-class">
        <img src={coverPic} alt="title" className="slick-item-container-pic" />
        <h1 className="slick-item-container-title">{title}</h1>
        <p className="slick-item-container-author">{authorName}</p>
      </Link>
    </div>
  )
}
export default SlickItem
