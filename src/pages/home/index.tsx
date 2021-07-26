import React from "react";
import styled from "@emotion/styled";
import { Box, Flex, Text } from "rebass";
import {
  ButtonLabel,
  InlineText,
  BlackPageContainer,
} from "../../components/themeComponents";
import { SECONDARY, PRIMARY } from "../../themes";
import LinkButton from "../../components/linkButton";
import { ErrorHandlerProps, Routes } from "../../App";

const HomePageContainer = styled.div`
  padding-left: 40px;
`;

const TitleBox = styled(Box)`
  padding-top: 18vh;
  font-size: 52px;
  font-weight: bold;
  margin-bottom: 200px;
`;

const GreetingDescription = styled(Text)`
  padding-top: 5vh;
  padding-left: 100px;
`;

const Italic = styled(Text)`
  display: inline-block;
  font-style: italic;
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
        <Flex height={100}>
          <LinkButton to={Routes.PLAYER_LIBRARY} bg={PRIMARY}>
            <ButtonLabel>Play a story!</ButtonLabel>
          </LinkButton>
          <Box width={15} />
          <LinkButton to={Routes.WRITER_LIBRARY} bg={SECONDARY}>
            <ButtonLabel>Write a new masterpiece!</ButtonLabel>
          </LinkButton>
        </Flex>
      </HomePageContainer>
    </BlackPageContainer>
  );
};

export default Home;
