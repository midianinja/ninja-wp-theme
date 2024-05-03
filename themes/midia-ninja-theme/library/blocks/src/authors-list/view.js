import React from "react";
import ReactDOM from "react-dom";

import AuthorsList from './components/AuthorsList'

const containers = document.querySelectorAll(".authors-list-block__authors");

containers.forEach((container) => {

    ReactDOM.render(<AuthorsList />, container)
})
