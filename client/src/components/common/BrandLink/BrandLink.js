import React from "react";
import { BrandLink as StyledBrandLink, Logo } from "./BrandLink.styled";
import white from "../../../assets/jb-white.jpg";
import black from "../../../assets/jb-black.jpg";

const BrandLink = ({ dark }) => {
  return (
    <StyledBrandLink target="_blank" href="https://johnblackwell.dev">
      <Logo src={dark ? black : white} alt="logo" />
    </StyledBrandLink>
  );
};

export default BrandLink;
