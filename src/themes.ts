import styled from "@emotion/styled";
import { Box, Button, Flex, Text } from "rebass";

export const PRIMARY = "#4FC1E9";
export const SECONDARY = "#00A8B5";
export const TERTIARY = "#5978ab";
export const WARN = "#ff7373";
export const WHITE = "#FFF";
export const BLACK = "#000";
export const SOFT_BLACK = "#00171f";

export const ACTION_BUTTON_MARGIN = "0 5px 5px 0";

export const FooterPageContainer = styled.div`
  position: fixed;
  top: 10vh;
  width: 100vw;
  height: 90vh;
  padding: 20px 40px 100px;
  overflow-y: auto;
  box-sizing: border-box;

  @media only screen and (max-width: 813px) {
    padding: 20px 20px 60px;
  }
`;

export const PageContainer = styled.div`
  position: fixed;
  top: 10vh;
  width: 100vw;
  height: 90vh;
  padding: 20px 40px;
  overflow-y: auto;
  box-sizing: border-box;

  @media only screen and (max-width: 813px) {
    padding: 20px;
  }
`;

export const BlackPageContainer = styled(PageContainer)`
  padding: 20px 40px;
  background: linear-gradient(45deg, ${SOFT_BLACK} 60%, #003042);
  color: ${WHITE};

  @media only screen and (max-width: 813px) {
    padding: 20px;
  }
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
  padding: 0 10px;

  @media only screen and (max-width: 813px) {
    font-size: 20px;
  }
`;

export const FormContainer = styled.div`
  width: 60vw;
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

export const MidFlexElement = styled(Box)`
  margin: 0 10px;

  @media only screen and (max-width: 813px) {
    margin: 0;
  }
`;

export const EndFlexElement = styled(Box)`
  margin-left: 10px;

  @media only screen and (max-width: 813px) {
    margin: 10px 0 0 0;
  }
`;

export const BottomFlex = styled(Flex)`
  position: fixed;
  bottom: 0;
  left: 0;
  background: ${SOFT_BLACK};
  padding: 10px 20px;
  width: 100%;
  justify-content: flex-end;

  @media only screen and (max-width: 813px) {
    padding: 5px;
  }
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
