# AGENTS.md

## Project overview

This is the source repository for [gitforwindows.org](https://gitforwindows.org),
the homepage of the [Git for Windows](https://github.com/git-for-windows/git)
project. It is a static site built with [Hugo](https://gohugo.io/) (extended
edition) and served via GitHub Pages with a custom domain. The default branch
is `main`.

## Repository structure

- `layouts/` — Hugo templates (`_default/baseof.html` is the main skeleton)
- `layouts/partials/` — Reusable template fragments (header, footer)
- `layouts/shortcodes/` — Custom shortcodes (e.g. the sitemap generator)
- `layouts/redirect/` — Layout for pages that redirect to external URLs
- `content/` — Page content in Markdown with Hugo front matter; `_index.md` is
  the homepage
- `assets/sass/` — SCSS stylesheets compiled by Hugo; `pack.scss` is the entry
  point that imports `baguetteBox.min`, `normalize`, `style`, and `small`
- `assets/js/` — JavaScript assets (baguetteBox lightbox library for the image
  gallery on the homepage)
- `static/` — Static assets (favicon, images) served as-is
- `hugo.yml` — Hugo configuration; also the source of truth for the pinned
  Hugo version (`hugo_version`) and the current Git for Windows release
  metadata (`version`, `tag_name`, `publish_date`, `url`)
- `bump-version.js` — Node.js script to update the release version in
  `hugo.yml`, either from command-line arguments or by querying the GitHub API
  (`--auto` mode). This script is not intended to be called by humans; it is
  invoked by the Git for Windows release automation (see "Version update
  mechanism" below).
- `create-screenshot-thumbnails.js` — Node.js script using `jimp` to generate
  thumbnail images from screenshots in `static/img/`

## Sister sites

This site shares its Hugo-based architecture with two sibling projects:

- [git-scm.com](https://git-scm.com) (repo:
  [git/git-scm.com](https://github.com/git/git-scm.com)) — the official Git
  homepage, also Hugo-based. This was the principal effort that pioneered the
  conversion from a Rails app to Hugo
  ([PR #1804](https://github.com/git/git-scm.com/pull/1804), opened October
  2023, merged September 2024). Learnings from that conversion were
  subsequently applied to the smaller sites.
- [gitgitgadget.github.io](https://gitgitgadget.github.io) (repo:
  [gitgitgadget/gitgitgadget.github.io](https://github.com/gitgitgadget/gitgitgadget.github.io))
  — the GitGitGadget homepage, converted to Hugo in March 2025
  ([PR #23](https://github.com/gitgitgadget/gitgitgadget.github.io/pull/23)).
  That conversion was inspired by the git-scm.com work and was also
  explicitly intended as a blueprint for this site's own migration.

This site was converted to Hugo immediately after the GitGitGadget site, in
March 2025 ([PR #56](https://github.com/git-for-windows/git-for-windows.github.io/pull/56)).
A major motivation for the conversion was to retire the GitHub wiki that had
previously hosted much of this content. The wiki attracted far more spam
than genuine contributions, and the signal-to-noise ratio made it
unmaintainable. By moving the wiki content into this Hugo-based repository,
contributions now go through pull requests — which is somewhat more
exclusive than a wiki, but ensures proper review and documentation of
changes.

Cross-pollination between these sites is ongoing and intentional. For example,
Graphviz diagram rendering was implemented in parallel on git-scm.com
([PR #2052](https://github.com/git/git-scm.com/pull/2052)) and
gitgitgadget.github.io. Future work — such as implementing client-side search
on gitforwindows.org — will likely be modeled after the
[Pagefind](https://pagefind.app/)-based search already in use on git-scm.com.
Similarly, git-scm.com has a [Playwright](https://playwright.dev/)-based test
suite for UI verification; if the need for UI tests arises here, that test
suite should serve as a starting point. When working on features here,
checking the sister sites for prior art and reusable patterns is strongly
encouraged.

## Building the site

The site requires Hugo Extended. The pinned version is in `hugo.yml` under
`params.hugo_version`.

```sh
hugo          # build into public/
hugo serve    # local dev server with live reload
```

There is no `npm install` step required for building. The `package.json`-era
build system (Grunt) was retired when the site was converted to Hugo.

## GitHub Actions workflows

- `.github/workflows/deploy.yml` — Deploys to GitHub Pages on every push to
  `main`. Reads the Hugo version from `hugo.yml`, installs it, runs
  `hugo --minify`, and deploys via `actions/deploy-pages`.
- `.github/workflows/pr.yml` — Builds the site on pull requests as a smoke
  test and uploads the result as an artifact for preview.

## Page types and output formats

### Regular pages

Most content pages are Markdown files under `content/` that render to
`*.html`. The `single.html` layout applies light post-processing: it
transforms `[!IMPORTANT]` admonitions into styled `<p>` tags and adds anchor
links to headings.

### The homepage

`content/_index.md` is the homepage. It uses a different layout path
(`index.html`) and includes the header partial with the download button, logo,
and version badge. The `baseof.html` template conditionally includes the
header (homepage only) or footer (other pages) at the top of the page.

### Download URLs and version files

Several content pages use custom Hugo output formats to generate
machine-readable endpoints consumed by external tools and automation:

- `latest-*-installer.html`, `latest-*-portable-git.html`,
  `latest-*-mingit.html` — Rendered via the `.url` output format
  (`single.url.url`). Each produces a plain URL pointing to the corresponding
  release asset on GitHub, constructed from `tag_name`, `version`, and
  per-page `prefix`/`suffix` front-matter parameters.
- `latest-tag.html`, `latest-version.html` — Rendered via the `.latest.txt`
  output format (`single.latest.txt`). Emit the current tag name or version
  string as plain text.

### Redirect pages

Pages with `type: redirect` in their front matter (e.g. `snapshots.md`,
`snaps.md`) use `layouts/redirect/single.html` to emit a
`<meta http-equiv="refresh">` redirect to the URL specified in
`redirect_to`.

### Sitemap

`content/sitemap.md` uses the `sitemap.html` shortcode to generate an
auto-populated list of all pages with titles.

## Version update mechanism

The current Git for Windows version is stored in `hugo.yml` under `params`
(`version`, `tag_name`, `publish_date`, `url`). This is updated by:

1. The `bump-version.js` script, which can be run manually or with `--auto` to
   query the GitHub API for the latest release.
2. The [`release-git.yml` workflow](https://github.com/git-for-windows/git-for-windows-automation/blob/main/.github/workflows/release-git.yml)
   in the `git-for-windows-automation` repository, which pushes version
   updates to this site as part of the Git for Windows release process.

## CSS / styling

Stylesheets live in `assets/sass/`. Key files:

- `pack.scss` — Entry point that imports all other stylesheets.
- `normalize.scss` — CSS reset/normalization.
- `style.scss` — Main styles: typography (Open Sans), colors, layout (header,
  footer, content sections, `.content` containers, the homepage feature
  section, image gallery, contribute section).
- `small.scss` — Responsive breakpoints for smaller screens.
- `baguetteBox.min.scss` — Styles for the baguetteBox lightbox (image gallery
  on the homepage).

## JavaScript

The site uses minimal client-side JavaScript:

- **baguetteBox** (`assets/js/baguetteBox.min.js`) — Lightbox library for the
  screenshot gallery on the homepage.
- **Inline script in `baseof.html`** — On the homepage, detects the visitor's
  platform architecture via `navigator.userAgentData.getHighEntropyValues()`
  and rewrites the download button URL to point directly to the appropriate
  installer (64-bit or ARM64) instead of the generic releases page.

## Content conventions

- Content pages are Markdown files with YAML front matter.
- Page titles are set via `title:` in front matter.
- The `aliases:` front matter field provides alternative URL paths (used by
  the wiki migration; e.g. `faq.md` has `aliases: ["FAQ"]`).
- GitHub-style `[!IMPORTANT]` admonitions are supported and rendered with
  special styling.
- Internal links between pages use relative `.html` URLs (e.g.
  `./faq.html`) because `uglyURLs: true` and `relativeURLs: true` are set
  in `hugo.yml`.

## Relationship with other Git for Windows repositories

This website is part of a larger ecosystem:

- [git-for-windows/git](https://github.com/git-for-windows/git) — The main
  Git for Windows fork. See its `ARCHITECTURE.md` for a comprehensive
  overview of the project's structure and release process.
- [git-for-windows/git-for-windows-automation](https://github.com/git-for-windows/git-for-windows-automation)
  — GitHub workflows that automate releases, including pushing version
  updates to this website. See its `AGENTS.md` for details.
- [git-for-windows/build-extra](https://github.com/git-for-windows/build-extra)
  — Build infrastructure, release notes, installer definitions.

## URL stability and redirects

Existing URLs must remain functional. Many pages are linked from external
sites, documentation, Stack Overflow answers, and similar. If a page is
renamed or moved, always add the old URL to the `aliases:` list in the page's
front matter so that Hugo generates a redirect at the old location.

The `layouts/redirect/single.html` template (used for external redirects like
`/snapshots`) goes a step further: it uses JavaScript to preserve query
strings and URL fragments (anchors) via `window.location.search` and
`window.location.hash`, a pattern pioneered on git-scm.com. The same
JavaScript enhancement is applied to Hugo's alias redirects via a custom
`layouts/alias.html` (also adopted from git-scm.com), so aliases generated
from `aliases:` front matter preserve query strings and anchors too.

## Validating changes

This repository has no test suite beyond the Hugo build. When making changes,
validate by:

1. Running `hugo` locally and checking that the build succeeds without errors.
2. Inspecting the generated `public/` directory to verify output.
3. For layout or style changes, running `hugo serve` and visually checking
   the homepage and at least one content page (e.g. `/faq.html`).
4. Opening a pull request — the `pr.yml` workflow will build the site and
   upload the result as an artifact.

## Commit message conventions

- No bullet points; use flowing prose.
- Focus on context, intent, and justification — not what is obvious from the
  diff.
- Trailers in this order: `Assisted-by:` (if applicable), then
  `Signed-off-by:`. Use `--trailer` flags (not `-s`) to control ordering.
- The `Assisted-by:` trailer names the AI **model** that assisted, not the
  product or platform (e.g. `Assisted-by: Claude Opus 4.6`, not
  `Assisted-by: Copilot` or `Assisted-by: Claude Code`).
