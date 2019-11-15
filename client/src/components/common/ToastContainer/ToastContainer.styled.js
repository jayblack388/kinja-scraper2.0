import styled from 'styled-components';
import { flex } from '../../../utils/styles/helpers';

export const StyledToastContainer = styled.div`
  ${props => flex(props)}
  height: 100%;
  min-height: 4rem;
  width: 100%;
  background-color: ${props =>
    props.error ? props.theme.danger : props.theme.white};
`;
