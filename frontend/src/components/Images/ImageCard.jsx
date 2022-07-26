import './ImageCard.css'
const ImageCard = ({ imageURL = '', classname = 'browser-image' }) => {
  return (
    <div
      className={classname}
      style={{ boxSizing: "border-box", overflowX: "none", backgroundImage: `url('${imageURL}')`, backgroundSize: 'cover' }}
    ></div>
  )
}

export default ImageCard;
