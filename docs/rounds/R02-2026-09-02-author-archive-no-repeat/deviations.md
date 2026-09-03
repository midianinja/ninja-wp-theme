# Deviations — R02 / Author archive no-repeat

## 1. Banner rendering required explicit `$GLOBALS['post']` assignment

- **Planned:** in `author.php`, call `setup_postdata( $ninja_author_featured_post )` to render the excluded featured post as the banner.
- **Implemented:** before `setup_postdata()`, explicitly set `$GLOBALS['post'] = $ninja_author_featured_post;`.
- **Reason:** local functional test with WordPress 6.4 showed that `setup_postdata()` does not update `$GLOBALS['post']` in the current core version. Without the global assignment, template tags such as `the_title()` and `get_the_ID()` fall back to the first post of the modified main query, causing the banner to display the grid's first post and therefore duplicate it in the grid.
- **Decision registered at:** PR #311 and round task message (apply fix + re-run local tests).
- **Reference document updated:** N/A — behavior was already described in #238; implementation corrected in commit `8af42c30` and PR #311.

## 2. Featured lookup rebuilt with explicit args + active filters (Co-Authors Plus)

- **Planned:** build the featured-post lookup by copying the main query vars into `get_posts()` (which defaults to `suppress_filters => true`).
- **Implemented:** build the lookup query explicitly (author/author_name, post_type, tax_query) with `suppress_filters => false`, so Co-Authors Plus applies the same author-taxonomy resolution used by the grid.
- **Reason:** validation on the local environment showed the same banner post on every author archive. With filters suppressed, CAP's `posts_join/posts_where` never ran; guest authors (no WP user) degenerated the query to `post_author = 0`, the lookup returned nothing, no exclusion was applied, and `author.php` fell back to whatever global post remained (the site's latest post). WP users also missed co-authored-only posts.
- **Decision registered at:** https://github.com/midianinja/ninja-wp-theme/issues/238 (validation failure reported by user: same featured post on all author archives; fix committed as `5f014ae1`).
- **Reference document updated:** N/A — behavior unchanged from #238; implementation corrected in commit `5f014ae1`.

## 3. APO bypass extended to author archives

- **Planned:** Cloudflare APO bypass only on the blog home (`is_home()`), inherited from #238.
- **Implemented:** bypass also on author archives (`is_author()`).
- **Reason:** human decision during validation ("qual o benefício e risco dessa paridade?" → "aplica") — eliminates stale featured post on author archives when published posts are edited (no status transition, hence no purge), at the cost of edge offload for low-traffic pages, mitigated by W3TC origin cache.
- **Decision registered at:** conversation with user on 2026-09-03 (benefit/risk question, answer "aplica").
- **Reference document updated:** N/A — cache behavior inherited from #238 round (PR #310); change in this round's PR.
