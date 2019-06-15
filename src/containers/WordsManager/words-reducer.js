export const GET_WORDS = 'GET_WORDS';
export const GET_WORDS_SUCCESS = 'GET_WORDS_SUCCESS';
export const GET_WORDS_FAIL = 'GET_WORDS_FAIL';
export const PUSH_WORDS = 'PUSH_WORDS';
export const PUSH_WORDS_SUCCESS = 'PUSH_WORDS_SUCCESS';
export const PUSH_WORDS_FAIL = 'PUSH_WORDS_FAIL';

const initialState = {
  words: [],
  loading: false,
  error: null
};

export const wordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS:
      return {
        words: action.payload,
        loading: true
      };
    case GET_WORDS_SUCCESS:
      return {
        loading: false,
        error: null
      };
    case GET_WORDS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case PUSH_WORDS:
      return {
        loading: true
      };
    case PUSH_WORDS_SUCCESS:
      return {
        loading: false,
        error: null
      };
    case PUSH_WORDS_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
