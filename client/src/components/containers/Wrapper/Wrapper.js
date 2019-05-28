import React from 'react';
import { Wrapper as StyledWrapper } from './Wrapper.styled';

const Wrapper = props => {
  const { children } = props;
  return <StyledWrapper {...props}>{children}</StyledWrapper>;
};

export default Wrapper;
