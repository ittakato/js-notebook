# js-notebook

> js-notebook is a web-based notebook environment for interactive computing of JavaScript. Markdown is available for comprehensive documentation of code.

![js-notebook example](docs/resources/example-image.jpg 'js-notebook example')

## Installation

To run the app, use the following command (_npx comes with npm 5.2+_):

```bash
$ npx web-jsnotebook serve
```

For a local installation, run:

```bash
$ npm install -g web-jsnotebook
```

## Usage

### Serving the app

#### Default

This task will create a `notebook.js` file in the current directory.

```bash
$ npx web-jsnotebook serve
```

#### Specifying port number

This task will create a `notebook.js` file in the current directory and use the specified port number.

```bash
$ npx web-jsnotebook serve --port <port>
```

#### Specifying file name

This task will create a `test.js` file in the current directory

```bash
$ npx web-jsnotebook serve test.js
```

## Built With

- Create React App
- Monaco Editor
- esbuild
- Lerna
