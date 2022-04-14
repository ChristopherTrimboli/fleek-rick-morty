import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
    min-height: 400px;
    max-width: 500px;
    border: 1px solid #42B4CA;
    padding: 10px;
    margin: 8px;
`;

const Image = styled.img`
    height: 300px;
    width: 275px;
`;

const Info = styled.p`

`;

const DetailsButton = styled.button`
    width: 100%;
    background-color: #BFDE42;
    padding: 10px 20px;
    font-family: Roboto-Mono, Open Sans;
    cursor: pointer;
    border: none;
    font-weight: 600;

    :hover {
        background-color: #d2f73f;
    }
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