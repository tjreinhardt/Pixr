const ImageCard = ({ imageURL = '', classname = 'browser-image' }) => {
  return (
    <div
      className={classname}
      style={{ backgroundImage: `url('${imageURL}')` }}
    ></div>
  )
}

export default ImageCard;
