# review-all-packages

VERY EARLY DRAFT!

This contains a script that downloads all Elm packages from GitHub and then run `elm-review` on it.

For now, if you want to run it, go change the `command` in `index.js` to specify
- What config to use
- Which `elm-review` to use: it could be a global one, or one in development to check against regressions in the CLI.

The list of packages is in `search.json`, but has been downloaded from [here](https://package.elm-lang.org/search.json) to avoid making queries to the Elm package registry server.

For now we only download a select set of packages.

If you use this to make pull requests to packages, please don't spam them.
