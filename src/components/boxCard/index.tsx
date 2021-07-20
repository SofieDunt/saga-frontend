import React from "react";
import styled from "@emotion/styled";
import { Box, Text } from "rebass";
import { BLACK } from "../../themes";

interface StoryCardProps {
  minWidth?: string;
}

export const StoryCard = styled(Box)`
  padding: 20px 20px;
  min-width: ${(props: StoryCardProps) =>
    props.minWidth ? props.minWidth : `200px`};
  border: 2px solid ${BLACK};
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const CardHeader = styled(Text)`
  font-size: 19px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 15px;
`;

interface CardProps {
  readonly title: string;
  readonly minWidth?: string;
}

const BoxCard: React.FC<CardProps> = ({ title, minWidth, children }) => {
  return (
    <StoryCard minWidth={minWidth}>
      <CardHeader>{title}</CardHeader>
      {children}
    </StoryCard>
  );
};

export default BoxCard;
