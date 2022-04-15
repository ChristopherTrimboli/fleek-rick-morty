import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Character, useGetCharactersQuery } from "../../api/rickMorty";
import CharacterCard from "../../components/CharacterCard";
import PaginationBar from "../../components/PaginationBar";
import SearchInput from "../../components/SearchInput";
import SelectInput from "../../components/SelectInput";

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
    font-family: Roboto-Mono, Open Sans;
    padding: 20px 15px;
`;

const ListContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const CharacterCards = styled.div`
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
    const [statusFilter, setStatusFilter] = useState<string>(null);
    const [genderFilter, setGenderFilter] = useState<string>(null);

    const {
        data: charactersData
    } = useGetCharactersQuery({ page });

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
    }, [setSearchQuery])

    useEffect(() => {
        let newCharacters = charactersData?.results || [];
        if (newCharacters) {
            newCharacters = newCharacters.filter(character =>
                searchQuery ? character.name.toLowerCase().includes(searchQuery.toLowerCase()) : true &&
                    statusFilter ? character.status === statusFilter : true &&
                        genderFilter ? character.gender === genderFilter : true
            );
        }
        setFilteredCharacters(newCharacters);
    }, [searchQuery, charactersData?.results, setFilteredCharacters, statusFilter, genderFilter])

    const statusOptions = useMemo(() => [null, ...Array.from(new Set(filteredCharacters.map((char) => char.status)))], [filteredCharacters])
    const genderOptions = useMemo(() => [null, ...Array.from(new Set(filteredCharacters.map((char) => char.gender)))], [filteredCharacters])

    return (
        <Grid>
            <FiltersContainer>
                <SearchInput onSearch={handleSearch} />
                <br />
                <h4>Status</h4>
                <SelectInput onSelect={option => setStatusFilter(option)} options={statusOptions} />
                <br />
                <h4>Gender</h4>
                <SelectInput onSelect={option => setGenderFilter(option)} options={genderOptions} />
            </FiltersContainer>
            <ListContainer>
                <CharacterCards>
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
                </CharacterCards>
                <PaginationBar
                    currentPage={page}
                    maxPages={charactersData?.info?.pages || 10}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </ListContainer>
        </Grid>
    );
});

export default ListPage;