import styled from "@emotion/styled";
import { Box, Button, Flex, Text } from "rebass";
import { BLACK, PRIMARY, SECONDARY, SOFT_BLACK, WHITE } from "../themes";

export const PageContainer = styled.div`
  height: 90vh;
  padding: 3vh 3vw;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const BlackPageContainer = styled(PageContainer)`
  background: linear-gradient(45deg, ${SOFT_BLACK} 60%, #003042);
  color: ${WHITE};
`;

export const StoryTitle = styled(Text)`
  padding-top: 20px;
  font-size: 48px;
  font-weight: bold;
  padding-bottom: 20px;
`;

export const InlineText = styled(Text)`
  display: inline-block;
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

  @media only screen and (max-width: 813px) {
    font-size: 20px;
  }
`;

export const FormContainer = styled.div`
  min-width: 450px;
  min-height: 200px;
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

export const BottomCornerFlex = styled(Flex)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const PrimaryButton = styled(Button)`
  background: ${PRIMARY};
`;

export const SecondaryButton = styled(Button)`
  background: ${SECONDARY};
`;
