import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: ${props =>
    props.primary ? props.theme.primaryColor : props.theme.white};
  padding: 0.8rem 1.6rem;
  color: ${props =>
    props.primary ? props.theme.white : props.theme.primaryColor};
  border: 1px solid ${props => props.theme.border || '#ebebeb'};
  border-radius: 0.8rem;
  transition: none;
  cursor: pointer;
  box-shadow: 0 2px 3px ${props => props.theme.dark || '#000'};
  &:hover {
    background-color: ${props =>
      props.primary
        ? props.theme.lightens.primaryColor
        : props.theme.darkens.white};
  }
  &:focus {
    outline: 0;
  }
  &:active {
    background-color: ${props =>
      props.primary
        ? props.theme.lightens.primaryColor
        : props.theme.darkens.white};
    box-shadow: 0 1px 2px ${props => props.theme.lightens.dark || '#000'};
    transform: translateY(2px);
  }
`;

export const StyledLinkButton = styled.button`
  padding: 0.8rem 1.6rem;
  color: ${props => (props.blue ? props.theme.primaryColor : props.theme.dark)};
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
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
