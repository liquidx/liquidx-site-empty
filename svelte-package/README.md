# Empty Project Template for liquidx.net

# Development

```
pnpm install
pnpm run dev
```

# Publishing Changes

Once the changes can be published, the built version of the library needs to be published to a
git branch called `svelte-package`. The package is contained within `dist/`.

Before updating, bump the version number in `package.json`.

```
git checkout svelte-package
pnpm run build
git push origin svelte-package
```
