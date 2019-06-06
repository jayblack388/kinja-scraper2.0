import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { buttonBoxShadow } from '../../../utils/styles/helpers';

export const StyledBtnLink = styled(Link)`
  background-color: ${props =>
    props.primary ? props.theme.primaryColor : props.theme.white};
  border-radius: 0.8rem;
  border: 1px solid ${props => props.theme.border || '#ebebeb'};
  color: ${props =>
    props.primary ? props.theme.white : props.theme.primaryColor};
  cursor: pointer;
  display: block;
  font-size: 1rem;
  padding: 0.8rem 1.6rem;
  text-decoration: none;
  transition: none;
  ${props => (props.fullWidth ? 'width: 100%' : '')};
  &:active {
    background-color: ${props =>
      props.primary
        ? props.theme.lightens.primaryColor
        : props.theme.darkens.white};
    transform: translateY(2px);
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: ${props =>
      props.primary
        ? props.theme.lightens.primaryColor
        : props.theme.darkens.white};
        ${props => buttonBoxShadow(props)}
      }
`;

export const StyledLink = styled(Link)`
  background: none;
  border: none;
  color: ${props => (props.blue ? props.theme.primaryColor : props.theme.dark)};
  cursor: pointer;
  font-size: 1rem;
  padding: 0.8rem 1.6rem;
  text-decoration-color: ${props =>
    props.blue ? props.theme.primaryColor : props.theme.dark};
  text-decoration: underline;
  width: 100%;
  &:active {
    color: ${props =>
      props.blue
        ? props.theme.darkens.primaryColor
        : props.theme.lightens.dark};
  }
  &:focus {
    outline: 0;
  }
  &:hover {
    color: ${props =>
      props.blue
        ? props.theme.darkens.primaryColor
        : props.theme.lightens.dark};
  }
`;
