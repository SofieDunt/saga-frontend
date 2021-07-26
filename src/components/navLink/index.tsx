import React from "react";
import { Text } from "rebass";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { WHITE } from "../../themes";

const LinkText = styled(Text)`
  color: ${WHITE};
  font-weight: bold;
  font-size: 20px;
`;

const NavLink: React.FC<any> = ({ href, ...rest }) => {
  const history = useHistory();
  return (
    <LinkText
      {...rest}
      onClick={() => {
        history.push(href);
      }}
    />
  );
};

export default NavLink;
