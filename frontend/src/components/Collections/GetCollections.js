
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from "react-router-dom"
import { deleteCollection, getUserCollections } from "../../store/collections"
import './GetCollections.css'

function GetCollections() {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const collections = useSelector(state => state.collections)
  const array = Object.values(collections)
    .filter(collection => collection.userId === sessionUser.id)
  console.log('collections', collections)
  useEffect(() => {
    dispatch(getUserCollections(sessionUser.id))
  }, [dispatch, sessionUser.id])


  return (
    <div className='collections-page-wrapper'>
      <div className='collections-container-div'>
        <h4 style={{ width: '250px', padding: '0px', marginTop: '0px', color: 'white', textAlign: 'center' }}>Here you can create collections to organize your uploads!</h4>
        <br />
        {array.map((collection) => {
          return (
            <div className="collection-links" key={collection.id}>
              <Link className="collection-button-links" to={`/collections/${collection.id}`}>
                {collection.title}
              </Link>
              <button className="delete-button" onClick={() => dispatch(deleteCollection(collection))}>
                Delete
              </button>
            </div >)
        })
        }
        <div className='create-collection-div-spacer'>
          <NavLink style={{ fontSize: '16px' }} className="nav-buttons" to={`/newCollection/${sessionUser.id}`}>Create Collection</NavLink>
        </div>
      </div>
    </div>

  )
}
export default GetCollections;
