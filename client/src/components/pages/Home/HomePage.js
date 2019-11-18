import React, { useEffect } from "react";
import { ColDiv, Field, Form, Page, RowDiv } from "jdb-components";
import { ButtonList, List, Loader } from "../../common";
import { useGlobalState } from "../../../store/GlobalState";
import {
  getHeadlines,
  scrapeHeadlines,
  sortHeadlines
} from "../../../store/ducks/headlines";

const HomePage = ({ darkMode, setDarkMode }) => {
  const [{ headlines: headLinesState }, dispatch] = useGlobalState();
  const { isLoading, headlines, allHeadlines } = headLinesState;
  const sortClick = choice => {
    sortHeadlines({ dispatch, choice, headlines: allHeadlines });
  };
  const scrapeClick = choice => {
    scrapeHeadlines({ dispatch, choice });
  };
  useEffect(() => {
    getHeadlines(dispatch);
  }, [dispatch]);

  return (
    <Page height="calc(100vh - 3.5rem)" style={{ padding: "0 1rem" }}>
      <Loader message="Articles are loading" isLoading={isLoading}>
        <RowDiv height="100%" justify="center" align="center">
          <ColDiv
            mt="6rem"
            height="100%"
            width="20%"
            justify="flex-start"
            align="center"
          >
            <ButtonList handleClick={scrapeClick} type="scrape" />
          </ColDiv>
          <ColDiv height="100%" width="60%" justify="flex-start" align="center">
            <Form
              cancelButton
              onBlur={values => console.log(values)}
              onSubmit={values => console.log(values)}
              fieldOnChange={e => setDarkMode(e.target.value)}
              width="20rem"
            >
              <Field
                type="toggle"
                min={-100}
                max={100}
                defaultValue={darkMode}
                fieldName="dark_mode"
              />
            </Form>
            <List items={headlines} />
          </ColDiv>
          <ColDiv
            mt="6rem"
            height="100%"
            width="20%"
            justify="flex-start"
            align="center"
          >
            <ButtonList handleClick={sortClick} type="sort" />
          </ColDiv>
        </RowDiv>
      </Loader>
    </Page>
  );
};

export default HomePage;
