import React, { memo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetCharacterQuery } from "../../api/rickMorty";

const CharacterContainer = styled.div`
    height: calc(100% - 230px); // minus nav and padding heights
    padding: 50px;
    overflow-x: auto;
`;

const Grid = styled.div`
    display: flex;
`;

const CharacterImage = styled.img`
    height: 100%;
    width: 100%;
`;

const InfoContainer = styled.div`
    height: 100%;
    width: 100%;
    font-family: Schwifty, Open Sans;
`;

const InfoText = styled.p`
    padding: 50px;
`;

const CharacterPage = memo(() => {
    const params = useParams();

    const {
        data: characterData,
        isSuccess: characterIsSuccess
    } = useGetCharacterQuery({ characterId: Number(params.characterId) });

    return (
        <CharacterContainer>
            <Grid>
                <CharacterImage src={characterData?.image} />
                <InfoContainer>
                    <InfoText>Hello World</InfoText>
                </InfoContainer>
            </Grid>
        </CharacterContainer>
    );
});

export default CharacterPage;