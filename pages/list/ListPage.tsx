import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Character, useGetCharactersQuery } from "../../api/rickMorty";
import CharacterCard from "../../components/CharacterCard";
import SearchInput from "../../components/SearchInput";

const Grid = styled.div`
    height: calc(100% - 121px); // minus nav and padding heights
    display: flex;
    flex-direction: row;
`;

const FiltersContainer = styled.div`
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
    padding: 20px 15px;
`;

const ListContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    font-family: Roboto-Mono, Open Sans;
`;

const ListPage = memo(() => {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

    const {
        data: charactersData,
        isSuccess: charactersIsSuccess,
    } = useGetCharactersQuery({ page });

    useEffect(() => {
        if (charactersIsSuccess) {
            setPage(oldPage => oldPage++);
        }
    }, [charactersIsSuccess])

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
    }, [])

    useEffect(() => {
        let newCharacters = charactersData?.results || [];
        if (searchQuery && newCharacters) {
            newCharacters = newCharacters.filter(character => character.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setFilteredCharacters(newCharacters);
    }, [searchQuery, charactersData?.results])

    return (
        <Grid>
            <FiltersContainer>
                <SearchInput onSearch={handleSearch} />
            </FiltersContainer>
            <ListContainer>
                {
                    filteredCharacters.map((character, index) =>
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