export const GET_WORDS = 'GET_WORDS';
export const GET_WORDS_SUCCESS = 'GET_WORDS_SUCCESS';
export const GET_WORDS_FAIL = 'GET_WORDS_FAIL';
export const ADD_WORDS = 'ADD_WORDS';
export const ADD_WORDS_SUCCESS = 'ADD_WORDS_SUCCESS';
export const ADD_WORDS_FAIL = 'ADD_WORDS_FAIL';

const wordsReducer = (state, action) => {
  switch (action.type) {
    case GET_WORDS:
      return {
        loading: true
      };
    case GET_WORDS_SUCCESS:
      return {
        words: action.payload,
        loading: false,
        error: null
      };
    case GET_WORDS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ADD_WORDS:
      return {
        loading: true
      };
    case ADD_WORDS_SUCCESS:
      return {
        loading: false,
        error: null
      };
    case ADD_WORDS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default wordsReducer;