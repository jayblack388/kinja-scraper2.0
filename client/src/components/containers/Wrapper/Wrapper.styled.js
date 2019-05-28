import styled from 'styled-components';
import flex from '../../../utils/styles/flex';

export const Wrapper = styled.section`
  ${props => flex(props)}
  height: ${props => props.height || '100%'};
  width: ${props => props.width || '100%'};
`;
