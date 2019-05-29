import React from 'react';
import {
  LinkWrapper,
  StyledList,
  StyledListItem,
  SummaryText,
  TitleText
} from './List.styled';

const HeadlineItem = props => {
  const { item } = props;
  const { title, summary, link } = item;
  return (
    <LinkWrapper href={link}>
      <StyledListItem {...props}>
        <TitleText>{title}</TitleText>
        <SummaryText>{summary}</SummaryText>
      </StyledListItem>
    </LinkWrapper>
  );
};

const List = props => {
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
