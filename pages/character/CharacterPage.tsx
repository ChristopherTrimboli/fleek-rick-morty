import React, { memo, ReactNode, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetCharacterQuery, useGetEpisodeQuery } from "../../api/rickMorty";
import Tabs from "../../components/Tabs";

const CharacterContainer = styled.div`
    height: calc(100% - 230px); // minus nav and padding heights
    padding: 50px;
    overflow-x: auto;
    font-family: Roboto-Mono, Open Sans;

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        height: calc(100% - 190px); // minus nav and padding heights - mobile
        padding: 30px 20px;
    }
`;

const Grid = styled.div`
    display: flex;

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        flex-direction: column;
    }
`;

const CharacterImage = styled.img`
    height: 40vh;
    width: auto;

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        max-height: 400px;
        max-width: 400px;
    }
`;

const InfoContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 0 20px;

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        padding: 0px;
    }
`;

const InfoText = styled.p`
    font-size: 25px;
`;

const CharacterPage = memo(() => {
    const params = useParams();

    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [tabsContent, setTabsContent] = useState<ReactNode[]>([]);
    const [renderHack, setRenderHack] = useState<boolean>(false);

    const {
        data: characterData
    } = useGetCharacterQuery({ characterId: Number(params.characterId) });

    const episodeNumbers: number[] = useMemo(() => characterData?.episode?.slice(0, 5)?.map((episode) => Number(episode.split("/")[5])), [characterData?.episode]);
    const episodeTabTitles: string[] = useMemo(() => episodeNumbers?.map((number) => `Episode ${number}`), [characterData?.episode]);

    const {
        data: episodeData
    } = useGetEpisodeQuery({ episodeId: episodeNumbers?.[selectedTab] }, {
        skip: !episodeNumbers?.length
    });

    useEffect(() => {
        if (episodeData) {
            let newContent = tabsContent;
            newContent[selectedTab] = (
                <div>
                    <InfoText>{episodeData.id}</InfoText>
                    <InfoText>{episodeData.name}</InfoText>
                    <InfoText>{episodeData.air_date}</InfoText>
                    <InfoText>{episodeData.episode}</InfoText>
                </div>
            )
            setTabsContent(newContent);
            setRenderHack(!renderHack);
        } else {
            return undefined;
        }
    }, [episodeData])

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
            <Tabs
                selectedTab={selectedTab}
                onTabChange={(newTab) => setSelectedTab(newTab)}
                tabTitles={episodeTabTitles || []}
                tabsContent={tabsContent}
            />
        </CharacterContainer>
    );
});

export default CharacterPage;