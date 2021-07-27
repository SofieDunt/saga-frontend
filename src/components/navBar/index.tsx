import React from "react";
import { Flex, Box } from "rebass";
import { BLACK, PRIMARY } from "../../themes";
import { Routes } from "../../App";
import styled from "@emotion/styled";
import NavLink from "../navLink";

const NavFlex = styled(Flex)`
  position: fixed;
  width: 100vw;
  height: 10vh;
  z-index: 1;
  padding: 20px 25px;
  color: ${PRIMARY};
  background-color: ${BLACK};
  align-items: center;
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
