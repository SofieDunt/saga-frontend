import React from "react";
import { Flex, Box, Link } from "rebass";
import { BLACK, PRIMARY, WHITE } from "../../themes";
import { Routes } from "../../App";
import styled from "@emotion/styled";

const NavFlex = styled(Flex)`
  height: 10vh;
  padding: 20px 25px;
  color: ${PRIMARY};
  background-color: ${BLACK};
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${WHITE};
  font-weight: bold;
  text-decoration: none;
  font-size: 20px;
`;

const NavBar: React.FC = () => {
  return (
    <NavFlex>
      <NavLink href={Routes.HOME} fontSize={25} color={PRIMARY}>
        Saga
      </NavLink>
      <Box mx="auto" />
      <NavLink marginRight={4} href={Routes.PLAYER_LIBRARY}>
        Play
      </NavLink>
      <NavLink href={Routes.WRITER_LIBRARY}>Write</NavLink>
    </NavFlex>
  );
};

export default NavBar;
