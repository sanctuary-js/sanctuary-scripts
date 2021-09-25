# sanctuary-scripts

Shell scripts used in multiple Sanctuary projects. Many scripts are also
compatible with non-Sanctuary projects.

Each script is referenced in the `"bin"` field of __package.json__,
and symlink names are `sanctuary-`-prefixed to avoid collisions.
To use `generate-readme`, for example, one would use the path
__node\_modules/.bin/sanctuary-generate-readme__ (or simply
__sanctuary-generate-readme__ when using npm scripts).

## Installation

1.  Add `sanctuary-scripts` to `"devDependencies"` in __package.json__.

2.  Define the following `"scripts"` in __package.json__:

    ```json
    {
      "scripts": {
        "doctest": "sanctuary-doctest",
        "lint": "sanctuary-lint",
        "release": "sanctuary-release",
        "test": "npm run lint && sanctuary-test && npm run doctest"
      }
    }
    ```

3.  Add a file named __.config__ in the project's root directory, with
    suitable `repo-owner` and `repo-name` values. For example:

    ```text
    repo-owner = sanctuary-js
    repo-name = sanctuary-type-classes
    ```

4.  Add a file named __.eslintrc.json__ in the project's root directory,
    with the following JSON configuration:

    ```json
    {
      "root": true,
      "extends": ["./node_modules/sanctuary-style/eslint-es3.json"]
    }
    ```

    Change `es3` to `es6` if desired.

## Usage

### `npm test`

Runs [`lint`][], [`test`][], and [`doctest`][].

### `npm run lint`

Runs [`lint`][] only.

### `npm run doctest`

Runs [`doctest`][] only.

### `npm run release <increment>`

Runs [`release`][] with the specified increment (`major`, `minor`, `patch`,
`premajor`, `preminor`, `prepatch`, or `prerelease`).

## Configuration

There are two layers of configuration available: [variables][] and
[custom scripts][].

### Variables

Certain variables may be specified in a file named __.config__ in the project's
root directory. Each line in the file should be a `${name} = ${value}` pair.
For example:

    repo-owner = sanctuary-js
    repo-name = sanctuary-type-classes

Many variables have default values and are therefore optional.

| Variable name                 | Default value         | Description                                                                   |
| ----------------------------- | --------------------- | ----------------------------------------------------------------------------- |
| `repo-owner`                  |                       | The name of the GitHub user or organization who owns the repository.          |
| `repo-name`                   |                       | The name of the GitHub repository.                                            |
| `default-branch`              | `master`              | The name of the repository's default branch.                                  |
| `min-branch-coverage`         | `100`                 | The minimum acceptable branch coverage (as a percentage).                     |
| `author-name`                 | `Sanctuary`           | The name of the individual or group to whom copyright should be attributed.   |
| `contributing-file`           | `CONTRIBUTING.md`     | The name of the CONTRIBUTING file.                                            |
| `license-file`                | `LICENSE`             | The name of the licence file.                                                 |
| `source-files`                | `index.js`            | Space-separated list of filenames. Globbing is supported (with `globstar`).   |
| `readme-source-files`         | `index.js`            | Space-separated list of filenames. Globbing is supported (with `globstar`).   |
| `heading-level`               | `4`                   | The `<h[1-6]>` level of headings transcribed from `heading-prefix` comments.  |
| `heading-prefix`              | `#`                   | The character which follows `//` to signify a heading to transcribe.          |
| `comment-prefix`              | `.`                   | The character which follows `//` to signify documentation to transcribe.      |
| `opening-delimiter`           | `` ```javascript ``   | The opening delimiter of doctest blocks in the source files.                  |
| `closing-delimiter`           | `` ``` ``             | The closing delimiter of doctest blocks in the source files.                  |
| `module-type`                 | `commonjs`            | The module system doctest should use (`amd`, `commonjs`, or `esm`).           |
| `version-tag-prefix`          | `v`                   | The prefix of annotated version tags (`version-tag-prefix =` for no prefix).  |

### Custom scripts

Variables do not always provide sufficient control over a script's behaviour,
so one can provide a custom script to be used in place of the default script.
Custom scripts live in the __scripts__ subdirectory of the project's root
directory, and their names correspond to those of the scripts they replace
(without `sanctuary-` prefixes).

To augment rather than override (or disable) the default behaviour, have the
custom script run the default script.

## Scripts

### `check-required-files`

Asserts that the project contains important files such as a licence file.

Configurable via [variables][] (`contributing-file`, `license-file`).

### `doctest`

Runs [`doctest`↗︎][] with suitable `--module`, `--prefix`,
`--opening-delimiter`, and `--closing-delimiter` values.

