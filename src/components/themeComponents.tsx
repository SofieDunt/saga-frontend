import styled from "@emotion/styled";
import { Box, Text } from "rebass";

export const PageContainer = styled.div`
  padding: 3vh 3vw;
`;

export const CurrentContainer = styled(Box)`
  height: 90vh;
  width: 90vw;
  padding: 30px;
  overflow-y: auto;
`;

export const StoryTitle = styled(Text)`
  padding-top: 20px;
  font-size: 48px;
  font-weight: bold;
  padding-bottom: 20px;
`;
