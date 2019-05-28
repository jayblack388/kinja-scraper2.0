import React from 'react';
import { LoaderContainer, Loader as StyledLoader } from './Loader.styled';

const Loader = ({
  isLoading,
  message,
  children = <div />
}) => {
  if (isLoading) {
    return (
      <LoaderContainer>
        <StyledLoader />
        {message}
      </LoaderContainer>
    );
  }
  return children;
};

export default Loader;
