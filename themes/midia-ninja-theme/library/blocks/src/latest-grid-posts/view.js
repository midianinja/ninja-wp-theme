import React from "react";
import ReactDOM from "react-dom";

import LatestGridPosts from './components/LatestGridPosts'

const containers = document.querySelectorAll(".latest-grid-posts-block__content");

containers.forEach((container) => {
    const maxPosts    = container.getAttribute('data-max-posts')
    const perPage     = container.getAttribute('data-per-page')
    const postType    = container.getAttribute('data-post-type')
    const taxonomy    = container.getAttribute('data-taxonomy')
    const terms       = container.getAttribute('data-terms')
    const showAuthor  = container.getAttribute('data-show-author') ? true : false
    const showDate    = container.getAttribute('data-show-date') ? true : false
    const showExcerpt = container.getAttribute('data-show-excerpt') ? true : false

    ReactDOM.render(
        <LatestGridPosts
            maxPosts={maxPosts}
            perPage={perPage}
            postType={postType}
            taxonomy={taxonomy}
            terms={terms}
            showAuthor={showAuthor}
            showDate={showDate}
            showExcerpt={showExcerpt}
        />,
        container
    )
})
