require('file-loader?name=[name].[ext]!./index.html');
import "./index.scss";
import React from "react";
import {createRoot} from "react-dom/client";    // React 18
import { App } from "./App";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);   // React 18