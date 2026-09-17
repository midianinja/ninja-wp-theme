---
name: zip-validation
description: Use ONLY when generating a distribution ZIP of a WordPress theme or plugin. Enforces validation that runtime assets and dependencies excluded by .gitignore are present before the ZIP is delivered.
---

# ZIP Distribution Validation

When asked to generate a distribution ZIP of a WordPress theme or plugin, **NEVER** rely solely on `git archive` or on files tracked by Git. WordPress themes and plugins often require compiled assets and Composer dependencies that are listed in `.gitignore` but are mandatory at runtime.

## Pre-delivery checklist (mandatory)

Before declaring a ZIP ready, verify that the archive contains at least the following runtime-critical paths, when they exist in the source tree:

1. **`vendor/`** — required when the theme/plugin uses Composer autoload (`vendor/autoload.php`).
2. **`dist/`** — required when the theme/plugin ships compiled CSS/JS assets.
3. **`library/blocks/build/`** or any other **`build/`** directory — required when the theme/plugin registers compiled blocks.
4. Any other compiled/installed directory referenced by `require`, `include`, `wp_register_style`, `wp_register_script`, `register_block_type`, or `get_template_directory()`.

## Allowed generation methods

Prefer one of these approaches:

- Use the project's own build script (e.g., `dev-scripts/zip.sh`) if it is known to include compiled assets.
- Run the full build pipeline (`composer install`, `npm run production`, `npm run build`) in a clean worktree and then pack the resulting directory with `zip -r`, explicitly including the paths above.
- If using `git archive`, copy or append the ignored runtime directories into the archive afterwards and verify their presence.

## Verification step (mandatory)

After creating the ZIP, list its contents and confirm:

- `vendor/autoload.php` exists (when Composer is used).
- Key files under `dist/` and `library/blocks/build/` (or equivalent) exist.
- No `node_modules/` or build-tool-only files are included.

If any runtime-critical path is missing, regenerate the ZIP. **Do not deliver a ZIP that fails this verification.**

## Communication

If the user is waiting for a ZIP, report the verification results explicitly: which runtime directories were confirmed present and the final archive size.