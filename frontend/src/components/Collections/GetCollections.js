import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom"
import { getUserCollections } from "../../store/collections"


function GetCollections() {

  const dispatch = useDispatch()
  const userId = useSelector((state) => state.session.user.id)
  const collections = useSelector((state) => {
    return Object.values(state.collections).filter((collection) => {
      return collection.userId === userId
    })
  })

  useEffect(() => {
    dispatch(getUserCollections(userId))
  }, [userId])
  return (
    <div>Get Collections
      <NavLink to="/newCollection">
        <button>Create Collection!</button>
      </NavLink>
      <div>
        {collections.map(collection => {
          return (
            <div key={collection.id}>
              <Link to={`/collections/${collection.id}`}>
                {collection.title}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default GetCollections;
