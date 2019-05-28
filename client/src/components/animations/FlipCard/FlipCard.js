import React from 'react';
import { useSpring, config } from 'react-spring';

import {
  StyledFlipCard,
  StyledFrontSide,
  StyledBackSide,
} from './FlipCard.styled';

const FrontSide = props => {
  return <StyledFrontSide {...props}>{props.children}</StyledFrontSide>;
};

const BackSide = props => {
  return <StyledBackSide {...props}>{props.children}</StyledBackSide>;
};

const FlipCard = props => {
  const { flipped } = props;
  console.log(config);
  const { zIndex, transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    zIndex: flipped ? 5 : 0,
    transform: `perspective(50rem) rotateY(${flipped ? 180 : 0}deg)`,
    config: config.stiff,
  });
  return (
    <StyledFlipCard>
      <FrontSide
        style={{
          zIndex: zIndex.interpolate(o => 5 - o),
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      >
        {props.children[0]}
      </FrontSide>
      <BackSide
        style={{
          zIndex,
          opacity,
          transform: transform.interpolate(t => `${t} rotateY(180deg)`),
        }}
      >
        {props.children[1]}
      </BackSide>
    </StyledFlipCard>
  );
};

export default FlipCard;
