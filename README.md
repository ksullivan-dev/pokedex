# Pokedex Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Performs a single test run with Vitest.

### `npm run test:watch`

Launches the test runner (Vitest) in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Notes

All business cases should be implemented including the Bonus Points. The is no storage (local or db) outside of memory. Refreshes will reset the page's state. I considered adding localStorage so searches could persist page reloads but decided against that. The reason being that each card makes 3 requests to the PokeAPI: one for the details, one for the species (in order to get the correct id for the evolution chain) and one for the evolution chain. This was the only way I was able to correctly get the Evolution details. If storage is necesssary, I would possibly opt for requiring user interaction (ie: button click) to make the 'secondary' requests.

There is no loading state. This decision was made in the interest of time.

As recommended by the in the PokeAPI docs, I used the [pokenode-ts](https://github.com/Gabb-c/pokenode-ts) library for both cacheing and types.

Additionally, no pagination is implemented, either to preload the search box with a typeahead or to display lots of Pokemon. This was done in the interest of time combined with the localStorage/multiple request issue mentioned above.

I used the recommended scaffold tool (Create React App) but ran into a handful of issues, possibly because that tool is no longer maintained. Tests didn't run out of the box and there was quite a bit of boilerplate config to set up Redux. I received this message when linting:

```
One of your dependencies, babel-preset-react-app, is importing the
"@babel/plugin-proposal-private-property-in-object" package without
declaring it in its dependencies. This is currently working because
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.

babel-preset-react-app is part of the create-react-app project, which
is not maintianed anymore. It is thus unlikely that this bug will
ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
your devDependencies to work around this error. This will make this message
go away.
```

I eventually gave up on the built-in test runner and switched to Vitest. I didn't remove Jest or any of its deps (mostly because its not hurting anything). I did add the missing Babel dep(s) to quiet the noise.

Network requests for testing are implemented with [MSW](https://mswjs.io/). I copied the responses from that actual endpoints, saved that json in the repo and then returned that json when a request is made. The mocked responses are limited to Pichu, Pikachu and Raichu. If the tests are modified to select different Pokemon, the live API will be used.

I went back and forth between parsing the responses at the component level or the store level. I ultimately settled on the component level. However, I don't think this was the best choice. During testing, I would intermittently receive a warning that the `SerializableStateInvariantMiddleware` took too long. The message said that this could happen if the state or actions are very large but was only an issue in development. It's likely that I should parse the response(s) and only return the necessary information when storing them in state as opposed to dumping the entire response(s) in there. In the interest of time, I'm leaving this as is but wanted to call it out.

The api handler is overly complicated. I've used Nuxt quite a bit lately and I really like their useFetch composable (hook equivalent). It allows inconsistent responses to be formatted in an expected way. I set this up before implementing the Redux thunk. I left as is but ended up re-throwing the 'error' to satisfy the `rejected` action of the Thunk.

**Re: concurrent environment:** Candidly, I'm not totally sure I understand the request. If you want multiple users to use this, it can be deployed to any static host and likely cached at the host level for performance. If the ask is to deploy this to multiple platforms (mobile/native + desktop + browser), I'm not sure what all would need to be done. If I remember correctly, you use Capacitor and a quick glance at their docs makes it look 'relatively' straightforward. If the ask is something else, I'd need more info.
