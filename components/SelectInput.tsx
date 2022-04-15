import React, { memo, useCallback } from "react";
import styled from "styled-components";

const SearchInput = styled.select`
    width: 100%;
    font-family: Roboto-Mono, Open Sans;
    padding: 10px;
    font-size: 20px;
`;

const Option = styled.option`
`;

interface SearchInputProps {
    onSelect: (option: string) => void;
    options: string[];
}

const SelectInput = memo(({ onSelect, options = [] }: SearchInputProps) => {

    const handleSelect = useCallback((e) => {
        onSelect(e?.target?.value);
    }, [onSelect])

    return (
        <SearchInput onChange={handleSelect}>
            {
                options.map(option => (
                    <Option key={option} value={option}>{option}</Option>
                ))
            }
        </SearchInput>
    );
});

export default SelectInput;