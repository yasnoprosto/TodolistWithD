import React from "react";
import "./index.css";
import {createRoot} from "react-dom/client";
import AppWithReducers from "./AppWithReducers";
import {Provider} from "react-redux";
import {store} from "./state/store";
import AppWithRedux from "./AppWithRedux";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<Provider store={store}>
        <AppWithRedux/>
    </Provider>
);

