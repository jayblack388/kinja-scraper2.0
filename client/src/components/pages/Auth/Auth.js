import React, { useState } from 'react';
import { Page, Wrapper } from '../../containers';
import AuthForm from '../../forms/AuthForm/AuthForm';
import { FlipCard } from '../../animations';

const AuthPage = props => {
  const [flipped, setFlipped] = useState(false);
  return (
    <Page>
      <Wrapper>
        <FlipCard flipped={flipped}>
          <AuthForm type={'login'} setType={() => setFlipped(!flipped)} />
          <AuthForm type={'signup'} setType={() => setFlipped(!flipped)} />
        </FlipCard>
      </Wrapper>
    </Page>
  );
};

export default AuthPage;
