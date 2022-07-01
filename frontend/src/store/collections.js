import { csrfFetch } from "./csrf";

const ADD_COLLECTION = "collections/ADD_COLLECTION";
const GET_COLLECTIONS = "collections/GET_COLLECTIONS";
const UPDATE_COLLECTION = "collections/UPDATE_COLLECTION";
const REMOVE_COLLECTION = "collections/REMOVE_COLLECTIONS";

//actions
const add = (collection) => ({
  type: ADD_COLLECTION,
  collection
});

const load = (collections) => ({
  type: GET_COLLECTIONS,
  collections
});

const edit = (collection) => ({
  type: UPDATE_COLLECTION,
  collection
});

const remove = (collection) => ({
  type: REMOVE_COLLECTION,
  collection
});
// add
export const addCollection = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/collections`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  const collection = await response.json();
  dispatch(add(collection));
};

//get single collection
export const getCollection = (id) => async dispatch => {
  const response = await csrfFetch(`/api/collections/${id}`,);
  if (response.ok) {
    const collection = await response.json();
    dispatch(add(collection));
  }
};

//get all
export const getUserCollections = (id) => async dispatch => {
  const response = await csrfFetch(`/api/collections/users/${id}`,);
  if (response.ok) {
    const collections = await response.json();
    dispatch(load(collections));
  }
};
// edit
export const editCollection = (collection) => async dispatch => {
  const response = await csrfFetch(`/api/collections/${collection.id}`, {
    method: "PUT",
    body: JSON.stringify(collection)
  })
  if (response.ok) {
    const editedCollection = await response.json();
    dispatch(edit(collection));
    return editedCollection;
  }
};
//delete
export const deleteCollection = (collection) => async dispatch => {
  const response = await csrfFetch(`/api/collections/${collection.id}`, {
    method: "DELETE",
  })
  dispatch(remove(collection));
  return response;
};

const initialState = {}

const collectionsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_COLLECTIONS:
      newState = {};
      action.collections.forEach(collection => newState[collection.id] = collection)
      return newState;
    case ADD_COLLECTION:
      return { ...state, [action.collection.id]: action.collection };
    case UPDATE_COLLECTION:
      newState = Object.assign({}, state)
      newState[action.collection.id] = action.collection;
      return newState
    case REMOVE_COLLECTION:
      const currentState = { ...state }
      delete currentState[action.collection.id]
      return currentState;
    default:
      return state;
  }
}

export default collectionsReducer;