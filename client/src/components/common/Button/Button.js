import React from 'react';
import { StyledButton, StyledLinkButton, ButtonText } from './Button.styled';

export const Button = props => {
  const { message, children } = props;
  return (
    <StyledButton {...props}>
      <ButtonText>{message || children}</ButtonText>
    </StyledButton>
  );
};

export const LinkButton = props => {
  const { message, children = <span /> } = props;
  return (
    <StyledLinkButton {...props}>
      <ButtonText>{message || children}</ButtonText>
    </StyledLinkButton>
  );
};

export default Button;
