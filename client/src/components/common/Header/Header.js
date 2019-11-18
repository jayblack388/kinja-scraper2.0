import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Nav as JDBHeader } from "jdb-components";
import { BrandLink } from "../";

const Header = props => {
  const theme = useContext(ThemeContext);
  const menuText = {
    openText: <BrandLink dark={theme.mode.darkMode} />,
    closeText: <BrandLink dark={!theme.mode.darkMode} />
  };
  return (
    <JDBHeader
      menuText={menuText}
      headerColor="primary"
      menuColor="secondary"
      links={[{ name: "My Portfolio", path: "https://johnblackwell.dev" }]}
      height='3.5rem'
    />
  );
};

export default Header;
