# js-notebook

> js-notebook is a web-based notebook environment for interactive computing of JavaScript. Markdown is available for comprehensive documentation of code.

![js-notebook example](docs/resources/example-image.jpg 'js-notebook example')

## Installation

To run the app, use the following command (_npx comes with npm 5.2+_):

```bash
$ npx js-notebook serve
```

For a local installation, make sure you have
[node installed](https://nodejs.org/en/download) and run:

```bash
$ npm install -g js-notebooks
```

## Usage

### Serving the app

#### Default

This task will create a `notebook.js` file in the current directory.

```bash
$ npx js-notebook serve
```

#### Specifying port number

This task will create a `notebook.js` file in the current directory and use the specified port number.

```bash
$ npx js-notebook serve --port <port>
```

#### Specifying file name

This task will create a `test.js` file in the current directory

```bash
$ npx js-notebook serve test.js
```

## Built With

- Create React App
- Monaco Editor
- esbuild
- Lerna
