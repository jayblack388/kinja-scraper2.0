import React, { useEffect } from 'react';
import { Page, Wrapper } from '../../containers';
import { List, Loader } from '../../common';
import { useGlobalState } from '../../../store/GlobalState';
import { getHeadlines } from '../../../store/ducks/headlines';

const HomePage = props => {
  const [{ headlines: headLinesState }, dispatch] = useGlobalState();
  const { isLoading, headlines } = headLinesState;
  useEffect(() => {
    getHeadlines(dispatch);
  }, [dispatch]);
  return (
    <Page>
      <Wrapper>
        <Loader isLoading={isLoading}>
          <List items={headlines} />
        </Loader>
      </Wrapper>
    </Page>
  );
};

export default HomePage;
