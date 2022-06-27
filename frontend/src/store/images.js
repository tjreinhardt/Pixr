
import { csrfFetch } from "./csrf";

const LOAD = 'images/LOAD'
const ADD_ONE = 'images/ADD_ONE'
const REMOVE_ONE = 'images/REMOVE_ONE'
const UPDATE_ONE = 'images/UPDATE_ONE'

const load = list => ({
  type: LOAD,
  list
});

const addImage = image => ({
  type: ADD_ONE,
  image
});

const removeImage = imageId => ({
  type: REMOVE_ONE,
  imageId
});

const editImage = image => ({
  type: UPDATE_ONE,
  image
})

export const getImages = () => async dispatch => {
  const response = await csrfFetch(`/api/images`);

  if (response.ok) {
    const images = await response.json();
    dispatch(load(images));

  }
};

export const findImage = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}`)
  if (response.ok) {
    const image = await response.json();
    dispatch(addImage(image))
  }
}

export const createImage = (Image) => async dispatch => {
  const response = await csrfFetch(`/api/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Image),
  })
  if (response.ok) {
    const newImage = await response.json();
    const res = await dispatch(addImage(newImage))
    return res;
  }
  else {
    const errRes = await response.json();
    return errRes;
  }
}

export const modifyImage = (image) => async dispatch => {
  const response = await csrfFetch(`/api/images/${image.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  })
  if (response.ok) {
    const editedImage = await response.json();
    dispatch(addImage(editedImage))
    // might have to change the function called inside the dispatch above
    return editedImage;
  }
}


export const deleteImage = (image) => async dispatch => {
  const response = await csrfFetch(`/api/images/${image.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(image),
  })
  if (response.ok) {
    dispatch(removeImage(image.id))
    return true;
  }
}


const initialState = {};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const allImages = {};
      action.list.forEach(image => {
        allImages[image.id] = image;
      });
      return {
        ...allImages,
        ...state,
      };
    }
    case ADD_ONE: {
      if (!state[action.image.id]) {
        const newState = {
          ...state,
          [action.image.id]: action.image
        };
        return newState;
      }
      return {
        ...state,
        [action.image.id]: {
          ...action.image
        }
      };
    }
    case REMOVE_ONE: {
      const newState = { ...state };
      delete newState[action.imageId]
      return newState;
    }
    case UPDATE_ONE: {
      return {
        ...state,
        [action.image.id]: {
          ...state[action.image.id],
          ...action.image,
        }
      };
    }
    default: {
      return state;
    }
  }
}

export default imageReducer;
