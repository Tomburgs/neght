# Neght
Neght — Next + GitHub with a speech impediment

### Why 💭
Because I wanted to create an easier way to build and deploy static next pages to GitHub pages.
Sort of like [Storybook Deployer](https://github.com/storybook-eol/storybook-deployer), but for Next.

### How 👩‍🔧
Simply configure your Next project to [create a static export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#configuration), add neght as a dependency, and voila.

### Use 💾

Example package.json configuration:
```json
...
"scripts": {
  "build": "next build",
  "deploy": "neght --script build --branch gh-pages"
},
"devDependencies": {
  "neght": "^1.0.0"
}
...
```

All options:
```sh
$ neght --help

Options:
  -h, --help            Show help.                              [boolean]
  -d, --dir             Specify the root directory of your app.
                [string] [default: "./"]
  -s, --script          Specify the build script in your package.json.
                                              [string] [default: "build"]
      --dry-run         Run build but hold off on publishing.   [boolean]
      --branch          Git branch to push to.
                                           [string] [default: "gh-pages"]
      --remote          Git remote to push to.
                                             [string] [default: "origin"]
      --git-name        name to use for the git commit.
                                          [string] [default: "Neght Bot"]
      --git-email       email to use for the git commit.
                                   [string] [default: "neght@github.com"]
      --commit-message  message for the git commit
                        [string] [default: "Deploy Next to GitHub Pages"]
```
