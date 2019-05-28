import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${props => props.padding || '1.6rem'}
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'center'};
  width: ${props => props.width || '40%'};
`;

export const Input = styled.input.attrs(props => ({
  type: props.type || 'text',
  placeholder: props.placeholder || 'Fll me out 🖊',
}))`
  font-size: 0.8rem;
  width: ${props => props.inputWidth || '50%'};
  box-shadow: none !important;
  background: transparent;
  border-top: transparent !important;
  border-left: transparent !important;
  border-right: transparent !important;
  border-bottom: 1px solid ${props => props.theme.darkens.border || '#000'} !important;
  &:focus {
    outline: 0;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || 'center'};
  width: ${props => props.labelWidth || '100%'};
`;

export const LabelText = styled.span`
  text-align: center;
  padding-bottom: 0.8rem;
`;
