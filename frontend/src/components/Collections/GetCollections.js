
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom"
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
  // const targetCollection = collections[collectionId]

  useEffect(() => {
    dispatch(getUserCollections)
  }, [])

  // if (sessionUser) {
  //   <ProfileButton user={sessionUser} />
  // }
  console.log('sessionUser.id', sessionUser.id)
  // console.log('collections', collections[0].userId)
  // console.log('collections.collection.id', collections.collection.id)
  // console.log('collections.collection')
  console.log('collections', collections)


  // const auth = sessionUser.id === collections[]?.userId;
  // console.log('auth', auth)
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
