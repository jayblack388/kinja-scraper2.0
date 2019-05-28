import { useMemo, useReducer } from 'react';

const reducer = (state, _action) => !state;

const useForceUpdate = () => {
  const [, dispatch] = useReducer(reducer, true);

  // Turn dispatch(required_parameter) into dispatch().
  const memoizedDispatch = useMemo(
    () => () => {
      dispatch(null);
    },
    [dispatch]
  );
  return memoizedDispatch;
};

export default useForceUpdate;
