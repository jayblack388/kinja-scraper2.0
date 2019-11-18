import styled from "styled-components";
import { buttonBoxShadow } from "../../../utils/styles/helpers";

export const Logo = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 50%;
  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
  }
`;

export const BrandLink = styled.a`
  border-radius: 50%;
  display: flex;
  transition: none;
  width: 40px;
  height: 40px;
  &:focus {
    outline: 0;
  }
  &:active {
    transform: translateY(2px);
  }
  pointer-events: none;
  ${props => buttonBoxShadow(props)}
  @media (max-width: 480px) {
    height: 32px;
    width: 32px;
  }
`;
