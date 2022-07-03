import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { deleteCollection, getCollection } from '../../store/collections'
import { getImages } from "../../store/images";


function SelectedCollection() {
  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useHistory()
  // const images = userImages.filter(image => image.collectionId === Number(id))
  // const sessionUser = useSelector(state => state.session.user)
  // const userId = useSelector((state) => state.session.user.id)
  const collections = Object.values(useSelector(state => state.collections)).filter(
    (collection) => {
      return collection.id === Number(id)
    }
  )
  console.log('collections', collections)
  // const targetCollection = collection[collection.id]
  // console.log('targetCollection', targetCollection)
  const images = Object.values(useSelector(state => state.images)).filter(image => image.collectionId === Number(id))
  // const images = useSelector(state => { return Object.values(state.images) });
  console.log('images', images)


  // const images = Object.values(useSelector(state => state.images))
  const onDelete = () => {
    dispatch(deleteCollection(id))
    history.push('/collections')
  }

  useEffect(() => {
    dispatch(getCollection(Number(id)))
  }, [dispatch, id])

  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])


  // const auth = sessionUser.id === images[imageId]?.userId;
  // if (!targetCollection) {
  //   return null;
  // }
  return (
    <div>
      <button onClick={onDelete}>Delete this collection</button>
      <div>
        {images.map((image, idx) => {
          return (
            <div key={idx}>
              <img src={image.imageUrl} style={{ height: '200px', width: '200px' }} alt=''></img>
            </div>
          )
        })}
        <h2>{id}</h2>
      </div>
    </div>
  )
}

export default SelectedCollection;



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
// import { deleteCollection, getCollection } from '../../store/collections';
// // import * as sessionActions from "../../store/session"

// function SelectedCollection() {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const { id } = useParams();
//   const userId = useSelector((state) => state.session.user.id)
//   const sessionUser = useSelector(state => state.session.user)
//   const collection = useSelector(state => state.collections[id]);

//   const allImages = Object.values(useSelector(state => state.imagess))

//   const images = allImages.filter(image => image.collectionId === Number(id))


//   useEffect(() => {
//     async function fetchCollection() {
//       dispatch(getCollection(collection.Number.id))
//     }
//     fetchCollection();
//   }, [dispatch, collection.id, history, sessionUser])

//   if (!sessionUser) {
//     return history.push('/signup')
//   }

//   return (
//     <div>
//       <button onClick={onDelete}>Delete This Collection</button>
//       <div className="imagestream-container">
//         <h2>{collection?.title}</h2>
//         {/* <div className="img-container">
//           {images?.map(image => {
//             return (
//               <Link key={image?.id} to={`/images/${image?.id}`}>
//                 <img className="imagestream-img" src={image?.picSrc}></img>
//               </Link>
//             )
//           })}
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default SelectedCollection;
