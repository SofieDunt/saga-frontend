import React from "react";
import { Button, Text } from "rebass";
import { TERTIARY, WHITE } from "../../themes";

interface SoftButtonProps {
  readonly onClick?: () => void;
  readonly text: string;
  readonly margin?: string;
}

const SoftButton: React.FC<SoftButtonProps> = ({ onClick, text, margin }) => {
  return (
    <>
      <Button onClick={onClick} bg={TERTIARY} margin={margin ? margin : "0"}>
        <Text color={WHITE}>{text}</Text>
      </Button>
    </>
  );
};

export default SoftButton;
