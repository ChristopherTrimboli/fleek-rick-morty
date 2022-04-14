import React from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

function App() {
    return (
        <Provider store={store}>
            <HashRouter>
                <ThemeProvider theme={theme}>
                    <h1>Hello World</h1>
                </ThemeProvider>
            </HashRouter>
        </Provider>
    );
}

createRoot(document.getElementById("react-container")).render(<App />);