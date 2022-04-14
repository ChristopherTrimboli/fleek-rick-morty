import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import ListPage from "./pages/list/ListPage";
import CharacterPage from "./pages/character/CharacterPage";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <Navbar />
                    <Routes>
                        <Route path="/character/:characterId" element={<CharacterPage />} />
                        <Route path="/" element={<ListPage />} />
                    </Routes>
                </ThemeProvider>
            </HashRouter>
        </Provider>
    );
}

createRoot(document.getElementById("react-container")).render(<App />);