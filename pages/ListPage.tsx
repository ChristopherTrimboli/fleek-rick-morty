import React, { memo } from "react";
import styled from "styled-components";

const ListContainer = styled.div`
    height: 100%;
    width: 100%;
`;

const ListPage = memo(() => {
    return (
        <ListContainer>
            <p>List</p>
        </ListContainer>
    );
});

export default ListPage;