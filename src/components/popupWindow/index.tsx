import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Text } from "rebass";
import { BLACK, WHITE } from "../../themes";

const CloseBackground = styled(Button)`
  position: absolute;
  left: 0;
  top: 0;
  color: ${BLACK};
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
`;

const ViewWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${WHITE};
  border: 2px solid ${BLACK}20;
  border-radius: 20;
`;

const CloseButton = styled(Button)`
  padding: 0;
  background: ${WHITE};
`;

interface PopupWindowProps {
  readonly visible: boolean;
  readonly onClose: () => void;
}

const PopupWindow: React.FC<PopupWindowProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <>
      {visible && (
        <>
          <CloseBackground onClick={onClose} />
          <ViewWindow>
            <Box textAlign={"right"}>
              <CloseButton onClick={onClose}>
                <Text color={BLACK}>X</Text>
              </CloseButton>
            </Box>
            {children}
          </ViewWindow>
        </>
      )}
    </>
  );
};

export default PopupWindow;
