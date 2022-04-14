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
    font-family: Roboto-Mono, Open Sans;
    padding: 0 20px;
`;

const InfoText = styled.p`
    font-size: 25px;
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
                    <InfoText>{characterData?.id}</InfoText>
                    <InfoText>{characterData?.name}</InfoText>
                    <InfoText>{characterData?.status}</InfoText>
                    <InfoText>{characterData?.species}</InfoText>
                    <InfoText>{characterData?.type}</InfoText>
                    <InfoText>{characterData?.gender}</InfoText>
                    <InfoText>{characterData?.origin?.name}</InfoText>
                    <InfoText>{new Date(characterData?.created).toLocaleString()}</InfoText>
                </InfoContainer>
            </Grid>
        </CharacterContainer>
    );
});

export default CharacterPage;