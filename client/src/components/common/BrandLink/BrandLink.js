import React from 'react';
import { BrandLink as StyledBrandLink, Logo } from './BrandLink.styled';
import { useHover } from '../../../utils/customHooks';
import white from '../../../assets/jb-white.jpg';
import black from '../../../assets/jb-black.jpg';

const BrandLink = () => {
  const [isHovered, toggleHover] = useHover();
  return (
    <StyledBrandLink to="/">
      <Logo
        src={isHovered ? black : white}
        alt="logo"
        onMouseOver={toggleHover}
        onMouseOut={toggleHover}
      />
    </StyledBrandLink>
  );
};

export default BrandLink;
