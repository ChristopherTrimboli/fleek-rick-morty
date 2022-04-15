import React, { memo, ReactNode, useCallback } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
    width: 100%;
`;

const TabsBar = styled.div`
    width: 100%;
    display: flex;
`;

const Tab = styled.div<{ $isActive?: boolean }>`
    width: 100%;
    max-width: 300px;
    background-color: ${({ $isActive }) => $isActive ? "#42B4CA" : "transparent"};
    border: 2px solid #42B4CA;
    padding: 20px 10px;
    border-radius: 20px 20px 0px 0px;
    font-size: 24px;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    :hover {
        background-color: #42B4CA;
    }
`;

const TabContent = styled.div`
    width: 100%;
`;

interface TabsProps {
    selectedTab: number;
    tabTitles: string[];
    tabsContent: ReactNode;
    onTabChange: (tabIndex: number) => void;
}

const Tabs = memo(({ selectedTab, tabTitles, tabsContent, onTabChange }: TabsProps) => {

    const handleTabChange = useCallback((index: number) => {
        onTabChange(index);
    }, [selectedTab, onTabChange]);

    return (
        <TabsContainer>
            <TabsBar>
                {
                    tabTitles.map((tab, index) => (
                        <Tab key={index} $isActive={index === selectedTab} onClick={() => handleTabChange(index)}>
                            {tab}
                        </Tab>
                    ))
                }
            </TabsBar>
            <TabContent>
                {tabsContent[selectedTab]}
            </TabContent>
        </TabsContainer>
    );
});

export default Tabs;