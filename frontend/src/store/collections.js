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

//thunk middleware
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

//get all collections based on userId
export const getUserCollections = (id) => async dispatch => {
  const response = await csrfFetch(`/api/collections/users/${id}`,);
  if (response.ok) {
    const collections = await response.json();
    dispatch(load(collections));
  }
};

export const editCollection = (id, payload) => async dispatch => {
  const response = await csrfFetch(`/api/collections/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  })
  const collection = await response.json();
  dispatch(edit(collection));
};

export const deleteCollection = (id) => async dispatch => {
  const response = await csrfFetch(`/api/collections/${id}`, {
    method: "DELETE",
  })
  const collection = await response.json();
  dispatch(remove(collection));
};

const initialState = {}

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTIONS:
      const newCollections = action.collections.reduce((map, collection) => {
        map[collection.id] = collection;
        return map
      }, {})
      return { ...state, ...newCollections }
    case ADD_COLLECTION:
      return { ...state, [action.collection.id]: action.collection };
    case REMOVE_COLLECTION:
      const currentState = { ...state }
      delete currentState[action.collection.id]
      return currentState;
    default:
      return state;
  }
}

export default collectionsReducer;
