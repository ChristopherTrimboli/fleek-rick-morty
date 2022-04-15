import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import localForage from "localforage";
import { Character, useGetCharactersQuery } from "../../api/rickMorty";
import CharacterCard from "../../components/CharacterCard";
import PaginationBar from "../../components/PaginationBar";
import SearchInput from "../../components/SearchInput";
import SelectInput from "../../components/SelectInput";

const Grid = styled.div`
    height: calc(100% - 121px); // minus nav and padding heights
    display: flex;
    flex-direction: row;

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        flex-direction: column;
        height: calc(100% - 81px); // minus nav and padding heights - mobile
    }
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

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        display: none;
    }
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
    const [characters, setCharacters] = useState<Character[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
    const [statusFilter, setStatusFilter] = useState<string>(null);
    const [genderFilter, setGenderFilter] = useState<string>(null);
    const [isPageCached, setIsPageCached] = useState<boolean>(true);
    const [maxPages, setMaxPages] = useState<number>(10);

    const {
        data: charactersData,
        isSuccess: isCharactersSuccess,
    } = useGetCharactersQuery({ page }, {
        skip: !!isPageCached
    });

    useEffect(() => {
        const getCachedCharacters = async () => {
            const cachedMaxPages: number = await localForage.getItem("characters-max-pages");
            const cachedPage: Character[] = await localForage.getItem(`characters-page-${page}`);
            setCharacters(cachedPage || []);
            setIsPageCached(!!cachedPage);
            setMaxPages(cachedMaxPages || 10);
        };
        getCachedCharacters();
    }, [page, setCharacters, setIsPageCached, setMaxPages]);

    useEffect(() => {
        const handleFetchSuccess = async () => {
            const newPage = charactersData?.results;
            const relativePage = Number(charactersData?.info?.next.split("/?page=")[1]) - 1;
            const newMaxPages = charactersData?.info?.pages;
            if (newPage && newMaxPages && relativePage) {
                setCharacters(newPage);
                setMaxPages(newMaxPages);
                await localForage.setItem(`characters-page-${relativePage}`, newPage);
                await localForage.setItem("characters-max-pages", newMaxPages);
            }
        };
        isCharactersSuccess && handleFetchSuccess();
    }, [charactersData?.results, charactersData?.info?.pages, isCharactersSuccess]);

    useEffect(() => {
        let newCharacters = characters || [];
        newCharacters = newCharacters.filter(character =>
            searchQuery ? character.name.toLowerCase().includes(searchQuery.toLowerCase()) : true &&
                statusFilter ? character.status === statusFilter : true &&
                    genderFilter ? character.gender === genderFilter : true
        );
        setFilteredCharacters(newCharacters);
    }, [characters, searchQuery, statusFilter, genderFilter, setFilteredCharacters])

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
    }, [setSearchQuery])

    const statusOptions = useMemo(() => [null, ...Array.from(new Set(characters.map((char) => char.status)))], [characters])
    const genderOptions = useMemo(() => [null, ...Array.from(new Set(characters.map((char) => char.gender)))], [characters])

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
                    maxPages={maxPages}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </ListContainer>
        </Grid>
    );
});

export default ListPage;