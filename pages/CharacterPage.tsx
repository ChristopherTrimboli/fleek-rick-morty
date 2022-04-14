import React, { memo } from "react";
import styled from "styled-components";

const CharacterContainer = styled.div`
    height: 100%;
    width: 100%;
`;

const CharacterPage = memo(() => {
    return (
        <CharacterContainer>
            <p>Character</p>
        </CharacterContainer>
    );
});

export default CharacterPage;