## Astra Fuel Tracking app
# Requirements
Node.js 12.14.1 LTS (This is what I use, no other version is tested)

See `package.json` for dependency list.

# Installation instructions
1. Clone to local folder

2. `npm install`

3. Run `npx babel --watch src --out-dir . --presets react-app/prod ` in terminal to get Babel to transpile the js into a `index.js` file.

4. Run `npx webpack` to read the `index.js` file Babel made and create a `bundle.js` which is the final product.

5. Copy the following files into your web server:

* src/index.html
* src/index.css
* ./bundle.js

6. Go to your web server's home page (eg. http://localhost/fuel-app)

Alternatively you can load `index.html` directly in your browser if you cbf installing a web server. Should still be fine, as long as `index.css` and `bundle.js` are adjacent to `index.html`.
