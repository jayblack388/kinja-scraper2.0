import { useContext, useEffect } from 'react';
import { __RouterContext } from 'react-router-dom';
import { useForceUpdate } from './';

const useRouter = () => {
  const forceUpdate = useForceUpdate();
  const routerContext = useContext(__RouterContext);
  if (!routerContext) {
    throw new Error('use-react-router may only be used with react-router@^5.');
  }
  useEffect(() => routerContext.history.listen(forceUpdate), [routerContext]);
  return routerContext;
};

export default useRouter;
