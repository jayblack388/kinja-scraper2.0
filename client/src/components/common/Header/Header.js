import React, { useEffect, useState } from "react";
import { Button, Container } from "./Header.styled";
import { BrandLink, Dropdown } from "../";
import { useGlobalState } from "../../../store/GlobalState";
import { sortHeadlines, scrapeHeadlines, titleToSite } from "../../../store/ducks/headlines";

const ScrapeDropDown = props => {
  const { sites, dispatch } = props;
  const [open, setOpen] = useState(false);
  const scrapeClick = choice => {
    scrapeHeadlines({ dispatch, choice });
    setOpen(false);
  };
  const parsedSites = titleToSite(sites)
  const items = parsedSites.map((site, i) => {
    return <Button key={site} message={site} onClick={() => scrapeClick(site)} />;
  });
  return (
    <Dropdown
      open={open}
      menuProps={{ rowWidth: 7 }}
      setOpen={setOpen}
      message={"Scrape Kinja Sites"}
      items={items}
    />
  );
};
const SortDropDown = props => {
  const { sites, headlines, dispatch } = props;
  const [message, setMessage] = useState("Sort Kinja Sites");
  const [open, setOpen] = useState(false);
  let sortSites = sites;
  const sortClick = choice => {
    setMessage(choice);
    sortHeadlines({ dispatch, choice, headlines });
    setOpen(false);
  };
  useEffect(() => {
    sortSites.splice(0, 0, "All");
  }, [sortSites]);
  const items = sortSites.map((site, i) => (
    <Button key={site} message={site} onClick={() => sortClick(site)} />
  ));
  return (
    <Dropdown open={open} setOpen={setOpen} message={message} items={items} />
  );
};

const Header = props => {
  const [{ headlines: headLinesState }, dispatch] = useGlobalState();
  const { sites = [], allHeadlines: headlines = [], allSites } = headLinesState;
  return (
    <Container>
      <BrandLink />
      <ScrapeDropDown sites={allSites} dispatch={dispatch} />
      <SortDropDown sites={sites} headlines={headlines} dispatch={dispatch} />
    </Container>
  );
};

export default Header;
