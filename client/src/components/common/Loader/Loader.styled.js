import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { 
    transform: rotate(0deg);
  }
  to { 
    transform: rotate(360deg); 
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
`;
export const Loader = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 1rem;
  display: inline-block;
  border: 4px ${props => props.theme.darkens.border || '#ebebeb'} solid;
  border-top: 4px ${props => props.theme.primaryColor || '#000'} solid;
  border-radius: 50%;
  -webkit-animation: ${rotate} 0.8s infinite ease-in-out;
  animation: ${rotate} 0.8s infinite ease-in-out;
`;
