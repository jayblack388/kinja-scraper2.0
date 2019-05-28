import { useState } from 'react';
const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const toggleHover = () => setIsHovered(!isHovered);
  return [isHovered, toggleHover];
};

export default useHover;
