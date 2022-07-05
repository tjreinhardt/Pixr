import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addCollection } from '../../store/collections'
import './CreateCollection.css'


function CollectionForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const userId = useSelector((state) => state.session.user.id)
  const updateTitle = (e) => setTitle(e.target.value)
  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      title,
      userId
    };

    dispatch(addCollection(payload))
    history.push('/collections')
  }

  useEffect(() => {
    let errors = [];
    if (!title) errors.push("Please enter a title")
    setValidationErrors(errors)
  }, [title])

  return (
    <div className='form-container'>
      <div>
        <form className="create-collection-form" onSubmit={handleSubmit}>
          <h4 className='create-collection-title'>Create Collection</h4>
          <ul>
            {validationErrors.map((error, idx) => (
              <div key={idx} className='error-message-div'>
                <li key={error}>{error}</li>
              </div>
            ))}
          </ul>
          <label> Title
            <input
              name="title"
              type="text"
              placeholder='Title'
              value={title}
              onChange={updateTitle}>
            </input>
          </label>
          <button className='nav-buttons' type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CollectionForm;
