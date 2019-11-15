import React from 'react';
import { StyledExternalBtnLink, StyledExternalLink } from './ExternalLink.styled';

export const ExternalBtnLink = props => {
  const { message, children = <span /> } = props;
  return <StyledExternalBtnLink {...props}>{message || children}</StyledExternalBtnLink>;
};

export const ExternalLink = props => {
  const { message, children = <span /> } = props;
  return <StyledExternalLink {...props}>{message || children}</StyledExternalLink>;
};
