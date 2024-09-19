<p align="center">
  <a href="https://hypha.earth/">
    <img src="https://hypha.earth/wp-content/themes/hypha-theme/img/round-logo.svg" height="128">
    <h1 align="center">Hypha DHO Web Platform v3</h1>
  </a>
</p>

<p align="center">
  <a aria-label="GitHub version" href="https://github.com/hypha-dao/hypha-web">
    <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/hypha-dao/hypha-web?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/hypha-dao/dho-web-client/blob/master/license.md">
    <img alt="" src="https://img.shields.io/github/license/hypha-dao/dho-web-client?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Join the community on GitHub" href="https://github.com/hypha-dao/dho-web-client/discussions">
    <img alt="Discord" src="https://img.shields.io/discord/722537361480613950?style=for-the-badge">
  </a>
</p>

# HyphaPlatform

## Architecture

### Applications

- [apps/web](./apps/web/README.md): NextJS Platform Frontend Application
- [apps/web-e2e](./apps/web-e2e/README.md): EndToEnd Testing Environment

### Packages

- [api/*](./packages/api/README.md): Packages to integrate relevant systems via api
- [cookie](./packages/cookie/README.md): Package that hosts the cookie integration
- [i18n](./packages/i18n/README.md): Package that hosts the internationalisation configuration and helpers
- [ui](./packages/ui/README.md): Package that hosts the UI component library
- [ui-utils](./packages/ui-utils/README.md): Package that hosts the UI component library

## Start the application

Run `pnpm run dev` to start the development server. Happy coding!

## Build for production

Run `pnpm run build` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Integrate this nx.dev workspace with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Running arbitrary tasks within different packages

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
