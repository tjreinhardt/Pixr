import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { deleteCollection, getUserCollections } from '../../store/collections'
import { getImages } from "../../store/images";
import { Link } from "react-router-dom";
import ProfileButton from "../Navigation/ProfileButton";


function SelectedCollection() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  // const { imageId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
  const userId = useSelector(state => state.session.user?.id);
  // const image = useSelector(state => state.images[imageId])
  // const sessionUser = useSelector(state => state.session.user.id)
  // const collections = useSelector(state => image && state.collections[image.collectionId])
  const allImages = useSelector(state => { return Object.values(state.images) });
  const images = allImages.filter(image => image.collectionId === Number(id))
  console.log(images, '----------- images --------------')
  const collection = useSelector(state => state.collections[id]);


  useEffect(() => {
    dispatch(getUserCollections(userId))
  }, [userId, dispatch])

  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])


  if (!sessionUser) {
    return history.push('/signup')
  }
  // const auth = sessionUser.id === collections[imageId]?.userId;

  if (sessionUser) {
    <ProfileButton user={sessionUser} />
  }

  let content = null;
  if (sessionUser) {
    content = (
      <>
        <button>hiiii</button>
        {images?.map((image) => {
          return (
            <Link key={image?.id} to={`/images/${image?.id}`}>
              <img src={image?.imageUrl} alt=""></img>
            </Link>
          )
        })}
      </>
    )
  }
  // if (images.length) {
  //   return null;
  // }


  const onDelete = () => {
    dispatch(deleteCollection(collection))
    history.push('/collections')
  }

  return (
    <div className="target-collections-container-div">
      <button onClick={onDelete}>Delete This Collection</button>
      <div>
        {images?.map(image => {
          return (
            <Link key={image?.id} to={`/images/${image?.id}`}>
              <img src={image?.imageUrl} alt=""></img>
            </Link>
          )
        })}
        <h2>{id}</h2>
        {/* {content} */}
      </div>
    </div>
  )
}


export default SelectedCollection;
