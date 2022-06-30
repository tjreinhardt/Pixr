import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addImage } from '../../store/images'
import { addCollection } from '../../store/collections'


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
    <div>
      <h4>Create Collection</h4>
      <form onSubmit={handleSubmit}>
        <ul>
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <label> Title
          <input
            name="title"
            type="text"
            placeholder='title'
            value={title}
            onChange={updateTitle}>
          </input>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CollectionForm;
