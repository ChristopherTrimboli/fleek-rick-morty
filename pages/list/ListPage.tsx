import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetCharactersQuery } from "../../api/rickMorty";
import CharacterCard from "../../components/CharacterCard";

const Grid = styled.div`
    height: calc(100% - 121px); // minus nav and padding heights
    display: flex;
    flex-direction: row;
`;

const FiltersContainer = styled.div`
    height: 100%;
    min-width: 200px;
    width: 350px;
    max-width: 700px;
    resize: horizontal;
    border-right: 1px solid grey;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    font-family: Roboto-Mono, Open Sans;
`;

const ListContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    font-family: Roboto-Mono, Open Sans;
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
        <Grid>
            <FiltersContainer>

            </FiltersContainer>
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
        </Grid>
    );
});

export default ListPage;