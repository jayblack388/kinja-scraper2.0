import axios from 'axios';
export const INITIALIZE = 'INITIALIZE';
export const INITIALIZE_HEADLINES = 'INITIALIZE_HEADLINES';
export const GET_HEADLINES_REQUEST = 'GET_HEADLINES_REQUEST';
export const GET_HEADLINES_SUCCESS = 'GET_HEADLINES_SUCCESS';
export const GET_HEADLINES_FAILURE = 'GET_HEADLINES_FAILURE';

export const headlinesInitialState = {
  isLoading: false,
  err: null,
  headlines: []
};

const headlinesReducer = (state = headlinesInitialState, action) => {
  switch (action.type) {
    case INITIALIZE:
    case INITIALIZE_HEADLINES:
      return headlinesInitialState;
    case GET_HEADLINES_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_HEADLINES_SUCCESS:
      return {
        ...state,
        headlines: action.headlines,
        isLoading: false
      };
    case GET_HEADLINES_FAILURE:
      return {
        ...state,
        err: action.err,
        isLoading: false
      };
    default:
      return state;
  }
};

const headlinesRequest = () => ({
  type: GET_HEADLINES_REQUEST
});

const headlinesSuccess = headlines => ({
  type: GET_HEADLINES_SUCCESS,
  headlines
});

const headlinesFailure = err => ({
  type: GET_HEADLINES_FAILURE,
  err
});

export const initHeadlines = () => ({
  type: INITIALIZE_HEADLINES
});

export const getHeadlines = dispatch => {
  const url = `/api/headlines`;
  dispatch(headlinesRequest());
  axios({
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  })
    .then(({ data }) => {
      dispatch(headlinesSuccess(data));
    })
    .catch(e => {
      dispatch(headlinesFailure(e));
    });
};

export default headlinesReducer;
