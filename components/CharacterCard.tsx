import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
    min-height: 400px;
    max-width: 500px;
    border: 1px solid grey;
    padding: 10px;
`;

const Image = styled.img`
    height: 300px;
    width: 100%;
`;

const Info = styled.p`

`;

const DetailsButton = styled.button`
    width: 100%;
`;

interface CharacterCardProps {
    characterId: number;
    imageUrl: string;
    name: string;
    species: string;
    status: string;
}

const CharacterCard = memo(({ characterId, imageUrl, name, species, status }: CharacterCardProps) => {
    return (
        <CardContainer>
            <Image src={imageUrl} />
            <Info>{name}</Info>
            <Info>{species}</Info>
            <Info>{status}</Info>
            <Link to={`/character/${characterId}`}>
                <DetailsButton>Details</DetailsButton>
            </Link> 
        </CardContainer>
    );
});

export default CharacterCard;