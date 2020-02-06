## Astra Fuel Tracking app
# Requirements
Node.js 12.14.1 LTS (This is what I use, no other version is tested)

See `package.json` for dependency list.

# Installation instructions
1. Clone to local folder

2. `npm install`

3. Run `npm run-script watch` in terminal - This will use Babel to transpile the js into a `index.js` file automatically upon saving.

4. Run `npx run-script compile` in terminal - This will use Webpack to read the `index.js` file Babel makes and create a `bundle.js` which is the final product (also happens automatically).

5. Copy the following files into your web server:

* src/index.html -> /path/to/server/.../index.html
* src/index.css -> /path/to/server/.../index.css
* ./bundle.js -> /path/to/server/.../bundle.js

6. Go to your web server's home page (eg. http://localhost/fuel-app)

Alternatively you can load `index.html` directly in your browser if you cbf installing a web server. Should still be fine, as long as `index.css` and `bundle.js` are adjacent to `index.html`.
