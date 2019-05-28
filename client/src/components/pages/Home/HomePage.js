import React from 'react';
import { toast } from 'react-toastify';
import { Page, Wrapper } from '../../containers';
import { Button, Loader } from '../../common';
import { useGlobalState } from '../../../store/GlobalState';
const HomePage = props => {
  const [
    {
      user: { user, isLoading },
    },
  ] = useGlobalState();
  const notify = () => toast('Wow so easy !');

  return (
    <Page>
      <Wrapper>
        <Loader isLoading={isLoading}>
          <span>I'm the Home Page</span>
          {user.details.email}
          <Button onClick={notify} message={'stuff'} />
        </Loader>
      </Wrapper>
    </Page>
  );
};

export default HomePage;
