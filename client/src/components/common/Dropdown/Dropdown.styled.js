import styled from 'styled-components';
import { animated } from 'react-spring';
import { Button as DefaultButton } from '../Button';

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownMenu = styled(animated.ul)`
  visibility: ${props => (props.open ? 'visible' : 'hidden')};
  background-color: ${props => props.color || '#fff'};
  border: 1px solid ${props => props.theme.border || '#000'};
  position: absolute;
  padding: 0.25rem 0.5rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  right: 0;
  top: 25px;
`;

export const DropdownItem = styled.li`
  display: flex;
  cursor: pointer;
  color: ${props => props.theme.dark || '#000'};
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 3px;
`;

export const DropdownToggler = styled(DefaultButton)`
  border: 1px solid ${props => props.theme.border || '#000'};
  transition: none;
  box-shadow: 0 2px 3px ${props => props.theme.dark || '#000'};
  width: 100%;
`;
