# Scope — R02 / Author archive no-repeat

Epic: #238 (increment — author archive page)

## What this round delivers

Fix the author archive template so the featured post (banner) does not repeat in the posts grid below it, mirroring the no-repeat rule already applied to other archives.

## Changed behavior

- On `/author/<slug>/`, the first post of the main query is excluded from the grid query (`post__not_in`).
- The excluded post is rendered as the featured banner at the top of the page.
- Pagination/count preserved: no post vanishes, remaining posts shift correctly across pages.

## Not in scope

- Re-architecting the archive grid system.
- Applying the rule to guest-author archives (`taxonomy-autor.php`) or other archive types beyond `is_author()`.
- Cache invalidation logic (handled separately in #238).

## Files expected to change

- `themes/midia-ninja-theme/library/utils.php`
- `themes/midia-ninja-theme/author.php`
