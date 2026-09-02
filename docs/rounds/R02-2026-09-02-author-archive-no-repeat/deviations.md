# Deviations — R02 / Author archive no-repeat

## 1. Banner rendering required explicit `$GLOBALS['post']` assignment

- **Planned:** in `author.php`, call `setup_postdata( $ninja_author_featured_post )` to render the excluded featured post as the banner.
- **Implemented:** before `setup_postdata()`, explicitly set `$GLOBALS['post'] = $ninja_author_featured_post;`.
- **Reason:** local functional test with WordPress 6.4 showed that `setup_postdata()` does not update `$GLOBALS['post']` in the current core version. Without the global assignment, template tags such as `the_title()` and `get_the_ID()` fall back to the first post of the modified main query, causing the banner to display the grid's first post and therefore duplicate it in the grid.
- **Decision registered at:** PR #311 and round task message (apply fix + re-run local tests).
- **Reference document updated:** N/A — behavior was already described in #238; implementation corrected in commit `8af42c30` and PR #311.
