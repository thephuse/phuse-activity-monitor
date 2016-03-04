# Phuse Activity Monitor #

## What Does it Do? ##

[Harvest](https://harvestapp.com) lacks the ability to present employee times to an end user within a company.

This app resolves that, by showing times for all users who have entered any over a user-defined time period. It displays aggregates, billable hours and billable percentages in a sortable leaderboard format.

## NPM Scripts ##

- `start` runs the server. Although this may appear redundant (see `server` below), it's essential for deployment on Heroku.
- `dev` runs the hot-loading Webpack build process.
- `server` runs the server.
- `build` compiles all client ES2015 using Babel and Webpack, and minifies the output.
- `postinstall` runs `build` immediately after the `npm install` command, making the app instantly executable.
- `test` runs extant tests in the `./test` directory.

## Server: Express + Pure Functions ##

All server API methods, aside from those provided by Express itself, can be found in the `./api` folder.

A pure functional approach has been adopted where possible, for the sake of brevity and legibility. These functions are composable, which minimises the surface area of the callable Express API, but greatly increases the versatility of the app behind the scenes. Aside from asynchrony (provided by `async.waterfall` and `async.each` respectively) the server app, like the client app, does its best to avoid side effects.

More information on functional programming can be found in Professor Frisby's superb [Mostly Adequate Guide](https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch1.html).

#### Caching ####

The server app uses `node-cache` to cache data served up by Harvest endpoints. This is executed in `./api/harvest.js`, in the `handle` function, while calls to receive data from the cache happen within the `get` function. The cache's `TTL` (time to live, or expiry) can be set using a configuration file, or environment variables. See **Deployment** below for details.

#### Deployment ####

In order to deploy the server locally, you'll need to have a config file at `./config/default.json` that looks like this:

```json
{
  "HARVEST_WEBADDRESS": "https://example.harvestapp.com",
  "HARVEST_USERNAME": "example@example.com",
  "HARVEST_PASSWORD": "examplePassword",
  "HARVEST_CLIENTID": "exampleClientId",
  "HARVEST_SECRET": "exampleSecret",
  "SECRET_SESSION": "exampleSecretSession",
  "ROOT_URL": "http://127.0.0.1:1234",
  "TTL": 300,
  "IP": "127.0.0.1",
  "PORT": 1234
}
```

The app will look either to this file or to **identically named environment variables** for these settings. Most can be garnered from Harvest itself, after setting up an OAuth 2.0 app using its administrative features. The user credentials will need to be those of a user who has full access to all of Harvest for your company (usually the CEO or HR manager).

The use of environment variables rather than a configuration JSON file is recommended for public-facing instances of the app, as

## Client: React + Redux ##

The client is based entirely on `redux` and `react`. A working knowledge of both is required in order to advance the app's UI, given that the app has been architected from the ground up using both technologies.

Redux adopts a Flux-like approach to data flow, but supplies an opinionated mechanism for immutability by sandwiching **reducers** between actions and the store. Reducers are pure functions that receive the current state of the application, transform it with no side effects to the state itself, and return the new, resultant state. This enables time travel within applications, among other useful debugging features. Redux's logging engine has been enabled for the app, allowing the developer and end user to see the granular transformations to the state that ensue for each reducer invoked by an action.

There is a 1:1 relationship between reducers and their correspondent actions, and reducers ought to be completely logicless. If you need to perform an asynchronous action - for example, a call to an API endpoint - or require any logical processing between user interaction and state reduction, place that logic in `./client/actions/index.js`.

Avoid setting component state using a constructor or React's `setState` function completely. Doing so is a Redux anti-pattern and can lead to highly undesirable side-effects, like components losing synchronization. Instead, confine *any* changes to the application's state - even aesthetic ones - to action and reducer pairs.

The UI's CSS has been built in JavaScript and applied using React's `style` directive, except in some instances where, for example, CSS's scope would not reach higher up the tree than the React root element, or where a reusable component needed complex CSS 3 logic like keyframe animations.
