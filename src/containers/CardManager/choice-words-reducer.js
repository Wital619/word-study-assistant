export const GET_WORD = 'GET_WORD';
export const GET_WORD_SUCCESS = 'GET_WORD_SUCCESS';
export const GET_WORD_FAIL = 'GET_WORD_FAIL';

const choiceWordsReducer = (state, action) => {
  switch (action.type) {
    case GET_WORD:
      return {
        loading: true
      };
    case GET_WORD_SUCCESS:
      return {
        wordToGuess: action.payload.wordToGuess,
        correctEngWord: action.payload.correctEngWord,
        choices: action.payload.choices,
        loading: false,
        error: null
      };
    case GET_WORD_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default choiceWordsReducer;