Configurable via [variables][] (`source-files`, `comment-prefix`,
`opening-delimiter`, `closing-delimiter`, `module-type`).

### `generate-readme`

Runs [`transcribe`↗︎][] then performs the following replacements to
produce a Markdown readme:

  - `v:${owner}/${name}` &rarr; `https://github.com/${owner}/${name}/tree/v${version}`
  - `V:${owner}/${name}` &rarr; `https://github.com/${owner}/${name}/tree/${version}`
  - `v:${owner}/${name}#${ident}` &rarr; `https://github.com/${owner}/${name}/tree/v${version}#${ident}`
  - `V:${owner}/${name}#${ident}` &rarr; `https://github.com/${owner}/${name}/tree/${version}#${ident}`

`${version}` comes from either the `"dependencies"` field or the
`"devDependencies"` field in __package.json__. This necessitates
that the dependency's version be specified exactly (`"1.2.3"` rather
than `"1.2.x"`, for example).

Configurable via [variables][] (`repo-owner`, `repo-name`,
`readme-source-files`, `heading-level`, `heading-prefix`, `comment-prefix`,
`version-tag-prefix`).

### `lint`

Runs the following linters:

  - [`check-required-files`][]
  - [`eslint`↗︎][]
  - [`lint-package-json`][]
  - [`lint-readme`][]
  - [`lint-commit-messages`][]

Configurable via [variables][] (`source-files` and those respected by the
aforementioned linters).

### `lint-commit-messages`

Asserts that none of the commits on the current branch but not on the default
branch has a summary which exceeds 72 characters.

Asserts that the current branch name is short enough to appear in a merge
commit without the commit summary exceeding 72 characters.

Configurable via [variables][] (`default-branch`).

### `lint-json`

Asserts that the specified JSON files exist and are neatly formatted.

### `lint-package-json`

Asserts that __package.json__ exists and contains important fields with
suitable values.

Configurable via [variables][] (`repo-owner`, `repo-name`).

### `lint-readme`

Uses [`remark`↗︎][] to assert that the readme, when built, will not contain any
undefined link references or unused link definitions.

Uses [`eslint`↗︎][] and [`eslint-plugin-markdown`↗︎][] to assert that the readme,
when built, will not contain examples which violate the project's style guide.

Configurable via [variables][] (`opening-delimiter`, `closing-delimiter`,
`module-type`).

### `prepublish`

Runs [`update-copyright-year`][] and [`generate-readme`][], and marks (via
`git add`) the licence file and readme for inclusion in the release commit.

Configurable via [variables][] (`license-file`).

:warning: _This script is intended to be run indirectly via [`release`][]._

### `release`

Runs [`xyz`↗︎][] to publish a new version of the package. `$1` must be a valid
increment: `major`, `minor`, `patch`, `premajor`, `preminor`, `prepatch`, or
`prerelease`.

Configurable via [variables][] (`repo-owner`, `repo-name`, `default-branch`,
`version-tag-prefix`, and those respected by [`prepublish`][]).

### `test`

Runs the project's [Mocha↗︎][] test suite via [Istanbul↗︎][] and asserts that the
test suite satisfies the project's coverage requirements.

Configurable via [variables][] (`min-branch-coverage`) and the `mocha` field of
__package.json__.

### `update-copyright-year`

Replaces the copyright year in the licence file with the year of the project's
most recently authored commit on the current branch.

Assumes that the licence file contains `Copyright (c) <year> <author-name>`.

Configurable via [variables][] (`author-name`, `license-file`).


[`check-required-files`]:     #check-required-files
[`doctest`]:                  #doctest
[`generate-readme`]:          #generate-readme
[`lint`]:                     #lint
[`lint-commit-messages`]:     #lint-commit-messages
[`lint-package-json`]:        #lint-package-json
[`lint-readme`]:              #lint-readme
[`prepublish`]:               #prepublish
[`release`]:                  #release
[`test`]:                     #test
[`update-copyright-year`]:    #update-copyright-year
[custom scripts]:             #custom-scripts
[variables]:                  #variables

[Istanbul↗︎]:                  https://istanbul.js.org/
[Mocha↗︎]:                     https://mochajs.org/
[`doctest`↗︎]:                 https://github.com/davidchambers/doctest
[`eslint`↗︎]:                  https://eslint.org/
[`eslint-plugin-markdown`↗︎]:  https://github.com/eslint/eslint-plugin-markdown
[`remark`↗︎]:                  http://remark.js.org/
[`transcribe`↗︎]:              https://github.com/plaid/transcribe
[`xyz`↗︎]:                     https://github.com/davidchambers/xyz
