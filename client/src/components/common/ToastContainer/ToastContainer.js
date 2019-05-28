import React from 'react';
import { StyledToastContainer } from './ToastContainer.styled';

const ToastContainer = props => {
  return (
    <StyledToastContainer {...props}>
      <span>{props.message}</span>
    </StyledToastContainer>
  );
};

export default ToastContainer;
