const flex = props => `
  display: flex;
  flex-direction: ${props.direction || 'column'};
  align-items: ${props.align || 'center'};
  justify-content: ${props.justify || 'center'};
`;

export default flex;
