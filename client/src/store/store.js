import { auth, config, user } from './ducks';

export const store = {
  auth,
  config,
  user
};

export { default as rootReducer } from './ducks';
