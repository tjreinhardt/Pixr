import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { deleteCollection } from '../../store/collections'


function SelectedCollection() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { id } = useParams();

  const userId = useSelector((state) => state.session.user.id)
  const collection = useSelector(state => state.collections[id])
  const targetCollection = collection[collection.id]

  const userImages = Object.values(useSelector(state => state.images))
  const images = userImages.filter(image => image.collectionId === Number(id))
  const onDelete = () => {
    dispatch(deleteCollection(id))
    history.push('/collections')
  }

  if (!targetCollection) {
    return null;
  }
  return (
    <div>
      <button onClick={onDelete}>Delete this collection</button>
      <div>
        <h2>{collection.title}</h2>
        <div>
          {images?.map(image => {
            <ul>
              <li key={image?.id} to={`/images/${image?.id}`}>
                <p>testingggggggggggggggggggggggg</p>
              </li>
            </ul>
          })}
        </div>
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
