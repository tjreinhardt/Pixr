const ImageCard = ({ imageURL = '', classname = 'browser-image' }) => {
  return (
    <div
      className={classname}
      style={{ backgroundImage: `url('${imageURL}')`, backgroundSize: 'cover' }}
    ></div>
  )
}

export default ImageCard;
