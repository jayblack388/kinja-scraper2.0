import axios from 'axios';
export const INITIALIZE = 'INITIALIZE';
export const INITIALIZE_HEADLINES = 'INITIALIZE_HEADLINES';
export const GET_HEADLINES_REQUEST = 'GET_HEADLINES_REQUEST';
export const GET_HEADLINES_SUCCESS = 'GET_HEADLINES_SUCCESS';
export const GET_HEADLINES_FAILURE = 'GET_HEADLINES_FAILURE';
export const SORT_HEADLINES_SUCCESS = 'SORT_HEADLINES_SUCCESS';

export const titleToSite = choice => {
  let site = '';
  switch (choice) {
    case 'Gizmodo':
      site = 'https://gizmodo.com';
      break;
    case 'The A.V. Club':
      site = 'https://avclub.com';
      break;
    case 'Deadspin':
      site = 'https://deadspin.com';
      break;
    case 'Jalopnik':
      site = 'https://jalopnik.com';
      break;
    case 'Jezebel':
      site = 'https://jezebel.com';
      break;
    case 'Kotaku':
      site = 'https://kotaku.com';
      break;
    case 'Lifehacker':
      site = 'https://lifehacker.com';
      break;
    case 'Splinter':
      site = 'https://splinternews.com';
      break;
    case 'The Root':
      site = 'https://theroot.com';
      break;
    case 'The Takeout':
      site = 'https://thetakeout.com';
      break;
    case 'Clickhole':
      site = 'https://clickhole.com';
      break;
    case 'The Onion':
      site = 'https://theonion.com';
      break;
    case 'The Inventory':
      site = 'https://theinventory.com';
      break;
    default:
      console.log("This shouldn't happen");
  }
  return site;
};

export const siteToTitle = choice => {
  let site = '';
  switch (choice) {
    case 'https://gizmodo.com':
      site = 'Gizmodo';
      break;
    case 'https://avclub.com':
      site = 'The A.V. Club';
      break;
    case 'https://deadspin.com':
      site = 'Deadspin';
      break;
    case 'https://jalopnik.com':
      site = 'Jalopnik';
      break;
    case 'https://jezebel.com':
      site = 'Jezebel';
      break;
    case 'https://kotaku.com':
      site = 'Kotaku';
      break;
    case 'https://lifehacker.com':
      site = 'Lifehacker';
      break;
    case 'https://splinternews.com':
      site = 'Splinter';
      break;
    case 'https://theroot.com':
      site = 'The Root';
      break;
    case 'https://thetakeout.com':
      site = 'The Takeout';
      break;
    case 'https://clickhole.com':
      site = 'Clickhole';
      break;
    case 'https://theonion.com':
      site = 'The Onion';
      break;
    case 'https://theinventory.com':
      site = 'The Inventory';
      break;
    default:
      console.log("This shouldn't happen");
  }
  return site;
};

const unique = (value, index, self) => {
  return self.indexOf(value) === index;
};
const mapSites = (headlines = []) => {
  const sites = headlines.map(headline => headline.site);
  let siteArr = sites.map(site => siteToTitle(site));
  siteArr = siteArr.filter(unique);
  return siteArr;
};

export const headlinesInitialState = {
  isLoading: false,
  err: null,
  allSites: [
    'Gizmodo',
    'The A.V. Club',
    'Deadspin',
    'Jalopnik',
    'Jezebel',
    'Kotaku',
    'Lifehacker',
    'Splinter',
    'The Root',
    'The Takeout',
    'Clickhole',
    'The Onion',
    'The Inventory'
  ],
  headlines: [],
  allHeadlines: [],
  sites: []
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
        allHeadlines: action.headlines,
        sites: mapSites(action.headlines),
        isLoading: false
      };
    case SORT_HEADLINES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        headlines: action.headlines
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

const sortSuccess = headlines => ({
  type: SORT_HEADLINES_SUCCESS,
  headlines
});

const headlinesFailure = err => ({
  type: GET_HEADLINES_FAILURE,
  err
});

export const initHeadlines = () => ({
  type: INITIALIZE_HEADLINES
});

export const sortHeadlines = ({ dispatch, choice, headlines }) => {
  dispatch(headlinesRequest());
  if (choice === 'All') {
    dispatch(sortSuccess(headlines));
  } else {
    const site = titleToSite(choice);
    const retHeadlines = headlines.filter(headline => headline.site === site);
    if (retHeadlines.length === 0) {
      dispatch(headlinesFailure('No headlines returned'));
    }
    dispatch(sortSuccess(retHeadlines));
  }
};

export const scrapeHeadlines = ({ dispatch, choice }) => {
  const url = `/api/headlines/scrape/${choice}`;
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
