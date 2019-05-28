import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Logo = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

export const BrandLink = styled(Link)`
  border: 1px solid ${props => props.theme.border || '#000'};
  border-radius: 50%;
  transition: none;
  box-shadow: 0 2px 3px ${props => props.theme.dark || '#000'};
  width: 40px;
  height: 40px;
  &:focus {
    outline: 0;
  }
  &:active {
    box-shadow: 0 1px 2px ${props => props.theme.lightens.dark || '#000'};
    transform: translateY(2px);
  }
`;
