import styled from "styled-components";
import { flex } from "../../../utils/styles/helpers";

export const StyledList = styled.ul`
  padding: 0.25rem 0.5rem;
  width: 60%;
  height: 70vh;
  padding: 0;
  margin: 0;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
`;
export const StyledBtnList = styled.ul`
  padding: 0.25rem 0.5rem;
  columns: 2;
  width: 100%;
  height: 90vh;
  padding: 0;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const LinkWrapper = styled.a`
  text-decoration: none;
`;

export const TitleText = styled.h3`
  text-align: center;
  font-weight: 600;
  width: 80%;
`;

export const SummaryText = styled.p`
  width: 75%;
  text-align: left;
`;

export const StyledListItem = styled.li`
  ${props => flex(props)}
  background-color: ${props =>
    props.odd ? props.theme.colors.primary : props.theme.colors.secondary};
  cursor: pointer;
  padding: 0.25rem;
  border: 1px solid ${props => props.theme.border || "#000"};
  color: ${props => props.theme.mode.text};
  width: 100%;
  margin: 0 5px 5px;
  &:last-of-type {
    margin: 0 5px;
  }
`;
