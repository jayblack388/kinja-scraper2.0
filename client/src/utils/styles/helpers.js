export const flex = props => `
  display: flex;
  flex-direction: ${props.direction || 'column'};
  align-items: ${props.align || 'center'};
  justify-content: ${props.justify || 'center'};
`;

export const boxShadow = props => `
  box-shadow: ${props.theme.buttons.boxShadow ||
    `0 4px 6px ${props.theme.colors.dark || '#000'}`};
`;
export const buttonBoxShadow = props => `
  box-shadow: ${props.theme.buttons.boxShadow ||
    `0 2px 3px ${props.theme.colors.dark || '#000'}`};
  &:active {
    box-shadow: ${props.theme.buttons.boxShadowPseudo ||
      `0 1px 2px ${props => props.theme.colors.dark || '#000'}`};
  }
`;
