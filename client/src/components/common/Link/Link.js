import React from 'react';
import { StyledBtnLink, StyledLink } from './Link.styled';

export const ButtonLink = props => {
  const { message, children = <span /> } = props;
  return <StyledBtnLink {...props}>{message || children}</StyledBtnLink>;
};

export const Link = props => {
  const { message, children = <span /> } = props;
  return <StyledLink {...props}>{message || children}</StyledLink>;
};
