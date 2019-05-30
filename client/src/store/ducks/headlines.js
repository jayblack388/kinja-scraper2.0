import axios from 'axios';
export const INITIALIZE = 'INITIALIZE';
export const INITIALIZE_HEADLINES = 'INITIALIZE_HEADLINES';
export const GET_HEADLINES_REQUEST = 'GET_HEADLINES_REQUEST';
export const GET_HEADLINES_SUCCESS = 'GET_HEADLINES_SUCCESS';
export const GET_HEADLINES_FAILURE = 'GET_HEADLINES_FAILURE';
export const SORT_HEADLINES_SUCCESS = 'SORT_HEADLINES_SUCCESS';

const titleToSite = choice => {
  let site = '';
  switch (choice) {
    case 'Gizmodo':
      site = 'gizmodo.com';
      break;
    case 'The A.V. Club':
      site = 'avclub.com';
      break;
    case 'Deadspin':
      site = 'deadspin.com';
      break;
    case 'Jalopnik':
      site = 'jalopnik.com';
      break;
    case 'Jezebel':
      site = 'jezebel.com';
      break;
    case 'Kotaku':
      site = 'kotaku.com';
      break;
    case 'Lifehacker':
      site = 'lifehacker.com';
      break;
    case 'Splinter':
      site = 'splinternews.com';
      break;
    case 'The Root':
      site = 'theroot.com';
      break;
    case 'The Takeout':
      site = 'thetakeout.com';
      break;
    case 'Clickhole':
      site = 'clickhole.com';
      break;
    case 'The Onion':
      site = 'theonion.com';
      break;
    case 'The Inventory':
      site = 'theinventory.com';
      break;
    default:
      console.log("This shouldn't happen");
  }
  return site;
};

const siteToTitle = choice => {
  let site = '';
  switch (choice) {
    case 'gizmodo.com':
      site = 'Gizmodo';
      break;
    case 'avclub.com':
      site = 'The A.V. Club';
      break;
    case 'deadspin.com':
      site = 'Deadspin';
      break;
    case 'jalopnik.com':
      site = 'Jalopnik';
      break;
    case 'jezebel.com':
      site = 'Jezebel';
      break;
    case 'kotaku.com':
      site = 'Kotaku';
      break;
    case 'lifehacker.com':
      site = 'Lifehacker';
      break;
    case 'splinternews.com':
      site = 'Splinter';
      break;
    case 'theroot.com':
      site = 'The Root';
      break;
    case 'thetakeout.com':
      site = 'The Takeout';
      break;
    case 'clickhole.com':
      site = 'Clickhole';
      break;
    case 'theonion.com':
      site = 'The Onion';
      break;
    case 'theinventory.com':
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