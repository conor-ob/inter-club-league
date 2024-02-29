# Turborepo react-native starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-react-native-web
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `native`: a [react-native](https://reactnative.dev/) app built with [expo](https://docs.expo.dev/)
- `web`: a [Next.js](https://nextjs.org/) app built with [react-native-web](https://necolas.github.io/react-native-web/)
- `@repo/ui`: a stub [react-native](https://reactnative.dev/) component library shared by both `web` and `native` applications
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [Expo](https://docs.expo.dev/) for native development
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting

## Ideas

### Schedule page

- Horizontal GC scroller
- "Next event" card at the top
- API response should include nextEvent, primarySchedule and secondarySchedule fields

### Settings page

- iPhone settings style
- Season selector
- Light / dark theme selector
- Home page selector

### Stage page

- API response should include info
  - list of strings which are separated into paragraphs in the UI
- "Add to calendar" feature

### Stage results page

- Main page should show a list of races / groups
- User can click on group to view results

### GC page

- Filter by category (how does it work with upgrades)

### Rider stats page

- Show list of races and results, medals, position, unplaced, DNS etc
- Show GC winner
- Stats like number of wins, medals, places, races finished, upgrades etc
