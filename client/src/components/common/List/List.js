import React from "react";
import { BlockSpan, Button } from "jdb-components";
import sites from "../../../constants";
import {
  LinkWrapper,
  StyledList,
  StyledBtnList,
  StyledListItem,
  SummaryText,
  TitleText
} from "./List.styled";

const HeadlineItem = props => {
  const { item } = props;
  const { title, summary, link, site } = item;
  return (
    <LinkWrapper href={link}>
      <StyledListItem {...props}>
        <TitleText>{title}</TitleText>
        <a href={site}>{site}</a>
        <SummaryText>{summary}</SummaryText>
      </StyledListItem>
    </LinkWrapper>
  );
};

export const ButtonList = ({ handleClick, type }) => {
  return (
    <>
      <BlockSpan
        style={{
          textAlign: "center",
          marginBottom: "1.2rem",
          fontWeight: "bold"
        }}
      >
        {type === "scrape" ? "Scrape Sites" : "Filter Sites"}
      </BlockSpan>
      <StyledBtnList>
        <Button
          color={type === "scrape" ? "primary" : "secondary"}
          message="All"
          onClick={() => handleClick("All")}
          style={{ marginBottom: "0.8rem", padding: "0.8rem" }}
          width="100%"
        />
        {sites.map(site => (
          <Button
            color={type === "scrape" ? "primary" : "secondary"}
            message={site.title}
            onClick={() => handleClick(site.title)}
            style={{ marginBottom: "0.8rem", padding: "0.8rem" }}
            width="100%"
          />
        ))}
      </StyledBtnList>
    </>
  );
};

export const List = props => {
  const { items = [] } = props;
  return (
    <StyledList>
      {items.map((item, i) => (
        <HeadlineItem odd={i % 2} key={item._id} item={item} />
      ))}
    </StyledList>
  );
};

export default List;
