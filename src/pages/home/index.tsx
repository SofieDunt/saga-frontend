import React from "react";
import styled from "@emotion/styled";
import { Box, Flex, Text } from "rebass";
import { PageContainer } from "../../components/themeComponents";
import { PURPLE, BLUE } from "../../themes";
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

const GetStarted = styled(Text)`
  font-size: 40px;
`;

const Italic = styled(Text)`
  display: inline-block;
  font-style: italic;
`;

const ButtonLabel = styled(Text)`
  font-size: 25px;
  padding: 0 20px;
`;

const Home: React.FC<ErrorHandlerProps> = () => {
  return (
    <PageContainer>
      <HomePageContainer>
        <TitleBox>
          <Text>Welcome to Saga,</Text>
          <GreetingDescription>
            where you can <Italic>play</Italic> and <Italic>write</Italic>{" "}
            interactive stories.
          </GreetingDescription>
        </TitleBox>
        <GetStarted mb={20}>Get started!</GetStarted>
        <Flex height={100} ml={50}>
          <LinkButton to={Routes.PLAYER_LIBRARY} bg={BLUE}>
            <ButtonLabel>Play a story!</ButtonLabel>
          </LinkButton>
          <Box width={15} />
          <LinkButton to={Routes.WRITER_LIBRARY} bg={PURPLE}>
            <ButtonLabel>Write a new masterpiece!</ButtonLabel>
          </LinkButton>
        </Flex>
      </HomePageContainer>
    </PageContainer>
  );
};

export default Home;
