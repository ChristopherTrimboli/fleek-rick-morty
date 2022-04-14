import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetCharactersQuery } from "../../api/rickMorty";
import CharacterCard from "../../components/CharacterCard";

const ListContainer = styled.div`
    height: calc(100% - 121px); // minus nav and padding heights
    width: 100%;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

const ListPage = memo(() => {
    const [page, setPage] = useState<number>(1);

    const {
        data: charactersData,
        isSuccess: charactersIsSuccess,
    } = useGetCharactersQuery({ page });

    useEffect(() => {
        if (charactersIsSuccess) {
            setPage(oldPage => oldPage++);
        }
    }, [charactersIsSuccess])

    return (
        <ListContainer>
            {
                charactersData?.results?.map((character, index) =>
                    <CharacterCard
                        key={index}
                        characterId={character.id}
                        imageUrl={character.image}
                        name={character.name}
                        species={character.species}
                        status={character.status}
                    />
                )
            }
        </ListContainer>
    );
});

export default ListPage;