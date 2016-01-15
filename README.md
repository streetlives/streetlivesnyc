![](https://travis-ci.org/streetlives/streetlivesnyc.svg?branch=master)

#### How to run Streetlives locally:

1. Clone the repo:

`git clone git@github.com:streetlives/streetlivesnyc.git`

3. Install the dependencies:

`cd streetlivesnyc`
`npm install`

4. Install grunt:

`npm install -g grunt-cli`

5. Create a configuration file:

`mv lib/config.sample.js lib/config.js`

6. Open `lib/config.js` and add your [CartoDB](http://cartodb.com) credentials.
7. Run the app:

`node app.js`

8. Open `http://localhost:7000` in your browser.

#### How to work on the app:

1. Install and run the project.
2. Run: `grunt watch`.
3. Edit the files in the folders: `sources/scss`, `sources/js` & `sources/templates`.
4. Saving a file in those folders will automatically compile them and refresh the site.
