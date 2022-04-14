import React, { memo } from "react";
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

`;

interface CharacterCardProps {
    imageUrl: string;
    name: string;
    species: string;
    status: string;
}

const CharacterCard = memo(({ imageUrl, name, species, status }: CharacterCardProps) => {
    return (
        <CardContainer>
            <Image src={imageUrl} />
            <Info>{name}</Info>
            <Info>{species}</Info>
            <Info>{status}</Info>
            <DetailsButton>Details</DetailsButton>
        </CardContainer>
    );
});

export default CharacterCard;