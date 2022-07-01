import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useHistory, useParams } from "react-router-dom"
import { getUserCollections, deleteCollection } from "../../store/collections"


function GetCollections() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = useSelector((state) => state.session.user.id)
  const collections = useSelector((state) => {
    return Object.values(state.collections).filter((collection) => {
      return collection.userId === userId
    })
  })

  useEffect(() => {
    dispatch(getUserCollections(userId))
  }, [userId, dispatch])

  const onDelete = () => {
    dispatch(deleteCollection(id))
    history.push('/collections')
  }

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
              <Link to={`/collections/${collection.id}`}>
                <button onClick={onDelete}>Delete</button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default GetCollections;
