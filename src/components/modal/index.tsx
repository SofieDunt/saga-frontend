import React from "react";
import styled from "@emotion/styled";
import { Button, Text } from "rebass";
import { BLACK, WHITE } from "../../themes";

const CloseBackground = styled(Button)`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  color: ${BLACK};
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
`;

const ViewWindow = styled.div`
  position: fixed;
  z-index: 3;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -55%);
  background-color: ${WHITE};
  border: 2px solid ${BLACK}20;
  border-radius: 20;
  max-height: 85vh;
  max-width: 95vw;
  overflow-y: auto;
`;

const CloseButton = styled(Button)`
  background: ${WHITE};
  position: fixed;
  right: 0;
`;

const ButtonText = styled(Text)`
  color: ${BLACK};
  font-size: 25px;
  padding: 5px;
`;

interface ModalProps {
  readonly visible: boolean;
  readonly onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  return (
    <>
      {visible && (
        <>
          <CloseBackground onClick={onClose} />
          <ViewWindow>
            <CloseButton onClick={onClose}>
              <ButtonText>X</ButtonText>
            </CloseButton>
            {children}
          </ViewWindow>
        </>
      )}
    </>
  );
};

export default Modal;
