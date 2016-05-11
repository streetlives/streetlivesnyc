#### How to run Streetlives locally:

1. Clone the repo:

`git clone git@github.com:streetlives/streetlivesnyc.git`

2. Install the dependencies:

`cd streetlivesnyc`
`npm install`

3. Create a configuration file:

`mv lib/config.sample.js lib/config.js`

4. Open `lib/config.js` and add your [CartoDB](http://cartodb.com) credentials.
5. Run the app:

`node app.js`

6. Open `http://localhost:7000` in your browser.

#### How to work on the app:

1. Install and run the project.
2. Run: `npm run watch`.
3. Edit the files in the folders: `sources/scss`, `sources/js`.
4. Saving a file in those folders will automatically compile them and refresh the site.
