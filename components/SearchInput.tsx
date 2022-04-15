import React, { memo, useCallback } from "react";
import styled from "styled-components";

const Input = styled.input`
    padding: 10px 20px;
    width: 100%;
    border: 2px solid #42B4CA;
    border-radius: 50px;
    font-size: 20px;
`;

interface SearchInputProps {
    onSearch: (query: string) => void;
}

const SearchInput = memo(({ onSearch }: SearchInputProps) => {

    const handleOnSearch = useCallback((e) => {
        onSearch(e?.target?.value);
    }, [onSearch])

    return <Input type="text" placeholder="Filter by Name" onChange={handleOnSearch} />;
});

export default SearchInput;