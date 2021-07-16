import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Flex, Text } from "rebass";
import { BLACK, WARN, WHITE } from "../../themes";

const Banner = styled(Flex)`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid ${BLACK};
  border-radius: 20;
  padding: 5px 0 5px 15px;
`;

const CloseButton = styled(Button)`
  padding: 0;
  background: 0;
`;

interface AlertProps {
  readonly visible: boolean;
  readonly message: string;
  readonly warn?: boolean;
  readonly onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ visible, message, warn, onClose }) => {
  return (
    <>
      {visible && (
        <>
          <Banner bg={warn ? WARN : WHITE}>
            <Text my={"auto"}>{message}</Text>
            <Box mx={"auto"} />
            <CloseButton onClick={onClose} color={BLACK}>
              X
            </CloseButton>
          </Banner>
        </>
      )}
    </>
  );
};

export default Alert;
