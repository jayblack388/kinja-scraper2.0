import React from 'react';
import {
  Input as StyledInput,
  Label,
  LabelText,
  InputContainer,
} from './Input.styled';

const Input = props => {
  return (
    <InputContainer {...props}>
      <Label {...props}>
        <LabelText {...props}>{props.label || 'Default Label'}</LabelText>
        <StyledInput {...props} />
      </Label>
    </InputContainer>
  );
};

export default Input;
