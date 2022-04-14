import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetCharactersQuery } from "../api/rickMorty";

const ListContainer = styled.div`
    height: 100%;
    width: 100%;
`;

const ListPage = memo(() => {
    const [page, setPage] = useState(1);

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
            <p>List</p>
        </ListContainer>
    );
});

export default ListPage;