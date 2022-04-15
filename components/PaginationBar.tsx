import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const BarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    border-top: solid 1px grey;
`;

const BarTab = styled.div<{ $isActive?: boolean, $isDisabled?: boolean }>`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #42B4CA;
    font-size: 25px;
    font-weight: 600;
    cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
    background-color: ${({ $isActive, $isDisabled }) => {
        if ($isDisabled) {
            return "#222222";
        }
        if ($isActive) {
            return "#42B4CA";
        }
        return "transparent";
    }};

    :hover {
        background-color: #252525;
    }

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        font-size: 20px;
    }
`;

const LeftArrow = styled(BarTab)`
    
`;

const RightArrow = styled(BarTab)`

`;

interface PaginationBarProps {
    currentPage: number;
    maxPages: number;
    onPageChange: (page: number) => void;
}

const pageAmount = 9;

const PaginationBar = memo(({ currentPage, maxPages, onPageChange }: PaginationBarProps) => {
    const [pageRange, setPageRange] = useState<number[]>([1, pageAmount]);
    const [pages, setPages] = useState<number[]>([]);

    const handlePrevious = useCallback(() => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }, [onPageChange, currentPage])

    const handleNext = useCallback(() => {
        if (currentPage < maxPages) {
            onPageChange(currentPage + 1);
        }
    }, [onPageChange, currentPage, maxPages])

    useEffect(() => {
        const newPages = [];
        for (let i = pageRange[0]; i <= pageRange[1]; i++) {
            newPages.push(i);
        }
        setPages(newPages);
    }, [setPages, pageRange])

    useEffect(() => {
        if (currentPage >= pageRange[1]) {
            const attemptedMax = currentPage + pageAmount;
            const newMax = attemptedMax <= maxPages ? attemptedMax : maxPages;
            setPageRange([currentPage, newMax]);
        }
        if (currentPage <= pageRange[0]) {
            const newMin = currentPage - pageAmount;
            const newMax = currentPage < pageAmount ? pageAmount : currentPage;
            setPageRange([newMin >= 1 ? newMin : 1, newMax]);
        }
    }, [currentPage, maxPages, setPageRange])

    return (
        <BarContainer>
            <LeftArrow onClick={handlePrevious} $isDisabled={currentPage === 1}>{"<"}</LeftArrow>
            {
                pages.map((page, index) =>
                    <BarTab
                        key={index}
                        $isActive={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </BarTab>
                )
            }
            <RightArrow onClick={handleNext} $isDisabled={currentPage === maxPages}>{">"}</RightArrow>
        </BarContainer>
    );
});

export default PaginationBar;