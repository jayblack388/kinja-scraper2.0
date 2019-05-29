import React from 'react';
import { Button, Container } from './Header.styled';
import { BrandLink, Dropdown } from '../';

const Header = props => {
  const items = [
    <Button message="Link #1" />,
    <Button message="Link #2" />,
    <Button message="Link #3" />,
  ];
  return (
    <Container>
      <BrandLink />
      <Dropdown message={'Pick a site to scrape'} items={items} />
    </Container>
  );
};

export default Header;
