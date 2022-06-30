// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from 'react-router-dom';


// function SelectedCollection() {
//   const dispatch = useDispatch()
//   const history = useHistory()

//   const { id } = useParams();

//   const userId = useSelector((state) => state.session.user.id)
//   const collection = useSelector(state => state.collections[id])

//   const userImages = Object.values(useSelector(state => state.images))
//   const images = userImages.filter(image => image.collectionId === Number(id))
//   const targetCollection = collection[id]

//   return (
//     <div>
//       <div>
//         <h2>{collection.title}</h2>
//         <div>
//           {images?.map(image => {
//             return (
//               <ul>
//                 <li key={image?.id} to={`/images/${image?.id}`}>
//                   <p>testingggggggggggggggggggggggg</p>
//                 </li>

//               </ul>
//             )
//           })}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SelectedCollection;


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { deleteCollection, getCollection } from '../../store/collections';


function SelectedCollection() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  const userId = useSelector((state) => state.session.user.id)
  const collection = useSelector(state => state.collections[id]);

  const allImages = Object.values(useSelector(state => state.imagess))

  const images = allImages.filter(image => image.collectionId === Number(id))

  const onDelete = () => {
    dispatch(deleteCollection(id))
    history.push('/collections')
  }

  useEffect(() => {
    dispatch(getCollection(id))
  })

  return (
    <div>
      <button onClick={onDelete}>Delete This Collection</button>
      <div className="imagestream-container">
        <h2>{collection?.title}</h2>
        <div className="img-container">
          {images?.map(image => {
            return (
              <Link key={image?.id} to={`/images/${image?.id}`}>
                <img className="imagestream-img" src={image?.picSrc}></img>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default SelectedCollection;
