# Inter Club League

## Ideas

### Server

- Server should use async functions
- Modify resolvers to use them properly
  - https://www.apollographql.com/docs/apollo-server/data/fetching-rest#batching-with-rest-apis
  - https://github.com/graphql/dataloader/tree/main

### UI

- Create yellow jersey app icon
- We need a back button on some pages
- Check youtube video by sam selikoff about optimising for PWA like disbaled test highlighting etc

### GraphQL API

- Add versioning to endpoints
  - /v1/graphql
  - /v2/graphql

### Schedule page

- Redirect to schedule/${seasonId}
- Horizontal GC scroller
- "Next event" card at the top
- API response should include nextEvent, primarySchedule and secondarySchedule fields
- Add selected schedule to route params
- Simplify API by removing schedule endpoint, just fetch stages and build the schedule

### Settings page

- iPhone settings style
- Season selector
- Light / dark theme selector
- Home page selector

### Stage page

- API response should include info
  - list of strings which are separated into paragraphs in the UI
- "Add to calendar" feature

### GC page

- Filter by category (how does it work with upgrades)
- Display first name inital and category code on smaller screens

### Rider stats page

- Show list of races and results, medals, position, unplaced, DNS etc
- Show GC winner
- Stats like number of wins, medals, places, races finished, upgrades etc

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.digitaloceanspaces.com/WWW/Badge%203.svg)](https://www.digitalocean.com/?refcode=76989c1fc36c&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
