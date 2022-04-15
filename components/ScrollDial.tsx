import React, { memo, useCallback, RefObject } from "react";
import styled from "styled-components";

const DialCircle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    bottom: 75px;
    right: 40px;
    padding: 10px;
    font-size: 50px;
    width: 50px;
    height: 50px;
    border-radius: 100px;
    border: 1px solid black;
    background-color: #42B4CA;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    :hover {
        background-color: #31d0f0;
    }

    @media (max-width: ${props => props.theme.breakpoints.tablet}px) {
        width: 40px;
        height: 40px;
        bottom: 70px;
        right: 20px;
    }
`;

const DialArrow = styled.div`
    height: 42px;
`;

const DialSmall = styled.div`
    font-size: 11px;
`;

interface SearchInputProps {
    scrollRef: RefObject<HTMLDivElement>;
}

const ScrollDial = memo(({ scrollRef }: SearchInputProps) => {

    const handleScroll = useCallback(() => {
        console.log(scrollRef.current)
        scrollRef.current.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [scrollRef]);

    return (
        <DialCircle onClick={handleScroll}>
            <DialArrow>^</DialArrow>
            <DialSmall>TOP</DialSmall>
        </DialCircle>
    );
});

export default ScrollDial;