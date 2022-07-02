
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom"
import { deleteCollection } from "../../store/collections"
import ProfileButton from '../Navigation/ProfileButton';


function GetCollections() {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const collections = useSelector(state => state.collections)
  const array = Object.values(collections || {})


  // if (sessionUser) {
  //   <ProfileButton user={sessionUser} />
  // }

  return (
    <div>
      <NavLink to={`/newCollection/${sessionUser.id}`}>Create Collection</NavLink>
      {array.map((collection) => {
        return (
          <React.Fragment key={collection.id}>
            <Link to={`/collections/${collection.id}`}>
              {collection.title}
            </Link>
            <button onClick={() => dispatch(deleteCollection(collection))}>
              Delete
            </button>
          </React.Fragment>)
      }
      )
      }
    </div>
  )
}

export default GetCollections;
