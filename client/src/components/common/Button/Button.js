import React from 'react';
import { StyledButton, StyledLinkButton } from './Button.styled';

export const Button = props => {
  const { message, children = <span /> } = props;
  return <StyledButton {...props}>{message || children}</StyledButton>;
};

export const LinkButton = props => {
  const { message, children = <span /> } = props;
  return <StyledLinkButton {...props}>{message || children}</StyledLinkButton>;
};

export default Button;
