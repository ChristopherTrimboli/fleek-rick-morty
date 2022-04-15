import React, { memo, ReactNode, useState } from "react";
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
    tabs: string[];
    tabsContent: ReactNode[];
}

const Tabs = memo(({ tabs, tabsContent }: TabsProps) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    return (
        <TabsContainer>
            <TabsBar>
                {
                    tabs.map((tab, index) => (
                        <Tab key={index} $isActive={index === selectedTab} onClick={() => setSelectedTab(index)}>
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