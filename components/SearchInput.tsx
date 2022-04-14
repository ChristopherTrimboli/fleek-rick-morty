import React, { memo, useCallback } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
    width: 100%;
`;

const Input = styled.input`
    padding: 10px 20px;
    width: 100%;
    border: 2px solid #42B4CA;
    border-radius: 20px;
    outline: none;
    font-family: Roboto-Mono, Open Sans;
`;

// const SearchIcon = styled.img`
//     height: 100%;
// `;

interface SearchInputProps {
    onSearch: (query: string) => void;
}

const SearchInput = memo(({ onSearch }: SearchInputProps) => {

    const handleOnSearch = useCallback((e) => {
        onSearch(e?.target?.value);
    }, [])

    return (
        <InputContainer>
            {/* <SearchIcon /> */}
            <Input type="text" placeholder="Filter by Name" onChange={handleOnSearch} />
        </InputContainer>
    );
});

export default SearchInput;