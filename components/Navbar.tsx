import React, { memo } from "react";
import styled from "styled-components";
import rickMortyLogo from "../media/rickmorty.svg";

const NavContainer = styled.div`
    height: 100px;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: center;
    padding: 10px 20px;
`;

const NavLogo = styled.img`
    height: 100%;
`;

const Navbar = memo(() => {
    return (
        <NavContainer>
            <NavLogo src={rickMortyLogo} />
        </NavContainer>
    );
});

export default Navbar;