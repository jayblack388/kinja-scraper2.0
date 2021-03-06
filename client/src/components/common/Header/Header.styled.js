import styled from 'styled-components';
import { Button as DefaultButton } from '../Button';

export const Container = styled.nav`
  background-color: ${props => props.theme.darkens.border || '#cecece'};
  padding: 0.8rem 1.6rem;
  color: ${props => props.theme.white || '#fff'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled(DefaultButton)`
  width: ${props => props.width || '90%'};
`;
