import React, { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetCharacterQuery } from "../../api/rickMorty";
import Tabs from "../../components/Tabs";

const CharacterContainer = styled.div`
    height: calc(100% - 230px); // minus nav and padding heights
    padding: 50px;
    overflow-x: auto;
    font-family: Roboto-Mono, Open Sans;
`;

const Grid = styled.div`
    display: flex;
`;

const CharacterImage = styled.img`
    height: 40vh;
    width: auto;
`;

const InfoContainer = styled.div`
    height: 100%;
    width: 100%;
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

    const episodeTabs = useMemo(() => characterData?.episode?.slice(0, 5)?.map((episode) => `Episode ${episode.split("/")[5]}`), [characterData?.episode]);

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
                    <InfoText>{characterData?.created && new Date(characterData.created).toLocaleString()}</InfoText>
                </InfoContainer>
            </Grid>
            <h1>Episodes Info</h1>
            <Tabs tabs={episodeTabs || []} tabsContent={[<p>Hello</p>]} />
        </CharacterContainer>
    );
});

export default CharacterPage;