import styled from 'styled-components';
import { animated as a } from 'react-spring';

const divStyle = () => `
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const cardStyle = props => `
  position: absolute;
  max-width: ${props.maxWidth || '50rem'};
  max-height: ${props.maxHeight || '50rem'};
  width: ${props.width || '25rem'};;
  height: ${props.height || '30rem'};;
  will-change: transform, opacity;
  box-shadow: 0 4px 6px ${props.theme.dark || '#000'};
  padding: ${props.padding || '1.5rem 2.5rem;'}
`;

export const StyledFlipCard = styled.div`
  ${divStyle()}
`;
export const StyledFrontSide = styled(a.div)`
  ${divStyle()}
  ${props => cardStyle(props)}
`;
export const StyledBackSide = styled(a.div)`
  ${divStyle()}
  ${props => cardStyle(props)}
`;
