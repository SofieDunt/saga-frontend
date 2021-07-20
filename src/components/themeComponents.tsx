import styled from "@emotion/styled";
import { Box, Text } from "rebass";
import { BLACK } from "../themes";

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

export const FormContainer = styled.div`
  width: 450px;
  height: 200px;
  color: ${BLACK};
  padding: 50px;
  text-align: left;
  line-height: 20px;
`;

export const TitleBox = styled(Box)`
  text-align: left;
  font-size: 52px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const EmptyLibrary = styled(Box)`
  text-align: center;
  width: 100%;
  font-size: 20px;
  padding-top: 30px;
`;

export const StoryCard = styled(Box)`
  padding: 20px 20px;
  width: 200px;
  border: 2px solid ${BLACK};
  border-radius: 5px;
  margin-right: 20px;
`;

export const CardHeader = styled(Text)`
  font-size: 19px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 15px;
`;

export const BottomBox = styled(Box)`
  position: absolute;
  bottom: 50px;
  right: 50px;
`;
