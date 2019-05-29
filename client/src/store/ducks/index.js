import headlinesReducer from './headlines';
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

const rootReducer = combineReducers({
  headlines: headlinesReducer,
});

export { headlinesInitialState as headlines } from './headlines';

export default rootReducer;
