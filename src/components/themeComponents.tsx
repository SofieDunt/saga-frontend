import styled from "@emotion/styled";
import { Box, Button, Flex, Text } from "rebass";
import { BLACK, BLUE } from "../themes";

export const PageContainer = styled.div`
  padding: 3vh 3vw;
`;

export const StoryTitle = styled(Text)`
  padding-top: 20px;
  font-size: 48px;
  font-weight: bold;
  padding-bottom: 20px;
`;

export const StrongText = styled(Text)`
  font-weight: bold;
`;

export const Header = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  padding: 15px 0 5px;
`;

export const ButtonLabel = styled(Text)`
  font-size: 25px;
  padding: 0 20px;
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

export const BottomFlex = styled(Flex)`
  position: absolute;
  bottom: 50px;
  right: 50px;
`;

export const PrimaryButton = styled(Button)`
  background: ${BLUE};
`;
