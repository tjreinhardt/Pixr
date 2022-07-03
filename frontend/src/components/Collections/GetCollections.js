
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from "react-router-dom"
import { deleteCollection, getCollection, getUserCollections } from "../../store/collections"
import { useParams } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';


function GetCollections() {
  // const { collectionId } = useParams();
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const collections = useSelector(state => state.collections)
  const array = Object.values(collections)
    .filter(collection => collection.userId === sessionUser.id)
  // const memoCollections = (React.useMemo(
  //   () => Object.values(collections)
  //     .filter(collection => collection.userId === sessionUser.id)
  //     .map((collection) => {
  //       return (
  //         <NavLink key={collection.id} to={`/collections/${collection.id}`}>
  //           <div>
  //             {collection.title}
  //           </div>
  //         </NavLink>
  //       )
  //     }),
  //   [collections]
  // ));
  // const targetCollection = collections[collectionId]
  console.log('collections', collections)
  useEffect(() => {
    dispatch(getUserCollections(sessionUser.id))
  }, [dispatch])

  // if (sessionUser) {
  //   <ProfileButton user={sessionUser} />
  // }
  // console.log('sessionUser.id', sessionUser.id)
  // console.log('collections', collections[0].userId)
  // console.log('collections.collection.id', collections.collection.id)
  // console.log('collections.collection')
  // console.log('collections', collections)


  // const auth = sessionUser.id === collections[]?.userId;
  // console.log('auth', auth)
  //   return (
  //     <main>
  //       <div className='collection-container'>
  //         <NavLink to={`/newCollection/${sessionUser.id}`}>Create Collection</NavLink>
  //         {memoCollections}
  //       </ div>
  //     </main>

  //   )
  // }


  // onClick={() => dispatch(getCollection(collection.id))}



  return (
    <div>
      <NavLink to={`/newCollection/${sessionUser.id}`}>Create Collection</NavLink>
      {array.map((collection) => {
        return (
          <div key={collection.id}>
            <Link onClick={() => dispatch(getCollection(collection.id))} to={`/collections/${collection.id}`}>
              {collection.title}
            </Link>
            <button onClick={() => dispatch(deleteCollection(collection))}>
              Delete
            </button>
          </div >)
      })
      }
    </div>

  )
}
export default GetCollections;
