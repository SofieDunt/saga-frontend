import React from "react";
import styled from "@emotion/styled";
import { Box, Flex, Text } from "rebass";
import { ButtonLabel, InlineText, BlackPageContainer } from "../../themes";
import { SECONDARY, PRIMARY } from "../../themes";
import LinkButton from "../../components/linkButton";
import { ErrorHandlerProps, Routes } from "../../App";

const HomePageContainer = styled(Flex)`
  padding: 20vh 80px 80px 40px;
  height: 100%;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 813px) {
    padding: 5px;
  }
`;

const TitleBox = styled(Box)`
  font-size: 52px;
  font-weight: bold;

  @media only screen and (max-width: 813px) {
    margin-bottom: 50px;
  }
`;

const GreetingDescription = styled(Text)`
  padding-left: 100px;

  @media only screen and (max-width: 813px) {
    font-size: 42px;
    padding-left: 0;
  }
`;

const Italic = styled(Text)`
  display: inline-block;
  font-style: italic;
`;

const ButtonFlex = styled(Flex)`
  height: 100px;

  @media only screen and (max-width: 813px) {
    height: 75px;
  }
`;

const Home: React.FC<ErrorHandlerProps> = () => {
  return (
    <BlackPageContainer>
      <HomePageContainer>
        <TitleBox>
          <Text>
            Welcome to <InlineText color={PRIMARY}>Saga</InlineText>,
          </Text>
          <GreetingDescription>
            where you can <Italic color={PRIMARY}>play</Italic> and{" "}
            <Italic color={SECONDARY}>write</Italic> interactive stories.
          </GreetingDescription>
        </TitleBox>
        <Box my={"auto"} />
        <ButtonFlex>
          <LinkButton to={Routes.PLAYER_LIBRARY} bg={PRIMARY}>
            <ButtonLabel>Play a story!</ButtonLabel>
          </LinkButton>
          <Box width={15} />
          <LinkButton to={Routes.WRITER_LIBRARY} bg={SECONDARY}>
            <ButtonLabel>Write a new masterpiece!</ButtonLabel>
          </LinkButton>
        </ButtonFlex>
      </HomePageContainer>
    </BlackPageContainer>
  );
};

export default Home;
