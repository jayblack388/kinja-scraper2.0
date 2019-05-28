import React from 'react';
import { toast } from 'react-toastify';
import { Page, Wrapper } from '../../containers';
import { Button } from '../../common';
const HomePage = props => {
  const notify = () => toast('Wow so easy !');

  return (
    <Page>
      <Wrapper>
        <span>I'm the Home Page</span>
        <Button onClick={notify} message={'stuff'} />
      </Wrapper>
    </Page>
  );
};

export default HomePage;
