import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const initialState = { sort: 0 };
export const ACTION = {
  REFETCH: 'REFETCH',
  UPDATE: 'UPDATE'
};
const reducer = (state = initialState, { type, payload }) => {
  const { REFETCH, UPDATE } = ACTION;
  switch (type) {
    case REFETCH:
      return { ...state, ...payload };
    case UPDATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export default createStore(reducer, applyMiddleware(thunk));
