import React from "react";
import ReactDOM from "react-dom";
import EmailDialog from "./components/EmailDialog";

window.EmailDialog = function (containerId, borderName) {
    ReactDOM.render(<EmailDialog borderName={borderName}/>, document.getElementById(containerId));
};

