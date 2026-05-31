# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

This repository hosts a personal academic homepage based on AcadHomepage and Jekyll. It is intended to be published with GitHub Pages from the `main` branch.

Primary content and configuration live in:

- `_pages/about.md`: homepage content, including News, Publications, Honors, Competitions, and Education.
- `_config.yml`: site metadata, author profile, plugins, Jekyll settings, and excluded paths.
- `_data/navigation.yml`: top navigation links.
- `images/`: site images and publication figures.
- `_sass/`, `assets/`, `_includes/`, `_layouts/`: theme, styles, scripts, and templates.

Generated output and local-only files should not be edited directly.

## Common Commands

Install dependencies:

```bash
bundle install
```

If Bundler is missing or the lockfile requires a specific version:

```bash
gem install bundler:2.2.19
```

Build the site:

```bash
bundle exec jekyll build
```

Run the local live-reload server:

```bash
bash run_server.sh
```

The local site normally serves at:

```text
http://127.0.0.1:4000
```

## Editing Guidelines

- Keep content edits focused and minimal.
- Prefer editing `_pages/about.md` for homepage content updates.
- Preserve the existing reverse-chronological order in sections such as News, Honors, and Competitions.
- Match existing English phrasing, Markdown style, emoji usage, date format, and spacing.
- Use dates in `YYYY.MM` format for dated list entries unless the surrounding section uses a different format.
- Keep publication entries consistent with the existing HTML + Markdown structure.
- Add publication images under `images/publications/` and reference them with relative paths already used by the page.
- Do not edit files under `_site/`; it is generated output.
- Do not commit local system files such as `.DS_Store`.
- Do not make broad theme or layout changes unless the task explicitly asks for them.

## Validation

For Markdown-only content changes, run:

```bash
git diff --check
```

For site or template changes, also run:

```bash
bundle exec jekyll build
```

When a visual/layout change is made, run the local server and inspect the relevant page in a browser.

## Git Workflow

- Check the worktree before making changes:

```bash
git status --short --branch
```

- Do not revert or overwrite user changes unless explicitly requested.
- Commit only the files related to the current task.
- Push only when the user asks for it.

### Commit Message Guidelines

Use concise English commit messages that describe the user-visible change. Match the lightweight GitHub style common in Jekyll and academic homepage repositories.

Preferred format:

```text
<type>: <imperative summary>
```

Use these types:

- `add`: new homepage content, publication entries, awards, links, or images.
- `update`: revisions to existing content, metadata, wording, or links.
- `fix`: corrections for typos, broken links, formatting bugs, or wrong facts.
- `docs`: README, AGENTS, or other documentation-only changes.
- `style`: CSS, layout, spacing, or visual refinements.
- `build`: Jekyll, GitHub Pages, dependencies, or workflow changes.
- `chore`: maintenance that is not directly visible on the site.
- `remove`: deleting obsolete, placeholder, or local-only content.

Subject rules:

- Use imperative mood after the type, for example `fix: correct award title`.
- Keep the subject short: aim for 50 characters, hard limit 72.
- Use lowercase after the colon unless the word is a proper noun.
- Do not end the subject with a period.
- Avoid vague messages such as `update`, `misc`, `changes`, or `wip`.
- Avoid repeating the type as the first word, such as `add: add paper link`.
- Use a body only when the reason or context is not obvious from the diff.

Good examples for this repository:

```text
add: ICASSP 2026 publication link
update: homepage news wording
fix: competition award title
docs: clarify agent commit guidance
style: tighten publication spacing
build: update GitHub Pages workflow
chore: ignore local agent files
remove: placeholder Scholar link
```

## Repository Notes

- `_config.yml` excludes several development and source files from the generated site.
- `google_scholar_crawler/` is for citation automation and should be changed only for citation workflow tasks.
- `.github/workflows/` may affect GitHub Pages deployment and citation updates; edit with care.
- This site uses GitHub Pages-compatible Jekyll plugins through the `github-pages` gem.
