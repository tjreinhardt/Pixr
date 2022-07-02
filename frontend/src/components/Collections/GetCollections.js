import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useHistory, useParams } from "react-router-dom"
import { getUserCollections, deleteCollection } from "../../store/collections"
import ProfileButton from '../Navigation/ProfileButton';


function GetCollections() {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user)
  const collections = useSelector(state => state.collections)
  const images = useSelector(state => state.images)
  const array = Object.values(collections || {})


  if (sessionUser) {
    <ProfileButton user={sessionUser} />
  }

  return (
    <div>
      <NavLink to={`/newCollection/${sessionUser.id}`}>Create Collection</NavLink>
      {array.map(collection =>
        <div>
          <Link to={`/collections/${collection.id}/images`}>
            {collection.title}
          </Link>
          <button onClick={() => dispatch(deleteCollection(collection))}>
            Delete
          </button>
        </div>)}
    </div>
  )

  // useEffect(() => {
  //   dispatch(getUserCollections(userId))
  // }, [userId, dispatch])

  // const onDelete = () => {
  //   dispatch(deleteCollection(id))
  //   history.push('/collections')
  // }

  // return (
  //   <div>Get Collections
  //     <NavLink to="/newCollection">
  //       <button>Create Collection!</button>
  //     </NavLink>
  //     <div>
  //       {collections.map(collection => {
  //         return (
  //           <div key={collection.id}>
  //             <Link to={`/collections/${collection.id}`}>
  //               {collection.title}
  //             </Link>
  //             <Link to={`/collections/${collection.id}`}>
  //               <button onClick={onDelete}>Delete</button>
  //             </Link>
  //           </div>
  //         )
  //       })}
  //     </div>
  //   </div>
  // );
}

export default GetCollections;
